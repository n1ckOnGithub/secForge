import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "./server.supabase";

function asArray(result) {
  if (Array.isArray(result)) return result;
  return result?.items ?? [];
}

// Function that runs in the server rather than in the browser.
export const getCatalog = createServerFn({ method: "GET" }).handler(
  async () => {
    const [toolsResult, categoriesResult] = await Promise.all([
      supabase.from("Tools").select("*").order("name"),
      supabase.from("Category").select("*").order("index"),
    ]);
    return {
      tools: asArray(toolsResult),
      categories: asArray(categoriesResult),
    };
  },
);

// Fetches a tool by its slug and returns it along with up to 4 other tools
export const getTool = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1).max(120) })) // Validates input passed into the function.
  .handler(async ({ data }) => {
    const matches = asArray(
      await supabase.from("Tools").filter({ slug: data.slug }, { limit: 1 }),
    );
    const tool = matches[0];
    if (!tool) return null;

    const related = asArray(
      await supabase
        .from("Tools")
        .filter({ category: tool.category }, { sort: "name", limit: 8 }),
    );

    return {
      tool,
      related: related.filter((item) => item.id !== tool.id).slice(0, 4),
    };
  });

export const getCategoryGuide = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1).max(120) }))
  .handler(async ({ data, context }) => {
    const [matches, tools, categories] = await Promise.all([
      supabase.from("Category").filter({ slug: data.slug }),
      supabase
        .from("Tool")
        .filter({ category: data.slug }, { sort: "name", limit: 100 }),
      supabase.from("Category").list({ sort: "index", limit: 50 }),
    ]);

    const category = asArray(matches)[0];
    if (!category) return null;

    return {
      category,
      tools: asArray(tools),
      categories: asArray(categories),
    };
  });

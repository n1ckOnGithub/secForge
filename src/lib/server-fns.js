import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

function asArray(result) {
  if (Array.isArray(result)) return result;
  return result?.items ?? [];
}

// Function that runs in the server rather than in the browser.
export const getCatalog = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    const base44 = context.getBase44();
    const [toolsResult, categoriesResult] = await Promise.all([
      base44.entities.Tool.list({ sort: "name", limit: 400 }),
      base44.entities.Category.list({ sort: "index", limit: 50 }),
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
  .handler(async ({ data, context }) => {
    const base44 = context.getBase44();
    const matches = asArray(
      await base44.entities.Tool.filter({ slug: data.slug }, { limit: 1 }),
    );
    const tool = matches[0];
    if (!tool) return null;

    const related = asArray(
      await base44.entities.Tool.filter(
        { category: tool.category },
        { sort: "name", limit: 8 },
      ),
    );

    return {
      tool,
      related: related.filter((item) => item.id !== tool.id).slice(0, 4),
    };
  });

export const getCategoryGuide = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1).max(120) }))
  .handler(async ({ data, context }) => {
    const base44 = context.getBase44();
    const [matches, tools, categories] = await Promise.all([
      base44.entities.Category.filter({ slug: data.slug }),
      base44.entities.Tool.filter(
        { category: data.slug },
        { sort: "name", limit: 100 },
      ),
      base44.entities.Category.list({ sort: "index", limit: 50 }),
    ]);

    const category = asArray(matches)[0];
    if (!category) return null;

    return {
      category,
      tools: asArray(tools),
      categories: asArray(categories),
    };
  });

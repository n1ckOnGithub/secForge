import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "./server.supabase";

// Fetch all tools and categories
export const getCatalog = createServerFn({ method: "GET" }).handler(
  async () => {
    const [toolsResult, categoriesResult] = await Promise.all([
      supabase.from("Tool").select("*").order("name"),
      supabase.from("Category").select("*").order("index"),
    ]);

    if (toolsResult.error) throw toolsResult.error;
    if (categoriesResult.error) throw categoriesResult.error;

    return {
      tools: toolsResult.data ?? [],
      categories: categoriesResult.data ?? [],
    };
  },
);

// Fetch a tool by its slug and up to 4 related tools
export const getTool = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1).max(120) }))
  .handler(async ({ data }) => {
    const { data: tool, error } = await supabase
      .from("Tool")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();

    if (error) throw error;
    if (!tool) return null;

    const { data: related, error: relatedError } = await supabase
      .from("Tool")
      .select("*")
      .eq("category", tool.category)
      .neq("id", tool.id)
      .order("name")
      .limit(4);

    if (relatedError) throw relatedError;

    return {
      tool,
      related: related ?? [],
    };
  });

// Fetch a category guide and its tools
export const getCategoryGuide = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(1).max(120) }))
  .handler(async ({ data }) => {
    const [categoryResult, toolsResult, categoriesResult] = await Promise.all([
      supabase.from("Category").select("*").eq("slug", data.slug).maybeSingle(),

      supabase
        .from("Tool")
        .select("*")
        .eq("category", data.slug)
        .order("name")
        .limit(100),

      supabase.from("Category").select("*").order("index"),
    ]);

    if (categoryResult.error) throw categoryResult.error;
    if (toolsResult.error) throw toolsResult.error;
    if (categoriesResult.error) throw categoriesResult.error;

    const category = categoryResult.data;

    if (!category) return null;

    return {
      category,
      tools: toolsResult.data ?? [],
      categories: categoriesResult.data ?? [],
    };
  });

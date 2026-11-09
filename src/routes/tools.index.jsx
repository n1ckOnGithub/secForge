import { createFileRoute } from "@tanstack/react-router";
import { getCatalog } from "../lib/server-fns";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/tools/")({
  loader: async () => await getCatalog(),
  head: () => ({
    meta: [
      { title: "Catalogue — Arsenal" },
      {
        name: "description",
        content:
          "Search every cybersecurity tool in the index and filter by discipline, licence and platform.",
      },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const { tools, categories } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");

  // Calculate how many tools belong to each category.
  const counts = useMemo(
    () =>
      tools.reduce((acc, tool) => {
        acc[tool.category] = (acc[tool.category] || 0) + 1;
        return acc;
      }, {}),
    [tools],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (active !== "all" && tool.category !== active) return false;
      if (!term) return true;

      const haystack = [
        tool.name,
        tool.summary,
        tool.maintainer,
        tool.category_label,
        ...(tool.tags || []),
        ...(tool.platforms || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [tools, query, active]);

  const filters = [
    { slug: "all", name: "All disciplines", count: tools.length },
    ...categories.map((category) => ({
      slug: category.slug,
      name: category.name,
      count: counts[category.slug] || 0,
    })),
  ];

  return (
    <div>
      <div className="tactical-grid border-b border-border">
        <div className="mx-auto max-w-350 px-5 pb-10 pt-14 sm:px-8 lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
            Catalogue
          </p>

          <h1 className="mt-4 max-w-3xl font-heading text-[clamp(2rem,5vw,3.6rem)] font-medium leading-none tracking-[-0.03em] text-foreground">
            Every tool in the index.
          </h1>
          
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {tools.length} tools across {categories.length} disciplines. Search
            by name, vendor or keyword, or narrow the list by what the tool is
            for.
          </p>
        </div>
      </div>
    </div>
  );
}

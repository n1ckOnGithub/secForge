import { createFileRoute } from "@tanstack/react-router";
import { getCatalog } from "../lib/server-fns";
import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import ToolCard from "../components/ToolCard";

export const Route = createFileRoute("/tools/")({
  loader: async () => await getCatalog(),
  head: () => ({
    meta: [
      { title: "Catalogue — SecForge" },
      {
        name: "description",
        content:
          "Search every cybersecurity tool in the index and filter by discipline, licence and platform.",
      },
    ],
    links: [{ rel: "icon", href: "/terminal.svg" }],
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

          <div className="mt-8 flex max-w-xl items-center gap-3 border border-border bg-background px-4 py-3 focus-within:border-primary">
            <Search
              className="h-4 w-4 flex-none text-muted-foreground"
              aria-hidden="true"
            />

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools, vendors, tags…"
              aria-label="Search the catalogue"
              className="w-full bg-transparent font-mono text-xs uppercase tracking-widest text-foreground outline-none placeholder:text-muted-foreground"
            />

            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="flex-none text-muted-foreground transition-colors hover:text-primary">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-350 px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Discipline
            </p>

            <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap">
              {filters.map((filter) => {
                const isActive = active === filter.slug;
                return (
                  <button
                    key={filter.slug}
                    type="button"
                    onClick={() => setActive(filter.slug)}
                    className={`flex items-center justify-between gap-3 border px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    }`}>
                    <span>{filter.name}</span>

                    <span className="flex-none opacity-60">{filter.count}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div>
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "result" : "results"}
              </p>

              {active !== "all" ? (
                <button
                  type="button"
                  onClick={() => setActive("all")}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary hover:underline">
                  Reset filter
                </button>
              ) : null}
            </div>

            {filtered.length ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="mt-10 border border-border bg-card/40 px-6 py-14 text-center">
                <p className="font-heading text-lg text-foreground">
                  Nothing matches that.
                </p>

                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                  Try a shorter term, or clear the discipline filter to search
                  the whole index.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActive("all");
                  }}
                  className="mt-6 border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary">
                  Reset search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

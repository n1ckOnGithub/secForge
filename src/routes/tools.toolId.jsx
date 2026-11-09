import { createFileRoute, Link } from "@tanstack/react-router";
import { getTool } from "../lib/server-fns";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/tools/toolId")({
  loader: ({ params }) => getTool({ data: { slug: params.toolId } }),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.tool?.name ?? "Tool"} — Arsenal` },
      {
        name: "description",
        content:
          loaderData?.tool?.summary ??
          "A tool from the Arsenal cybersecurity index.",
      },
    ],
  }),
  component: ToolPage,
});

function MetaRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/70 py-3">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>

      <span className="text-right text-sm text-foreground">{value}</span>
    </div>
  );
}

function ToolPage() {
  const data = Route.useLoaderData();

  if (!data?.tool) {
    return (
      <div className="mx-auto max-w-350 px-5 py-24 text-center sm:px-8 lg:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          Not found
        </p>

        <h1 className="mt-4 font-heading text-3xl font-medium tracking-tight text-foreground">
          That tool is not in the index.
        </h1>

        <Link
          to="/tools"
          className="mt-8 inline-flex items-center gap-2 border border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to the catalogue
        </Link>
      </div>
    );
  }

  const { tool, related } = data;
  const paragraphs = (tool.description || "").split("\n\n").filter(Boolean);

  return (
    <div>
      <div className="tactical-grid border-b border-border">
        <div className="mx-auto max-w-350 px-5 pb-12 pt-10 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            <Link to="/tools" className="transition-colors hover:text-primary">
              Catalogue
            </Link>

            <span aria-hidden="true">/</span>

            <Link
              to="/categories/$categoryId"
              params={{ categoryId: tool.category }}
              className="transition-colors hover:text-primary">
              {tool.category_label}
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-foreground">{tool.name}</span>
          </div>

          <h1 className="mt-6 max-w-3xl font-heading text-[clamp(2rem,5vw,3.4rem)] font-medium leading-none tracking-[-0.03em] text-foreground">
            {tool.name}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {tool.summary}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-350 px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div className="min-win-0">
            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-2xl text-[15px] leading-[1.75] text-muted-foreground sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {tool.use_when?.length ? (
              <div className="mt-12">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                  Reach for it when
                </h2>
                
                <ul className="mt-5 space-y-4">
                  {tool.use_when.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-l border-border pl-4">
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

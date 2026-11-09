import { createFileRoute, Link } from "@tanstack/react-router";
import { getTool } from "../lib/server-fns";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import CategoryIcon from "../components/CategoryIcon";
import githubLogo from "../assets/GithubWLogo.svg";
import ToolCard from "../components/ToolCard";

const LICENSE_LABEL = {
  open_source: "Open source",
  freemium: "Freemium",
  commercial: "Commercial",
};

const SKILL_LABEL = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const Route = createFileRoute("/tools/$toolId")({
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

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-card/50 p-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                <CategoryIcon icon={tool.category} className="h-3.5 w-3.5" />
                {tool.category_label}
              </div>

              <div className="mt-4">
                <MetaRow
                  label="Licence"
                  value={LICENSE_LABEL[tool.license] || tool.license}
                />
                <MetaRow
                  label="Level"
                  value={SKILL_LABEL[tool.skill_level] || tool.skill_level}
                />
                <MetaRow
                  label="Platforms"
                  value={(tool.platforms || []).join(", ")}
                />
                <MetaRow label="Maintained by" value={tool.maintainer} />
              </div>

              <a
                href={tool.website_url}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-5 flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90">
                Visit the project
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>

              {tool.github_url ? (
                <a
                  href={tool.github_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 flex w-full items-center justify-center gap-2 border border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground/40">
                  <img
                    className="h-4 w-4"
                    src={githubLogo}
                    aria-hidden="true"
                  />
                  Source repository
                </a>
              ) : null}
            </div>

            <Link
              to="/categories/$categoryId"
              params={{ categoryId: tool.category }}
              className="mt-4 flex items-center justify-between gap-3 border border-border px-5 py-4 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground">
              Read the {tool.category_label.toLowerCase()} guide
              <ArrowUpRight className="h-4 w-4 flex-none" aria-hidden="true" />
            </Link>
          </aside>
        </div>

        {related.length ? (
          <div className="mt-16 border-t border-border pt-10">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                Also in {tool.category_label.toLowerCase()}
              </h2>

              <Link
                to="/categories/$categoryId"
                params={{ categoryId: tool.category }}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary">
                All of them
              </Link>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ToolCard key={item.id} tool={item} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

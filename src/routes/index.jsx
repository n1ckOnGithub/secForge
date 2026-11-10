import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "../components/HeroSection";
import { getCatalog } from "../lib/server-fns";
import { ArrowRight, Search, ArrowUpRight } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import ToolCard from "../components/ToolCard";
import { Link } from "@tanstack/react-router";

const BAND_IMAGE =
  "https://media.base44.com/images/public/6aec3f2fa7b9d20894d39740/588e73559_generated_image.png";

export const Route = createFileRoute("/")({
  loader: async () => await getCatalog(), // Gets data the page needs.
  head: () => ({
    // metadata
    meta: [
      { title: "Arsenal — The security tool index" },
      {
        name: "description",
        content:
          "A curated catalogue of cybersecurity tools grouped by discipline, with a practical guide for every function area.",
      },
    ],
  }),
  component: HomePage,
});

// The section header before the tools put in a grid.
function SectionHeader({ index, label, title, action }) {
  return (
    <div className="flex flex-col gap-6 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          {index} / {label}
        </p>

        <h2 className="mt-4 max-w-2xl font-heading text-[clamp(1.6rem,3.2vw,2.35rem)] font-medium leading-[1.1] tracking-[-0.02em] text-foreground">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

function HomePage() {
  const { tools, categories } = Route.useLoaderData();

  // Counts how many tools belong to each category
  const countsByCategory = tools.reduce((acc, tool) => {
    acc[tool.category] = (acc[tool.category] || 0) + 1;
    return acc;
  }, {});

  const disciplines = categories.map((category) => ({
    ...category,
    toolCount: countsByCategory[category.slug] || 0,
  }));

  const featured = tools.filter((tool) => tool.featured);
  const coreTools = (featured.length ? featured : tools).slice(0, 6);

  const stats = [
    { value: String(categories.length), label: "Function areas" },
    { value: String(tools.length), label: "Tools indexed" },
    { value: "1", label: "Entry per tool, checked by hand" },
    { value: "0", label: "Paywalls or sign-ups" },
  ];

  return (
    <div>
      <HeroSection
        toolCount={tools.length}
        disciplineCount={categories.length}
      />

      <section className="border-b border-border bg-card/20">
        <div className="mx-auto grid max-w-350 grid-cols-2 gap-px sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-r border-border/60 px-5 py-7 last:border-r-0 sm:px-8">
              <p className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                {stat.value}
              </p>

              <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="disciplines" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-10">
          <SectionHeader
            index="01"
            label="Function areas"
            title="Twelve ways to break in — and to keep them out."
            action={
              <Link
                to="/tools"
                className="group inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary">
                Search the full catalogue
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            }
          />

          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {disciplines.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="tools"
        className="scroll-mt-20 border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-350 px-5 sm:px-8 lg:px-10">
          <SectionHeader
            index="02"
            label="Core tooling"
            title="The mainstays — the tools that anchor most engagements."
            action={
              <Link
                to="/tools"
                className="group inline-flex items-center gap-2 self-start border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary">
                <Search className="h-3.5 w-3.5" aria-hidden="true" />
                View all {tools.length}
              </Link>
            }
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-350 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="relative overflow-hidden rounded-lg border border-border">
            <img
              src={BAND_IMAGE}
              alt="Abstract render of glowing filaments bundled inside a dark glass block."
              fittingType="fill"
              className="absolute inset-0 h-full w-full"
            />

            <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/30" />
            <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:p-14">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  Start anywhere
                </p>

                <h2 className="mt-4 max-w-xl font-heading text-[clamp(1.7rem,3.4vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.02em] text-foreground">
                  Pick a discipline, read the guide, open the tool.
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Each guide explains what the discipline is for, the order to
                  learn it in, and the handful of tools worth installing first —
                  so you are never staring at a list of names with no idea where
                  to begin.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link
                  to="/categories/$categoryId"
                  params={{ categoryId: "reconnaissance" }}
                  className="group inline-flex items-center gap-2 bg-primary px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90">
                  Start with recon
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  to="/tools"
                  className="group inline-flex items-center gap-2 border border-foreground/30 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground hover:bg-foreground/10">
                  Open catalogue
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

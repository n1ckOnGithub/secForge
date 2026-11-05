import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const LICENSE_LABEL = {
  open_source: "Open source",
  freemium: "Freemium",
  commercial: "Commercial",
};

// Card used in section 2 i.e Core Tooling
export default function ToolCard({ tool, featured = false }) {
  return (
    <Link
      to="/tools/$toolId"
      params={{ toolId: tool.slug }}
      className={`group relative flex flex-col justify-between gap-6 overflow-hidden border border-border bg-card/50 p-5 transition-colors hover:border-primary/60 hover:bg-card ${
        featured ? "sm:p-6" : ""
      }`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full -translate-y-full bg-linear-to-b from-primary/15 via-primary/5 to-transparent transition-transform duration-700 ease-out group-hover:translate-y-full"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
          {tool.category_label}
        </span>

        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          {LICENSE_LABEL[tool.license] || tool.license}
        </span>
      </div>

      <div className="relative">
        <h3
          className={`font-heading font-medium tracking-tight text-foreground transition-colors group-hover:text-primary ${
            featured ? "text-xl" : "text-lg"
          }`}>
          {tool.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {tool.summary}
        </p>
      </div>

      <div className="relative flex items-center justify-between gap-4 border-t border-border/70 pt-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          {(tool.platforms || []).join(" · ")}
        </span>

        <ArrowUpRight
          className="h-4 w-4 flex-none text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

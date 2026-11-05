import Link from "@tanstack/react-router";

const LICENSE_LABEL = {
  open_source: "Open source",
  freemium: "Freemium",
  commercial: "Commercial",
};

// Card used in section 2 i.e Core Tooling
export default function ToolCard({ tool, featured = false }) {
  return (
    <Link>
      <span />

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

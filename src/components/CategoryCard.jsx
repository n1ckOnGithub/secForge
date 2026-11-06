import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import CategoryIcon from "./CategoryIcon";

export default function CategoryCard({ category }) {
  return (
    <Link
      to="/categories/$categoryId"
      params={{ categoryId: category.slug }}
      className="group relative flex flex-col justify-between gap-8 border border-border bg-card/40 p-6 transition-colors hover:border-primary/60 hover:bg-card">
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-primary">
          {String(category.index).padStart(2, "0")}
        </span>

        <CategoryIcon
          icon={category.icon}
          className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
        />
      </div>

      <div>
        <h3 className="font-heading text-[17px] font-medium leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {category.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {category.tagline}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            {category.toolCount ?? 0} tools
          </span>

          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-primary">
            Guide
            <ArrowRight
              className="h-3 w-3 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE =
  "https://media.base44.com/images/public/6aec3f2fa7b9d20894d39740/a19e6ee1c_generated_image.png";

export default function HeroSection({ toolCount, disciplineCount }) {
  return (
    <>
      <section
        className="hero-glow relative overflow-hidden border-b border-border"
        aria-label="Arsenal Index">
        <div className="mx-auto grid max-w-350 gap-10 px-5 pb-14 pt-14 sm:px-8 lg:grid-cols-[1fr_44%] lg:items-stretch lg:gap-14 lg:px-10 lg:pb-16 lg:pt-20">
          <div className="flex min-w-0 flex-col justify-between gap-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                {disciplineCount} disciplines · {toolCount} tools indexed
              </p>
              <h1 className="mt-6 font-heading text-[clamp(2.6rem,7.2vw,6rem)] font-medium leading-[0.94] tracking-[-0.03em] text-foreground">
                The security
                <br />
                stack, mapped.
              </h1>
            </div>

            <div className="max-w-xl">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-[17px]">
                Every tool practitioners actually reach for — reconnaissance,
                exploitation, forensics, detection — sorted by the job it does.
                Each entry says what it is, where to get it, and which guide
                tells you when to open it.
              </p>

              <Link
                to="/tools"
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-foreground/40 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground hover:bg-foreground/10 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-foreground">
                Browse the arsenal
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
                No accounts. No paywalls. Links go straight to the source.
              </p>
            </div>
          </div>

          <figure className="relative min-h-65 overflow-hidden rounded-lg border border-border bg-card sm:min-h-85 lg:min-h-0">
            { /* Hero image */}
            <figcaption className="absolute bottom-3 left-3 border border-border bg-background/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
              Fig. 01 — attack surface
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}

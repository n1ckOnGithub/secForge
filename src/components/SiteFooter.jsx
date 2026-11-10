import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Terminal } from "lucide-react";

const DISCIPLINES = [
  { label: "Reconnaissance & OSINT", slug: "reconnaissance" },
  { label: "Network analysis", slug: "network-analysis" },
  { label: "Web application testing", slug: "web-application" },
  { label: "Reverse engineering", slug: "reverse-engineering" },
  { label: "Digital forensics", slug: "forensics" },
  { label: "Detection & SIEM", slug: "detection" },
];

const RESOURCES = [
  { label: "MITRE ATT&CK", href: "https://attack.mitre.org" },
  { label: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
  {
    label: "NIST Cybersecurity Framework",
    href: "https://www.nist.gov/cyberframework",
  },
  { label: "CVE Program", href: "https://www.cve.org" },
];

export default function SiteFooter() {
  return (
    <>
      <footer className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-350 px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Link to="/" className="group inline-flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center border border-primary/60 bg-primary/10 text-primary">
                  <Terminal className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-heading text-[15px] font-bold tracking-[0.22em] text-foreground">
                  SECFORGE
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                A hand-checked index of the tools security teams actually run,
                sorted by the job they do, with a guide for every discipline so
                you know where to start.
              </p>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Independent · Unaffiliated
              </p>
            </div>

            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                Disciplines
              </h2>

              <ul className="mt-5 space-y-3">
                {DISCIPLINES.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to="/categories/$categoryId"
                      params={{ categoryId: item.slug }}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                Reference
              </h2>
              <ul className="mt-5 space-y-3">
                {RESOURCES.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item.label}
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              © 2026 SecForge — a catalogue, not an endorsement
            </p>
            
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Use only on systems you are authorised to test
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

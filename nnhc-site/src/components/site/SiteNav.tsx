"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useContact } from "@/components/site/ContactProvider";

const ROUTES = [
  { href: "/model", label: "Vision & Model" },
  { href: "/mission", label: "Mission" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/voices", label: "Voices" },
  { href: "/engage", label: "Engage" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const { open: openContact } = useContact();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<{ x: number; w: number; visible: boolean }>({
    x: 0,
    w: 0,
    visible: false,
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Position the active-pill under the current route
  useEffect(() => {
    const update = () => {
      const el = itemRefs.current[pathname];
      const parent = navRef.current;
      if (!el || !parent) {
        setPill((p) => ({ ...p, visible: false }));
        return;
      }
      const a = el.getBoundingClientRect();
      const b = parent.getBoundingClientRect();
      setPill({ x: a.left - b.left, w: a.width, visible: true });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pathname]);

  const movePill = (href: string) => {
    const el = itemRefs.current[href];
    const parent = navRef.current;
    if (!el || !parent) return;
    const a = el.getBoundingClientRect();
    const b = parent.getBoundingClientRect();
    setPill({ x: a.left - b.left, w: a.width, visible: true });
  };

  const restorePill = () => {
    const el = itemRefs.current[pathname];
    const parent = navRef.current;
    if (!el || !parent) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    const a = el.getBoundingClientRect();
    const b = parent.getBoundingClientRect();
    setPill({ x: a.left - b.left, w: a.width, visible: true });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-bg/75 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[88rem] px-5 md:px-8 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="site-brand group"
          aria-label="NNHC home"
        >
          <span
            aria-hidden
            className="site-brand__mark"
            style={{
              WebkitMaskImage: "url(/logo.svg)",
              maskImage: "url(/logo.svg)",
            }}
          />
          <span className="hidden lg:inline text-[0.78rem] text-ink-mute">
            Neighbourhood Network in Health Care
          </span>
        </Link>

        <nav
          ref={navRef}
          onMouseLeave={restorePill}
          className="hidden md:flex items-center relative"
          aria-label="Primary"
        >
          <span
            aria-hidden
            className="absolute bottom-1 h-[2px] bg-electric pointer-events-none rounded-full"
            style={{
              transform: `translateX(${pill.x + 14}px)`,
              width: Math.max(0, pill.w - 28),
              opacity: pill.visible ? 1 : 0,
              transition:
                "transform 420ms cubic-bezier(0.16,1,0.3,1), width 420ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease",
            }}
          />
          {ROUTES.map((r) => {
            const active = pathname === r.href;
            return (
              <Link
                key={r.href}
                ref={(el) => {
                  itemRefs.current[r.href] = el;
                }}
                href={r.href}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => movePill(r.href)}
                onFocus={() => movePill(r.href)}
                onBlur={restorePill}
                className={`relative px-3.5 py-2 text-[0.85rem] font-medium tracking-tight transition-colors z-10 ${
                  active ? "text-ink" : "text-ink-mute hover:text-ink"
                }`}
              >
                {r.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={openContact}
            className="btn btn-primary"
          >
            Contact
            <span className="btn-icon" aria-hidden>→</span>
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden -mr-2 p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            aria-hidden
            className={`block w-6 h-px bg-ink mb-1.5 transition-transform ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden
            className={`block w-6 h-px bg-ink mb-1.5 transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            aria-hidden
            className={`block w-6 h-px bg-ink transition-transform ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        style={{
          transitionProperty: "opacity, transform, visibility",
          transitionDuration: "280ms",
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        }}
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-30 bg-bg/95 backdrop-blur-xl border-t border-line overflow-y-auto overscroll-contain ${
          open
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-1 pointer-events-none"
        }`}
      >
        <nav className="px-5 py-6 flex flex-col" aria-label="Sections">
          {ROUTES.map((r, i) => {
            const active = pathname === r.href;
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-baseline gap-5 py-5 border-b border-line ${
                  active ? "text-electric" : ""
                }`}
              >
                <span className="label-num text-ink-faint w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-3xl tracking-tight font-medium"
                  style={{ letterSpacing: "-0.035em" }}
                >
                  {r.label}
                </span>
              </Link>
            );
          })}
          <Link
            href="/engage"
            className="btn btn-primary justify-center mt-8 self-start"
          >
            Engage with NNHC
            <span className="btn-icon" aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openContact();
            }}
            className="btn btn-ghost justify-center mt-3 self-start"
          >
            Contact us
          </button>
        </nav>
      </div>
    </header>
  );
}

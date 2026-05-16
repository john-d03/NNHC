"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { STAKEHOLDERS, type StakeholderId } from "@/lib/content";
import { useT } from "@/lib/i18n";

/* ─────────────────────────────────────────────────────────────
   Layout - pentagon vertices around (300, 300) at radius 210.
   Top vertex (HCP) at -90°; rotating clockwise.
   ───────────────────────────────────────────────────────────── */

const ORDER: StakeholderId[] = ["hcp", "biz", "sso", "neigh", "lsg"];
const CX = 300;
const CY = 300;
const R = 210;

const ANGLES: Record<StakeholderId, number> = {
  biz: -90,
  hcp: -18,
  sso: 54,
  neigh: 126,
  lsg: 198,
};

type Meta = {
  initials: string;
  glyph: string;
  metric: string;
  metricLabel: string;
  tagline: string;
};

const META: Record<StakeholderId, Meta> = {
  hcp: {
    initials: "HCP",
    // ECG pulse line - universal medical
    glyph: "M-9,0 L-5,0 L-3,-6 L-1,6 L1,-7 L3,5 L5,0 L9,0",
    metric: "120k+",
    metricLabel: "IMA members in Kerala",
    tagline: "The clinical anchor.",
  },
  lsg: {
    initials: "LSG",
    // Shield with check - civic governance
    glyph: "M-7,-7 L7,-7 L7,1 C7,5 4,7.5 0,9 C-4,7.5 -7,5 -7,1 Z M-3,-1 L-1,2 L4,-3",
    metric: "941",
    metricLabel: "panchayats statewide",
    tagline: "The public health spine.",
  },
  neigh: {
    initials: "NBR",
    // Three figures side by side - neighbourhood
    glyph:
      "M-6.6,-3 a1.6,1.6 0 1,0 3.2,0 a1.6,1.6 0 1,0 -3.2,0 M-1.6,-3 a1.6,1.6 0 1,0 3.2,0 a1.6,1.6 0 1,0 -3.2,0 M3.4,-3 a1.6,1.6 0 1,0 3.2,0 a1.6,1.6 0 1,0 -3.2,0 M-8,5 Q-5,1 -2,5 M-3,5 Q0,1 3,5 M2,5 Q5,1 8,5",
    metric: "100+",
    metricLabel: "households per cluster",
    tagline: "Where care actually happens.",
  },
  sso: {
    initials: "SSO",
    // Two interlocking rings - joined hands / unity
    glyph:
      "M-7.5,0 a4.5,4.5 0 1,0 9,0 a4.5,4.5 0 1,0 -9,0 M-1.5,0 a4.5,4.5 0 1,0 9,0 a4.5,4.5 0 1,0 -9,0",
    metric: "30+",
    metricLabel: "years of palliative trust",
    tagline: "Decades of community work.",
  },
  biz: {
    initials: "BIZ",
    // Institution: pediment + columns + base
    glyph:
      "M-9,-3 L0,-8 L9,-3 Z M-9,-3 L9,-3 M-9,7 L9,7 M-6,-3 L-6,7 M-2,-3 L-2,7 M2,-3 L2,7 M6,-3 L6,7",
    metric: "5",
    metricLabel: "ex-officio SPV seats",
    tagline: "Co-creators, not just donors.",
  },
};

function polar(angleDeg: number, radius: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}
const nodePoint = (id: StakeholderId) => polar(ANGLES[id], R);
const labelPoint = (id: StakeholderId) => polar(ANGLES[id], R + 56);
function labelAnchor(id: StakeholderId): "start" | "middle" | "end" {
  const c = Math.cos((ANGLES[id] * Math.PI) / 180);
  if (Math.abs(c) < 0.2) return "middle";
  return c > 0 ? "start" : "end";
}

const AUTO_INTERVAL = 4200;

export function StarModelInteractive() {
  const t = useT();
  const [selected, setSelected] = useState<StakeholderId>("hcp");
  const [auto, setAuto] = useState(true);
  const [reduced, setReduced] = useState(false);
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!auto || reduced) return;
    const t = window.setInterval(() => {
      setSelected((prev) => ORDER[(ORDER.indexOf(prev) + 1) % ORDER.length]);
    }, AUTO_INTERVAL);
    return () => window.clearInterval(t);
  }, [auto, reduced]);

  const select = useCallback((id: StakeholderId) => {
    setSelected(id);
    setAuto(false);
  }, []);

  const step = useCallback(
    (delta: number) => {
      const i = ORDER.indexOf(selected);
      select(ORDER[(i + delta + ORDER.length) % ORDER.length]);
    },
    [selected, select],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(ORDER[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      select(ORDER[ORDER.length - 1]);
    }
  };

  const current = STAKEHOLDERS.find((s) => s.id === selected)!;
  const currentMeta = META[selected];
  const currentIndex = ORDER.indexOf(selected);
  const sel = nodePoint(selected);

  const polyPoints = useMemo(
    () => ORDER.map((id) => `${nodePoint(id).x},${nodePoint(id).y}`).join(" "),
    [],
  );

  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
      {/* ───── Constellation ───── */}
      <div
        ref={figureRef}
        className="md:col-span-7 lg:col-span-7 relative"
        onMouseEnter={() => setAuto(false)}
        onFocus={() => setAuto(false)}
        onKeyDown={onKeyDown}
      >
        <div className="aspect-square w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[600px] mx-auto relative">
          <div className="constellation-glow" aria-hidden />

          <svg
            viewBox="0 0 600 600"
            className="w-full h-full overflow-visible relative"
            role="img"
            aria-label="Care at Home is at the centre, surrounded by five stakeholder groups: Health Care Professionals, Foundations and Trade Associations, Social Service Organisations, Neighbourhood, and Local Self Government."
          >
            <defs>
              <radialGradient id="ringFade" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--color-electric)" stopOpacity="0" />
                <stop offset="65%" stopColor="var(--color-electric)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--color-electric)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="spokeGrad" gradientUnits="userSpaceOnUse" x1={CX} y1={CY} x2={sel.x} y2={sel.y}>
                <stop offset="0%" stopColor="var(--color-electric)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--color-electric)" stopOpacity="1" />
              </linearGradient>
              <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="var(--color-line-strong)" opacity="0.55" />
              </pattern>
              <radialGradient id="gridMaskGrad" cx="50%" cy="50%" r="50%">
                <stop offset="38%" stopColor="white" stopOpacity="0.55" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <mask id="gridMask">
                <rect width="600" height="600" fill="url(#gridMaskGrad)" />
              </mask>
            </defs>

            <rect width="600" height="600" fill="url(#dotgrid)" mask="url(#gridMask)" />

            {/* Outer guide ring (solid) */}
            <circle cx={CX} cy={CY} r={R + 30} fill="none" stroke="var(--color-line-strong)" strokeWidth="1" />
            {/* Inner ring (dotted) */}
            <circle cx={CX} cy={CY} r={R} fill="url(#ringFade)" />
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--color-line-strong)" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" />

            {/* Pentagon - dotted */}
            <polygon
              points={polyPoints}
              fill="var(--color-electric)"
              fillOpacity="0.04"
              stroke="var(--color-electric)"
              strokeWidth="1.5"
              strokeOpacity="0.65"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1 6"
            />
            {/* Pentagram (5-pointed star) connecting alternate vertices - dotted */}
            <polygon
              points={ORDER.map((_, i) => {
                const p = nodePoint(ORDER[(i * 2) % ORDER.length]);
                return `${p.x},${p.y}`;
              }).join(" ")}
              fill="none"
              stroke="var(--color-electric)"
              strokeWidth="1.25"
              strokeOpacity="0.55"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="1 6"
            />

            {/* Inactive spokes */}
            {ORDER.map((id) => {
              if (id === selected) return null;
              const p = nodePoint(id);
              return (
                <line
                  key={`spoke-${id}`}
                  x1={CX}
                  y1={CY}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--color-line-strong)"
                  strokeWidth="1"
                  strokeDasharray="2 6"
                  opacity="0.55"
                />
              );
            })}

            {/* Active spoke */}
            <line
              x1={CX}
              y1={CY}
              x2={sel.x}
              y2={sel.y}
              stroke="url(#spokeGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              className="constellation-spoke"
            />
            {!reduced && (
              <circle
                r="3.5"
                fill="var(--color-electric)"
                className="constellation-pulse"
                style={{
                  offsetPath: `path('M${CX},${CY} L${sel.x},${sel.y}')`,
                  // @ts-expect-error vendor prefix
                  WebkitOffsetPath: `path('M${CX},${CY} L${sel.x},${sel.y}')`,
                }}
              />
            )}

            {/* Centre disc */}
            <g>
              <circle cx={CX} cy={CY} r="84" fill="var(--color-ink)" />

              {/* Home icon (centred, refined) */}
              <g
                transform={`translate(${CX} ${CY})`}
                fill="none"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Roof + walls */}
                <path d="M-18,-2 L0,-18 L18,-2 L18,18 L-18,18 Z" />
                {/* Door */}
                <path d="M-5,18 L-5,6 L5,6 L5,18" />
                {/* Chimney */}
                <path d="M9,-11 L9,-15 L13,-15 L13,-7" />
                {/* Heart inside (signifying care at home) */}
                <path
                  d="M0,2 C-3,-2 -8,0 -8,4 C-8,7 -4,10 0,13 C4,10 8,7 8,4 C8,0 3,-2 0,2 Z"
                  fill="var(--color-electric)"
                  stroke="var(--color-electric)"
                  strokeWidth="1"
                />
              </g>

              {/* Circular text path: "CARE · AT · HOME · " rotating around the disc */}
              <defs>
                <path
                  id="care-home-circle"
                  d={`M ${CX - 64},${CY} a 64,64 0 1,1 128,0 a 64,64 0 1,1 -128,0`}
                />
              </defs>
              <g>
                <text
                  fill="#fff"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: 6,
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  <textPath
                    href="#care-home-circle"
                    startOffset="0"
                    textAnchor="start"
                    textLength={2 * Math.PI * 64}
                    lengthAdjust="spacing"
                  >
                    CARE · AT · HOME ·  · 24/7 ·  ·
                  </textPath>
                </text>
                {!reduced && (
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from={`0 ${CX} ${CY}`}
                    to={`360 ${CX} ${CY}`}
                    dur="22s"
                    repeatCount="indefinite"
                  />
                )}
              </g>
            </g>

            {/* Nodes */}
            {ORDER.map((id) => {
              const s = STAKEHOLDERS.find((x) => x.id === id)!;
              const meta = META[id];
              const p = nodePoint(id);
              const lp = labelPoint(id);
              const anchor = labelAnchor(id);
              const active = id === selected;

              return (
                <g
                  key={id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${t(`stakeholders.${id}.label`, s.label)}. ${t(`stakeholders.${id}.tagline`, meta.tagline)}`}
                  aria-pressed={active}
                  onClick={() => select(id)}
                  onMouseEnter={() => select(id)}
                  onFocus={() => select(id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(id);
                    }
                  }}
                  className="constellation-node"
                  data-active={active}
                >
                  <circle cx={p.x} cy={p.y} r="48" fill="transparent" />

                  {active && !reduced && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="32"
                      fill="none"
                      stroke="var(--color-electric)"
                      strokeWidth="1"
                      className="constellation-node__halo"
                    />
                  )}

                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={active ? 34 : 26}
                    fill={active ? "var(--color-electric)" : "var(--color-surface)"}
                    stroke={active ? "var(--color-electric)" : "var(--color-line-strong)"}
                    strokeWidth="1.5"
                    className="constellation-node__disc"
                  />

                  <path
                    d={meta.glyph}
                    transform={`translate(${p.x} ${p.y})`}
                    fill="none"
                    stroke={active ? "#fff" : "var(--color-ink-soft)"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <text
                    x={p.x}
                    y={p.y + (active ? 52 : 44)}
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9.5,
                      letterSpacing: 2,
                      fill: active ? "var(--color-electric)" : "var(--color-ink-mute)",
                      fontWeight: 500,
                    }}
                  >
                    {meta.initials}
                  </text>

                  <text
                    x={lp.x}
                    y={lp.y}
                    textAnchor={anchor}
                    style={{
                      fontFamily: "var(--font-italic)",
                      fontStyle: "italic",
                      fontSize: 22,
                      letterSpacing: "-0.01em",
                      fill: "var(--color-ink)",
                      opacity: active ? 1 : 0.55,
                    }}
                    className="constellation-label"
                  >
                    {t(`stakeholders.${id}.label`, s.label).split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

      </div>

      {/* ───── Detail panel (with integrated controls) ───── */}
      <div className="md:col-span-5 lg:col-span-5">
        <div key={selected} className="constellation-panel card p-6 md:p-7 lg:p-8">
          <div className="flex items-baseline justify-between gap-4 mb-5 pb-4 border-b border-line">
            <span className="label-num text-ink-faint">
              {String(currentIndex + 1).padStart(2, "0")}
              <span className="text-ink-faint/60"> / 05</span>
            </span>
            <span className="label">{t(`stakeholders.${selected}.group`, current.group)}</span>
          </div>

          <p className="h-italic text-xl md:text-2xl text-ink-soft mb-2 leading-tight">
            {t(`stakeholders.${selected}.tagline`, currentMeta.tagline)}
          </p>

          <h3 className="h-display text-2xl md:text-3xl mb-4 leading-[1.05] text-balance">
            {t(`stakeholders.${selected}.label`, current.label)}
          </h3>

          <p className="text-[0.95rem] leading-relaxed text-ink-soft mb-6">
            {t(`stakeholders.${selected}.body`, current.body)}
          </p>

          <div className="flex items-end gap-4 py-4 border-y border-line mb-5">
            <span className="bignum text-electric text-4xl md:text-5xl">
              {currentMeta.metric}
            </span>
            <span className="text-xs text-ink-mute leading-snug pb-1.5 max-w-[10rem]">
              {t(`stakeholders.${selected}.metricLabel`, currentMeta.metricLabel)}
            </span>
          </div>

          <div className="mb-6">
            <span className="label block mb-2">{t("star.membersLabel", "Members")}</span>
            <p className="text-sm text-ink-soft leading-relaxed">
              {t(`stakeholders.${selected}.members`, current.members)}
            </p>
          </div>

          {/* Integrated controls */}
          <div className="flex items-center gap-2 md:gap-3 pt-5 border-t border-line">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous stakeholder"
              className="constellation-arrow"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M9 2 L4 7 L9 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="constellation-segments flex-1" role="tablist" aria-label="Stakeholder index">
              {ORDER.map((id, i) => {
                const active = id === selected;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => select(id)}
                    className="constellation-segment"
                    data-active={active}
                  >
                    <span className="constellation-segment__num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="constellation-segment__label">{META[id].initials}</span>
                    <span className="constellation-segment__bar" aria-hidden />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next stakeholder"
              className="constellation-arrow"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path d="M5 2 L10 7 L5 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setAuto((a) => !a)}
              aria-pressed={auto}
              className="constellation-auto"
              title={auto ? "Pause auto-rotation" : "Resume auto-rotation"}
            >
              <span className="constellation-auto__dot" data-on={auto} aria-hidden />
              <span>{auto ? "Auto" : "Paused"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

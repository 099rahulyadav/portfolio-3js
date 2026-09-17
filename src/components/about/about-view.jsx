"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as Dynamic from "next/dynamic";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
import * as ScrambleText from "@/components/ui/scramble-text";
import * as Image from "next/image";
import * as UiScale from "@/lib/ui-scale";
import * as Quality from "@/lib/quality";
import * as SmoothScrollProvider from "@/components/layout/smooth-scroll-provider";
import * as LiveStatus from "@/components/home/live-status";
import * as Links from "@/lib/links";
let m = (e, t, a) => (e < t ? t : e > a ? a : e);
function CareerLogo({ entry: e }) {
  return e.logo ? (
    <span
      className={
        "relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-white/10"
      }
    >
      <Image.default
        src={e.logo}
        alt={`${e.company} logo`}
        fill={true}
        sizes={"40px"}
        className={"object-contain p-1"}
      />
    </span>
  ) : (
    <span
      className={
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-950 font-mono text-sm font-semibold text-zinc-400 ring-1 ring-white/10"
      }
    >
      {e.company.charAt(0)}
    </span>
  );
}
function CareerCard({ entry: e, marker: a }) {
  return (
    <article
      {...{
        [a]: "",
      }}
      className={"career-card w-full max-w-sm rounded-2xl bg-white/[0.02] p-5"}
    >
      <div className={"flex items-start justify-between gap-4"}>
        <div className={"flex items-center gap-4"}>
          <CareerLogo entry={e} />
          <div className={"min-w-0"}>
            <ScrambleText.ScrambleText
              as={"p"}
              entrance={"observer"}
              className={"truncate text-xl font-semibold text-white"}
            >
              {e.company}
            </ScrambleText.ScrambleText>
          </div>
        </div>
        <span
          className={
            "shrink-0 whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.15em] text-zinc-500"
          }
        >
          {e.period}
        </span>
      </div>
      {(e.title || e.description) && (
        <p className={"mt-4 text-sm leading-relaxed"}>
          {e.title && (
            <span className={"font-semibold text-blue-400"}>{e.title}</span>
          )}
          {e.title && e.description ? " " : null}
          {e.description && (
            <span className={"text-zinc-400"}>{e.description}</span>
          )}
        </p>
      )}
    </article>
  );
}
function CareerTimeline({ entries: e, eyebrow: r }) {
  let n = React.useRef(null),
    c = React.useRef(null),
    x = React.useRef([]),
    p = React.useRef([]),
    g = React.useRef(null),
    b = React.useRef(null);
  return (
    Animation.useGSAP(
      () => {
        let t = c.current,
          a = n.current;
        if (!t || !a) return;
        let r = (a, r) => {
            let n = Animation.gsap.utils.toArray(r, t),
              i = t.getBoundingClientRect(),
              s = UiScale.uiScale(),
              o = Motion.CAREER.gap * s,
              c = 16 * s,
              m = 10 * s,
              u = n.map((e) => {
                let t = e.getBoundingClientRect();
                return {
                  left: t.left - i.left,
                  right: t.right - i.left,
                  top: t.top - i.top,
                  cy: t.top - i.top + t.height / 2,
                };
              }),
              f = [],
              w = [],
              y = 0;
            if (a)
              for (let t = 0; t < n.length - 1; t++) {
                let a = u[t],
                  r = u[t + 1],
                  n = "left" === e[t].side ? a.right + o : a.left - o,
                  i = a.cy,
                  d = (r.left + r.right) / 2,
                  h = r.top - o,
                  m = d >= n ? 1 : -1,
                  p = Math.max(
                    2 * s,
                    Math.min(c, Math.abs(d - n) / 2, Math.abs(h - i) / 2),
                  ),
                  g = `M ${n} ${i} H ${d - m * p} Q ${d} ${i} ${d} ${i + p} V ${h}`,
                  b = x.current[t];
                if (!b) continue;
                b.setAttribute("d", g);
                let v = b.getTotalLength();
                Animation.gsap.set(b, {
                  strokeDasharray: v,
                  strokeDashoffset: v,
                });
                let j = y;
                (f.push({
                  path: b,
                  len: v,
                  cumBefore: j,
                }),
                  w.push({
                    x: n,
                    y: i,
                    cum: j,
                  }),
                  (y += v),
                  w.push({
                    x: d,
                    y: h,
                    cum: y,
                  }));
              }
            else {
              if (u.length > 1) {
                let e = u[0].cy,
                  t = u[u.length - 1].cy,
                  a = x.current[0];
                if (a) {
                  a.setAttribute("d", `M ${m} ${e} V ${t}`);
                  let r = Math.max(a.getTotalLength(), 1);
                  (Animation.gsap.set(a, {
                    strokeDasharray: r,
                    strokeDashoffset: r,
                  }),
                    f.push({
                      path: a,
                      len: r,
                      cumBefore: 0,
                    }),
                    (y = r));
                }
              }
              u.forEach((e) =>
                w.push({
                  x: m,
                  y: e.cy,
                  cum: e.cy - (u[0]?.cy ?? 0),
                }),
              );
            }
            for (let e = f.length; e < x.current.length; e++)
              x.current[e]?.setAttribute("d", "");
            let v = Math.max(y, 1),
              j = n.map((e, t) =>
                a
                  ? 0 === t
                    ? 0
                    : (f[t - 1].cumBefore + f[t - 1].len) / v
                  : (u[t].cy - (u[0]?.cy ?? 0)) / v,
              ),
              M = w.map((e) => ({
                x: e.x,
                y: e.y,
                reach: e.cum / v,
              }));
            M.forEach((e, t) => {
              let a = p.current[t];
              a &&
                (a.setAttribute("cx", String(e.x)),
                a.setAttribute("cy", String(e.y)),
                (a.style.visibility = ""));
            });
            for (let e = M.length; e < p.current.length; e++) {
              let t = p.current[e];
              t && (t.style.visibility = "hidden");
            }
            return (
              g.current &&
                (M[0]
                  ? (g.current.setAttribute("cx", String(M[0].x)),
                    g.current.setAttribute("cy", String(M[0].y)),
                    (g.current.style.visibility = ""))
                  : (g.current.style.visibility = "hidden")),
              x.current.forEach((e) =>
                e?.setAttribute(
                  "stroke-width",
                  String(Motion.CAREER.stroke * s),
                ),
              ),
              g.current?.setAttribute("r", String(Motion.CAREER.nodeFlare * s)),
              b.current?.setAttribute("r", String(Motion.CAREER.tip * s)),
              {
                segs: f,
                total: v,
                reachAt: j,
                nodes: M,
                cards: n,
                s: s,
              }
            );
          },
          i = (t, a) => (t && "left" === e[a].side ? 1 : -1),
          o = (e, t) => {
            let n = Motion.prefersReducedMotion(),
              o = r(e, t),
              c = -1,
              h = o.cards.map(() => n),
              x = (e) => {
                (Animation.gsap.set(e, {
                  opacity: 1,
                }),
                  (e.style.transform = ""));
              };
            o.cards.forEach((t, a) => {
              n
                ? x(t)
                : Animation.gsap.set(t, {
                    opacity: 0,
                    x: 30 * i(e, a),
                  });
            });
            let u = (e) => {
                let {
                    segs: t,
                    total: a,
                    reachAt: r,
                    nodes: n,
                    cards: i,
                    s: s,
                  } = o,
                  u = m(e, 0, 1) * a;
                t.forEach((e) => {
                  let t = m(u - e.cumBefore, 0, e.len);
                  e.path.style.strokeDashoffset = String(e.len - t);
                });
                let f = b.current;
                if (f)
                  if (e > 0.002 && e < 0.999 && t.length) {
                    let e = t[0];
                    for (let a of t) u >= a.cumBefore && (e = a);
                    let a = m(u - e.cumBefore, 0, e.len),
                      r = e.path.getPointAtLength(a);
                    (f.setAttribute("cx", String(r.x)),
                      f.setAttribute("cy", String(r.y)),
                      (f.style.opacity = "1"));
                  } else f.style.opacity = "0";
                let g = -1;
                (r.forEach((t, a) => {
                  !h[a] &&
                    e >= Math.max(0, t - 0.06) &&
                    ((h[a] = true),
                    Animation.gsap.to(o.cards[a], {
                      opacity: 1,
                      x: 0,
                      duration: 0.6,
                      ease: "power3.out",
                      onComplete: () => x(o.cards[a]),
                    }));
                  e >= t - 0.001 && (g = a);
                }),
                  g !== c &&
                    (i.forEach((e, t) =>
                      e.classList.toggle("is-active", t === g),
                    ),
                    (c = g)),
                  n.forEach((t, a) => {
                    let r = p.current[a];
                    if (!r) return;
                    let l = m((e - (t.reach - 0.02)) / 0.05, 0, 1);
                    (r.setAttribute(
                      "r",
                      String(
                        (Motion.CAREER.node +
                          (Motion.CAREER.nodeFlare - Motion.CAREER.node) * l) *
                          s,
                      ),
                    ),
                      (r.style.opacity = String(0.28 + 0.72 * l)));
                  }));
              },
              f = () => o.cards[o.cards.length - 1],
              g = Motion.careerLineDraw(a, u, f()),
              w = () => {
                (g?.scrollTrigger?.kill(),
                  g?.kill(),
                  (o = r(e, t)),
                  (c = -1),
                  o.cards.forEach((t, a) => {
                    n || h[a]
                      ? x(t)
                      : Animation.gsap.set(t, {
                          opacity: 0,
                          x: 30 * i(e, a),
                        });
                  }),
                  (g = Motion.careerLineDraw(a, u, f())));
              },
              y = Animation.gsap.delayedCall(0.35, w),
              v = 0,
              j = () => {
                (window.clearTimeout(v), (v = window.setTimeout(w, 200)));
              };
            return (
              window.addEventListener("resize", j),
              () => {
                (window.removeEventListener("resize", j),
                  window.clearTimeout(v),
                  y.kill(),
                  g?.scrollTrigger?.kill(),
                  g?.kill());
              }
            );
          },
          u = Animation.gsap.matchMedia();
        return (
          u.add("(min-width: 1024px)", () => o(true, "[data-career-card]")),
          u.add("(max-width: 1023px)", () => o(false, "[data-career-card-m]")),
          () => u.revert()
        );
      },
      {
        scope: n,
      },
    ),
    (
      <section
        id={"career"}
        ref={n}
        className={"relative border-t border-white/5 px-6 py-24 sm:px-10"}
      >
        <div className={"mx-auto max-w-6xl"}>
          <ScrambleText.ScrambleText
            as={"p"}
            entrance={"observer"}
            className={
              "mb-16 font-mono text-xs uppercase tracking-[0.3em] text-blue-400"
            }
          >
            {r}
          </ScrambleText.ScrambleText>
          <div ref={c} className={"relative mx-auto max-w-5xl"}>
            <svg
              aria-hidden={true}
              className={
                "pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              }
            >
              {e.map((e, a) => (
                <path
                  ref={(e) => {
                    x.current[a] = e;
                  }}
                  className={"career-line"}
                  fill={"none"}
                  stroke={Motion.CAREER.color}
                  strokeWidth={Motion.CAREER.stroke}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                  key={`s${a}`}
                />
              ))}
              <circle
                ref={g}
                className={"career-node-pulse"}
                fill={Motion.CAREER.color}
                r={Motion.CAREER.nodeFlare}
              />
              {Array.from({
                length: Math.max(e.length, (e.length - 1) * 2),
              }).map((e, a) => (
                <circle
                  ref={(e) => {
                    p.current[a] = e;
                  }}
                  className={"career-line"}
                  fill={Motion.CAREER.color}
                  r={Motion.CAREER.node}
                  key={`n${a}`}
                />
              ))}
              <circle
                ref={b}
                className={"career-tip"}
                fill={"#ffffff"}
                r={Motion.CAREER.tip}
                opacity={0}
              />
            </svg>
            <div className={"hidden flex-col gap-20 lg:flex"}>
              {e.map((e, a) => (
                <div className={"grid grid-cols-2 items-center"} key={a}>
                  <div className={"flex justify-start"}>
                    {"left" === e.side && (
                      <CareerCard entry={e} marker={"data-career-card"} />
                    )}
                  </div>
                  <div className={"flex justify-end"}>
                    {"right" === e.side && (
                      <CareerCard entry={e} marker={"data-career-card"} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={"flex flex-col gap-8 pl-8 lg:hidden"}>
              {e.map((e, a) => (
                <CareerCard entry={e} marker={"data-career-card-m"} key={a} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  );
}
function EducationCircuit() {
  let e = React.useRef(null),
    r = React.useRef(null);
  return (
    React.useEffect(() => {
      let t = e.current,
        a = r.current;
      if (!t || !a) return;
      let l = a.getContext("2d");
      if (!l) return;
      let n =
          Motion.prefersReducedMotion() ||
          "low" === Quality.detectQualityTier(),
        i = Array.from(
          {
            length: 8,
          },
          () => ({
            value: 0.5 * Math.random() + 0.1,
            target: 0.5 * Math.random() + 0.1,
            speed: 0.02 * Math.random() + 0.01,
          }),
        ),
        o = 0,
        c = 0,
        d = 0,
        h = false,
        m = 1.2 * !!n,
        x = () => {
          let e = t.getBoundingClientRect(),
            r = Math.min(window.devicePixelRatio || 1, 2);
          ((o = Math.max(1, e.width)),
            (c = Math.max(1, e.height)),
            (a.width = Math.round(o * r)),
            (a.height = Math.round(c * r)),
            l.setTransform(r, 0, 0, r, 0, 0),
            n && u());
        };
      function u() {
        (l.clearRect(0, 0, o, c),
          i.forEach((e, t) => {
            let a = 7 * e.value;
            l.beginPath();
            for (let e = 0; e < o; e++) {
              let r = (e / o) * 2 - 1 + 0.04 * t + 0.03 * a,
                n =
                  ((Math.sin(10 * r + m) *
                    Math.cos(2 * r) *
                    a *
                    0.1 *
                    ((t + 1) / 8) +
                    1) *
                    c) /
                  2;
              0 === e ? l.moveTo(e, n) : l.lineTo(e, n);
            }
            let r = Math.min(1, 0.3 * a),
              n = 59 + 90 * r,
              i = 130 + 90 * r;
            ((l.lineWidth = 1 + 0.25 * t),
              (l.strokeStyle = `rgba(${n},${i},246,0.5)`),
              (l.shadowColor = `rgba(${n},${i},246,0.5)`),
              (l.shadowBlur = 6),
              l.stroke(),
              (l.shadowBlur = 0));
          }));
      }
      let f = () => {
          for (let e of ((m += 0.02), i))
            (0.01 > Math.random() && (e.target = 0.7 * Math.random() + 0.1),
              (e.value += (e.target - e.value) * e.speed));
          (u(), (d = requestAnimationFrame(f)));
        },
        g = () => {
          ((h = false), cancelAnimationFrame(d));
        };
      x();
      let b = new ResizeObserver(x);
      if ((b.observe(t), n)) return (u(), () => b.disconnect());
      let w = new IntersectionObserver(
        ([e]) =>
          e.isIntersecting
            ? void (!h && ((h = true), (d = requestAnimationFrame(f))))
            : g(),
        {
          threshold: 0,
        },
      );
      return (
        w.observe(t),
        () => {
          (g(), w.disconnect(), b.disconnect());
        }
      );
    }, []),
    (
      <div
        ref={e}
        aria-hidden={true}
        className={"pointer-events-none absolute inset-0 overflow-hidden"}
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)",
        }}
      >
        <canvas ref={r} className={"h-full w-full opacity-50"} />
      </div>
    )
  );
}
function EducationSection({ entries: e, eyebrow: r, heading: n }) {
  let c,
    d,
    h,
    m = React.useRef(null),
    x = React.useRef(null),
    u = SmoothScrollProvider.useSmoothScroll(),
    f = n.split(""),
    p = (f.length - 1) / 2;
  return (Animation.useGSAP(
    () => {
      Motion.scrollReveal(
        "[data-edu-card]",
        {
          y: 24,
        },
        "top 88%",
      );
    },
    {
      scope: m,
    },
  ),
  React.useEffect(() => {
    let e = x.current;
    if (!e || !n) return;
    let t = Animation.gsap.utils.toArray("[data-conv-char]", e);
    if (!t.length) return;
    if (Motion.prefersReducedMotion())
      return void Animation.gsap.set(t, {
        x: 0,
        rotateX: 0,
        opacity: 1,
      });
    let a = t.map((e) => ({
        el: e,
        d: Number(e.dataset.d) || 0,
      })),
      r = -1,
      i = () => {
        let t = window.innerHeight || 1,
          n = (t - e.getBoundingClientRect().top) / (0.65 * t),
          i = n < 0 ? 0 : n > 1 ? 1 : n;
        if (0.001 > Math.abs(i - r)) return;
        r = i;
        let s = 1 - Math.pow(1 - i, 3);
        for (let e of a)
          Animation.gsap.set(e.el, {
            x: 60 * e.d * (1 - s),
            rotateX: 48 * e.d * (1 - s),
            opacity: 0.12 + 0.88 * s,
          });
      };
    i();
    let o = () => i();
    return (
      u
        ? u.on("scroll", o)
        : window.addEventListener("scroll", o, {
            passive: true,
          }),
      window.addEventListener("resize", o),
      () => {
        (u ? u.off("scroll", o) : window.removeEventListener("scroll", o),
          window.removeEventListener("resize", o));
      }
    );
  }, [n, u]),
  e.length) ? (
    <section
      id={"education"}
      ref={m}
      className={
        "relative overflow-hidden border-t border-white/5 px-6 py-24 sm:px-10"
      }
    >
      <EducationCircuit />
      <div className={"relative z-10 mx-auto max-w-6xl"}>
        <ScrambleText.ScrambleText
          as={"p"}
          entrance={"observer"}
          className={
            "mb-10 font-mono text-xs uppercase tracking-[0.3em] text-blue-400 sm:mb-12"
          }
        >
          {r}
        </ScrambleText.ScrambleText>
        {n && (
          <h2
            ref={x}
            aria-label={n}
            className={
              "mb-12 font-[family-name:var(--font-relidux)] text-5xl uppercase leading-[0.95] tracking-[0.02em] text-white sm:text-7xl"
            }
            style={{
              perspective: "600px",
            }}
          >
            {
              ((c = []),
              (d = []),
              (h = (e) => {
                d.length &&
                  (c.push(
                    <span className={"inline-block whitespace-nowrap"} key={e}>
                      {d}
                    </span>,
                  ),
                  (d = []));
              }),
              f.forEach((e, a) => {
                " " === e
                  ? (h(`w${a}`), c.push(<span key={`s${a}`}> </span>))
                  : d.push(
                      <span
                        aria-hidden={true}
                        data-conv-char={true}
                        data-d={a - p}
                        className={"inline-block will-change-transform"}
                        key={a}
                      >
                        {e}
                      </span>,
                    );
              }),
              h("wEnd"),
              c)
            }
          </h2>
        )}
        <div className={"grid gap-6 sm:grid-cols"}>
          {e.map((e, a) => (
            <article data-edu-card={true} key={`${e.degree}-${a}`}>
              <div
                className={
                  "edu-float group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-[0_24px_60px_-24px_rgba(59,130,246,0.55)] sm:p-7"
                }
                style={{
                  animationDelay: `${0.9 * a}s`,
                }}
              >
                <span
                  aria-hidden={true}
                  className={
                    "pointer-events-none absolute -right-1 -top-3 font-mono text-7xl font-semibold leading-none text-white/[0.05] sm:text-8xl"
                  }
                >
                  {String(a + 1).padStart(2, "0")}
                </span>
                {e.period && (
                  <div className={"relative flex items-center gap-2"}>
                    <span
                      className={
                        "h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                      }
                    />
                    <span
                      className={
                        "font-mono text-[0.625rem] uppercase tracking-[0.25em] text-zinc-400"
                      }
                    >
                      {e.period}
                    </span>
                  </div>
                )}
                <ScrambleText.ScrambleText
                  as={"h3"}
                  entrance={"observer"}
                  className={`relative overflow-hidden text-xl font-semibold leading-snug text-white sm:text-2xl ${e.period ? "mt-4" : ""}`}
                >
                  {e.degree}
                </ScrambleText.ScrambleText>
                <p
                  className={
                    "relative mt-1.5 text-sm font-medium text-blue-300"
                  }
                >
                  {e.institution}
                </p>
                {e.detail && (
                  <p
                    className={
                      "relative mt-4 border-t border-white/[0.08] pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-zinc-400"
                    }
                  >
                    {e.detail}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  ) : null;
}
({
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
});
let y = 2 * Math.PI;
function v(e) {
  let t = 0x811c9dc5;
  for (let a = 0; a < e.length; a++)
    ((t ^= e.charCodeAt(a)), (t = Math.imul(t, 0x1000193)));
  return t >>> 0;
}
function j(e) {
  let t = e >>> 0 || 1;
  return () => (
    (t ^= t << 13),
    (t ^= t >>> 17),
    (t ^= t << 5),
    (t >>>= 0) / 0x100000000
  );
}
function M({ skills: e, logo: r }) {
  let l = React.useRef(null),
    n = React.useRef(null),
    [i, s] = React.useState(null),
    o = React.useMemo(() => e.reduce((e, t) => e + t.items.length, 0), [e]);
  return (
    React.useEffect(() => {
      let t = l.current,
        a = n.current;
      if (!t || !a) return;
      let i = a.getContext("2d");
      if (!i) return;
      let c = getComputedStyle(a).fontFamily || "system-ui, sans-serif",
        d = window.matchMedia("(hover: hover) and (pointer: fine)").matches,
        m = new window.Image();
      m.crossOrigin = "anonymous";
      let x = false;
      ((m.onload = () => {
        x = true;
      }),
        (m.src = r));
      let u = (e) => ("core" === e ? 13 : "hub" === e ? 12 : 15),
        f = 0,
        p = 0,
        g = 1,
        b = 0,
        w = false,
        M = false,
        N = 0,
        E = 0,
        k = 0,
        A = [],
        R = [],
        S = {
          type: "core",
          label: "ARIF",
          cat: -1,
          ax: 0,
          ay: 0,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          hx: 0,
          hy: 0,
          ph: 0,
          r: 20,
          lw: 0,
          lh: 13,
        },
        C = {
          x: -1e4,
          y: -1e4,
          active: false,
        },
        z = (e, t, a) => (e < t ? t : e > a ? a : e),
        T = (e) => Math.max(e.lw, 2 * e.r) / 2 + 16,
        L = (e) => e.y - e.r - 16,
        P = (e) => e.y + e.r + 7 + e.lh + 16,
        $ = (e, t = true) => {
          if (e)
            for (let e of A)
              "core" !== e.type &&
                ((e.x += (e.ax - e.x) * 0.05), (e.y += (e.ay - e.y) * 0.05));
          for (let e = 0; e < A.length; e++)
            for (let t = e + 1; t < A.length; t++) {
              let a = A[e],
                r = A[t],
                l = T(a),
                n = T(r),
                i = Math.min(a.x + l, r.x + n) - Math.max(a.x - l, r.x - n),
                s = Math.min(P(a), P(r)) - Math.max(L(a), L(r));
              if (i > 0 && s > 0)
                if (i < s) {
                  let e = i / 2 + 0.5,
                    t = a.x <= r.x ? 1 : -1;
                  ("core" !== a.type && (a.x -= t * e),
                    "core" !== r.type && (r.x += t * e));
                } else {
                  let e = s / 2 + 0.5,
                    t = a.y <= r.y ? 1 : -1;
                  ("core" !== a.type && (a.y -= t * e),
                    "core" !== r.type && (r.y += t * e));
                }
            }
          if (t)
            for (let e of A) {
              if ("core" === e.type) continue;
              let t = Math.max(e.lw, 2 * e.r) / 2,
                a = e.x - t,
                r = e.x + t,
                l = e.y - e.r - 4,
                n = e.y + e.r + 7 + e.lh,
                i = e.x,
                s = (l + n) / 2;
              for (let t of R) {
                if (t.a === e || t.b === e) continue;
                let o = t.a.x,
                  c = t.a.y,
                  d = t.b.x - o,
                  h = t.b.y - c,
                  m = d * d + h * h || 1,
                  x = ((i - o) * d + (s - c) * h) / m,
                  u = o + (x = x < 0 ? 0 : x > 1 ? 1 : x) * d,
                  f = c + x * h,
                  p = (u < a ? a : u > r ? r : u) - u,
                  g = (f < l ? l : f > n ? n : f) - f,
                  b = Math.sqrt(p * p + g * g);
                if (b < 15) {
                  b < 0.01 &&
                    (b = Math.sqrt((p = i - u) * p + (g = s - f) * g) || 1);
                  let t = (15 - b) * 0.8;
                  ((e.x += (p / b) * t), (e.y += (g / b) * t));
                }
              }
            }
          for (let e of A) {
            if ("core" === e.type) continue;
            let t = T(e);
            ((e.x = z(e.x, 8 + t, f - 8 - t)),
              (e.y = z(e.y, 8 + e.r + 16, p - 8 - e.r - 7 - e.lh - 16)));
          }
        },
        F = () => {
          let r = t.getBoundingClientRect(),
            l = UiScale.uiScale(),
            n = Math.min(window.devicePixelRatio || 1, 2 / l);
          f = Math.max(1, r.width / l);
          let s = 1 + e.length + o;
          ((p = z(
            (f >= 1024 ? 680 : 560) + 15 * Math.max(0, s - 14),
            560,
            960,
          )),
            (a.style.height = `${p * l}px`),
            (a.width = Math.round(f * l * n)),
            (a.height = Math.round(p * l * n)),
            i.setTransform(n * l, 0, 0, n * l, 0, 0),
            (g = l),
            ((t) => {
              ((A.length = 0), (R.length = 0));
              let a = f / 2,
                r = p / 2;
              ((S.ax = S.x = S.hx = a), (S.ay = S.y = S.hy = r), A.push(S));
              let l = e.length,
                n = Math.min(f, p);
              for (let t of (e.forEach((e, t) => {
                let i = j(v(e.label) ^ (0x9e3779b1 * t)),
                  s = (t / l) * y - Math.PI / 2 + (i() - 0.5) * (y / l) * 0.3,
                  o = 0.235 * f * (0.85 + 0.4 * i()),
                  c = 0.255 * p * (0.85 + 0.4 * i()),
                  d = a + Math.cos(s) * o,
                  h = r + Math.sin(s) * c,
                  m = {
                    type: "hub",
                    label: e.label,
                    cat: t,
                    ax: d,
                    ay: h,
                    x: 0,
                    y: 0,
                    vx: 0,
                    vy: 0,
                    hx: 0,
                    hy: 0,
                    ph: i() * y,
                    r: 5,
                    lw: 0,
                    lh: u("hub"),
                  };
                (A.push(m),
                  R.push({
                    a: S,
                    b: m,
                    pulse: i(),
                    speed: 0.16,
                  }));
                let x = e.items.length,
                  g = Math.atan2(h - r, d - a);
                e.items.forEach((e, a) => {
                  let r = j(v(e) ^ (0x27d4eb2f * t) ^ (0x165667b1 * a)),
                    l = g + (a - (x - 1) / 2) * 0.85 + (r() - 0.5) * 0.35,
                    i = 0.18 * n * (0.85 + 0.4 * r()),
                    s = {
                      type: "leaf",
                      label: e,
                      cat: t,
                      ax: d + Math.cos(l) * i,
                      ay: h + Math.sin(l) * i,
                      x: 0,
                      y: 0,
                      vx: 0,
                      vy: 0,
                      hx: 0,
                      hy: 0,
                      ph: r() * y,
                      r: 3,
                      lw: 0,
                      lh: u("leaf"),
                    };
                  (A.push(s),
                    R.push({
                      a: m,
                      b: s,
                      pulse: r(),
                      speed: 0.3 + (a % 3) * 0.08,
                    }));
                });
              }),
              A)) {
                i.font = `700 ${t.lh}px ${c}`;
                let e = "hub" === t.type ? t.label.toUpperCase() : t.label;
                ((t.lw = "core" === t.type ? 0 : i.measureText(e).width),
                  (t.x = t.ax),
                  (t.y = t.ay));
              }
              for (let e = 0; e < 260; e++) $(true);
              for (let e = 0; e < 120; e++) $(false);
              for (let e = 0; e < 40; e++) $(false, false);
              {
                let e = f / 2,
                  t = p / 2,
                  a = 1,
                  r = 1,
                  l = 1,
                  n = 1;
                for (let i of A) {
                  let s = T(i);
                  ((a = Math.max(a, i.x + s - e)),
                    (r = Math.max(r, e - (i.x - s))),
                    (l = Math.max(l, t - L(i))),
                    (n = Math.max(n, P(i) - t)));
                }
                let i = Math.min(
                  1.45,
                  (e - 12) / r,
                  (e - 12) / a,
                  (t - 12) / l,
                  (t - 12) / n,
                );
                if (i > 1.001)
                  for (let a of A)
                    "core" !== a.type &&
                      ((a.x = e + (a.x - e) * i), (a.y = t + (a.y - t) * i));
              }
              for (let e of A)
                ((e.hx = e.x),
                  (e.hy = e.y),
                  t && "core" !== e.type && ((e.x = S.hx), (e.y = S.hy)),
                  (e.vx = 0),
                  (e.vy = 0));
            })(!M));
        },
        I = -1,
        B = 0,
        q = (t) => {
          let a = B ? Math.min(0.05, (t - B) / 1e3) : 0.016;
          ((B = t),
            ((t) => {
              ((E += t),
                (k += 1e3 * t),
                M ? N < 1 && (N = Math.min(1, N + 1.1 * t)) : (N = 0));
              let a = N * N * (3 - 2 * N);
              for (let e of (i.clearRect(0, 0, f, p), A)) {
                if ("core" === e.type) continue;
                let t = e.hx + 2 * Math.cos(0.5 * E + e.ph) * a,
                  r = e.hy + 2 * Math.sin(0.45 * E + e.ph) * a;
                if (
                  ((e.vx += (t - e.x) * 0.02),
                  (e.vy += (r - e.y) * 0.02),
                  C.active)
                ) {
                  let t = e.x - C.x,
                    a = e.y - C.y,
                    r = t * t + a * a;
                  if (r < 12100) {
                    let l = Math.sqrt(r) || 1,
                      n = (1 - l / 110) * 3.2;
                    ((e.vx += (t / l) * n), (e.vy += (a / l) * n));
                  }
                }
                ((e.vx *= 0.86), (e.vy *= 0.86), (e.x += e.vx), (e.y += e.vy));
              }
              let r = null;
              if (C.active && d && N > 0.4) {
                let e = 48;
                for (let t of R) {
                  let a = (function (e, t, a, r, l, n) {
                    let i = l - a,
                      s = n - r,
                      o = ((e - a) * i + (t - r) * s) / (i * i + s * s || 1),
                      c = e - (a + (o = o < 0 ? 0 : o > 1 ? 1 : o) * i),
                      d = t - (r + o * s);
                    return Math.sqrt(c * c + d * d);
                  })(C.x, C.y, t.a.x, t.a.y, t.b.x, t.b.y);
                  a < e && ((e = a), (r = t.b.cat));
                }
              } else !d && N > 0.6 && (r = Math.floor(k / 1900) % e.length);
              for (let e of R) {
                let a = null != r && e.b.cat === r;
                if (
                  ((i.strokeStyle = a
                    ? "rgba(96,165,250,0.75)"
                    : `rgba(128,148,182,${0.32 * N})`),
                  (i.lineWidth = a ? 2.6 : 1.7),
                  i.beginPath(),
                  i.moveTo(e.a.x, e.a.y),
                  i.lineTo(e.b.x, e.b.y),
                  i.stroke(),
                  N > 0.5)
                ) {
                  ((e.pulse += e.speed * t), e.pulse > 1 && (e.pulse -= 1));
                  let r = e.a.x + (e.b.x - e.a.x) * e.pulse,
                    l = e.a.y + (e.b.y - e.a.y) * e.pulse;
                  ((i.fillStyle = a
                    ? "rgba(191,219,254,0.98)"
                    : "rgba(96,165,250,0.65)"),
                    i.beginPath(),
                    i.arc(r, l, a ? 3 : 2, 0, y),
                    i.fill());
                }
              }
              let l = S.r,
                n = 0.5 + 0.5 * Math.sin(1.7 * E);
              (i.beginPath(),
                i.arc(S.x, S.y, l + 9 + 8 * n, 0, y),
                (i.fillStyle = `rgba(59,130,246,${0.05 + 0.13 * n})`),
                i.fill());
              let o = (0.55 * E) % 1;
              if (
                (i.beginPath(),
                i.arc(S.x, S.y, l + 2 + 26 * o, 0, y),
                (i.strokeStyle = `rgba(59,130,246,${(1 - o) * 0.5})`),
                (i.lineWidth = 1.6),
                i.stroke(),
                i.beginPath(),
                i.arc(S.x, S.y, l, 0, y),
                (i.fillStyle = "#08080a"),
                i.fill(),
                x)
              ) {
                (i.save(),
                  i.beginPath(),
                  i.arc(S.x, S.y, l - 2, 0, y),
                  i.clip());
                let e = m.naturalWidth || 1,
                  t = m.naturalHeight || 1,
                  a = (l - 3) * 2,
                  r = Math.min(a / e, a / t),
                  n = e * r,
                  s = t * r;
                (i.drawImage(m, S.x - n / 2, S.y - s / 2, n, s), i.restore());
              }
              for (let e of (i.beginPath(),
              i.arc(S.x, S.y, l, 0, y),
              (i.strokeStyle = "rgba(59,130,246,0.75)"),
              (i.lineWidth = 1.6),
              i.stroke(),
              (i.textAlign = "center"),
              (i.textBaseline = "top"),
              A)) {
                let t, a, l;
                if ("core" === e.type) continue;
                let n = null != r && e.cat === r;
                ("hub" === e.type
                  ? ((t = "#3b82f6"),
                    (a = e.label.toUpperCase()),
                    (l = n ? "#dbeafe" : "#a1a1aa"))
                  : ((t = n ? "#ffffff" : "#d4d4d8"),
                    (a = e.label),
                    (l = n ? "#ffffff" : "#a1a1aa")),
                  n &&
                    (i.beginPath(),
                    i.arc(e.x, e.y, e.r + 7, 0, y),
                    (i.fillStyle =
                      "leaf" === e.type
                        ? "rgba(255,255,255,0.10)"
                        : "rgba(59,130,246,0.16)"),
                    i.fill()),
                  (i.globalAlpha = N),
                  i.beginPath(),
                  i.arc(e.x, e.y, e.r, 0, y),
                  (i.fillStyle = t),
                  i.fill(),
                  "leaf" !== e.type &&
                    ((i.strokeStyle = "rgba(59,130,246,0.4)"),
                    (i.lineWidth = 1),
                    i.beginPath(),
                    i.arc(e.x, e.y, e.r + 3, 0, y),
                    i.stroke()),
                  (i.font = `700 ${e.lh}px ${c}`),
                  (i.fillStyle = l),
                  i.fillText(a, e.x, e.y + e.r + 7),
                  (i.globalAlpha = 1));
              }
              r !== I && ((I = r ?? -1), s(null != r ? e[r].label : null));
            })(a),
            (b = requestAnimationFrame(q)));
        },
        U = () => {
          ((w = false), cancelAnimationFrame(b));
        },
        D = (e) => {
          let t = a.getBoundingClientRect();
          ((C.x = (e.clientX - t.left) / g),
            (C.y = (e.clientY - t.top) / g),
            (C.active = true));
        },
        W = () => {
          ((C.active = false), (C.x = C.y = -1e4));
        };
      d &&
        (a.addEventListener("pointermove", D),
        a.addEventListener("pointerleave", W));
      let O = new IntersectionObserver(
        ([e]) => {
          e.isIntersecting
            ? (M || (M = true),
              w || ((w = true), (B = 0), (b = requestAnimationFrame(q))))
            : U();
        },
        {
          threshold: 0.06,
        },
      );
      O.observe(t);
      let H = new ResizeObserver(F);
      return (
        H.observe(t),
        F(),
        () => {
          (U(),
            O.disconnect(),
            H.disconnect(),
            a.removeEventListener("pointermove", D),
            a.removeEventListener("pointerleave", W));
        }
      );
    }, [e, o, r]),
    (
      <div ref={l} aria-hidden={true} className={"relative"}>
        <div
          className={
            "pointer-events-none absolute left-0 top-0 z-10 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-zinc-600"
          }
        >
          {"move cursor near a link to trace"}
        </div>
        <div
          className={
            "pointer-events-none absolute right-0 top-0 z-10 text-right font-mono text-[0.625rem] uppercase tracking-[0.15em] text-zinc-600"
          }
        >
          {i ? (
            <span className={"text-blue-400"}>
              {"â€º "}
              {i}
            </span>
          ) : (
            <span>
              {e.length}
              {" clusters · "}
              {o}
              {" nodes"}
            </span>
          )}
        </div>
        <canvas ref={n} className={"block w-full"} />
      </div>
    )
  );
}
function N({ skills: e }) {
  return (
    <div className={"grid gap-x-12 gap-y-16 sm:grid-cols-2"}>
      {e.map((e, a) => (
        <div data-skill={true} className={"flex flex-col gap-3"} key={e.label}>
          <h3
            className={
              "font-mono text-xs uppercase tracking-[0.2em] text-zinc-500"
            }
          >
            {String(a + 1).padStart(2, "0")}
            {" — "}
            {e.label}
          </h3>
          <ScrambleText.ScrambleText
            as={"p"}
            entrance={"observer"}
            className={"text-3xl font-semibold tracking-tight sm:text-4xl"}
          >
            {e.items.join(" · ")}
          </ScrambleText.ScrambleText>
        </div>
      ))}
    </div>
  );
}
function E({ skills: e, eyebrow: r, logo: l = "/rahul-logo.png" }) {
  let [n, i] = React.useState(null),
    c = React.useMemo(() => Motion.prefersReducedMotion(), []);
  React.useEffect(() => i(Quality.detectQualityTier()), []);
  let [d, h] = React.useState(false);
  return (
    React.useEffect(() => {
      let e = window.matchMedia("(min-width: 640px)"),
        t = () => h(e.matches);
      return (
        t(),
        e.addEventListener("change", t),
        () => e.removeEventListener("change", t)
      );
    }, []),
    (
      <section
        className={"relative border-t border-white/5 px-6 py-24 sm:px-10"}
      >
        <div className={"mx-auto max-w-6xl"}>
          <ScrambleText.ScrambleText
            as={"p"}
            entrance={"observer"}
            className={
              "mb-16 font-mono text-xs uppercase tracking-[0.3em] text-blue-400"
            }
          >
            {r}
          </ScrambleText.ScrambleText>
          {null !== n && "low" !== n && !c && d ? (
            <jsxRuntime.Fragment>
              <ul className={"sr-only"}>
                {e.map((e) => (
                  <li key={e.label}>
                    {e.label}
                    {": "}
                    {e.items.join(", ")}
                  </li>
                ))}
              </ul>
              <M skills={e} logo={l} />
            </jsxRuntime.Fragment>
          ) : (
            <N skills={e} />
          )}
        </div>
      </section>
    )
  );
}
function SkillsBackground() {
  let r = React.useRef(null),
    [l, n] = React.useState(null),
    i = React.useMemo(() => Motion.prefersReducedMotion(), []),
    [o, c] = React.useState(false);
  return (
    React.useEffect(() => {
      let e = window.matchMedia("(min-width: 1024px)"),
        t = () => c(e.matches);
      return (
        t(),
        e.addEventListener("change", t),
        () => e.removeEventListener("change", t)
      );
    }, []),
    React.useEffect(() => n(Quality.detectQualityTier()), []),
    React.useEffect(() => {
      if (null === l || "low" === l || !o) return;
      let t = r.current;
      if (!t) return;
      let a = false,
        n = () => {};
      return (
        (async () => {
          let r = await import("three"),
            { EffectComposer: s } =
              await import("three/addons/postprocessing/EffectComposer.js"),
            { RenderPass: o } =
              await import("three/addons/postprocessing/RenderPass.js"),
            { UnrealBloomPass: c } =
              await import("three/addons/postprocessing/UnrealBloomPass.js");
          if (a) return;
          let h =
              "high" === l
                ? Motion.SWARM_COUNT
                : Math.round(0.6 * Motion.SWARM_COUNT),
            m = Math.min(
              window.devicePixelRatio || 1,
              Quality.QUALITY[l].maxDpr,
            ),
            x = () => ({
              w: Math.max(1, t.clientWidth),
              h: Math.max(1, t.clientHeight),
            }),
            { w: u, h: f } = x(),
            g = new r.Scene();
          g.fog = new r.FogExp2(0, 0.01);
          let b = new r.PerspectiveCamera(60, u / f, 0.1, 2e3);
          b.position.set(0, 0, 108);
          let w = new r.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          });
          (w.setPixelRatio(m),
            w.setSize(u, f),
            (w.domElement.style.width = "100%"),
            (w.domElement.style.height = "100%"),
            (w.domElement.style.display = "block"),
            t.appendChild(w.domElement));
          let y = new s(w);
          (y.setPixelRatio(m), y.setSize(u, f), y.addPass(new o(g, b)));
          let v = new c(new r.Vector2(u, f), 1.5, 0.4, 0.85);
          ((v.strength = 1.35),
            (v.radius = 0.32),
            (v.threshold = 0.05),
            y.addPass(v));
          let j = new r.Object3D(),
            M = new r.Color(),
            N = new r.Vector3(),
            E = new r.ConeGeometry(0.1, 0.5, 4).rotateX(Math.PI / 2),
            k = new r.MeshBasicMaterial({
              color: 0xffffff,
            }),
            A = new r.InstancedMesh(E, k, h);
          (A.instanceMatrix.setUsage(r.DynamicDrawUsage), g.add(A));
          let R = [];
          for (let e = 0; e < h; e++)
            (R.push(
              new r.Vector3(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
              ),
            ),
              A.setColorAt(e, M.setHex(65416)));
          let S = new r.Clock(),
            C = !i,
            z = (e) => {
              let t = e ? 0 : S.getElapsedTime();
              for (let a = 0; a < h; a++) {
                let r = Math.max(1, Math.floor(h / 32)),
                  l = Math.floor(a / r) % 32,
                  n = ((a % r) / r) * 2 - 1,
                  i = l % 4,
                  s = Math.floor(l / 4),
                  o = 1 & s ? 1 : -1,
                  c = 2 & s ? 1 : -1,
                  d = 4 & s ? 1 : -1,
                  m = 0,
                  x = 0,
                  u = 0,
                  f = 0;
                0 === i
                  ? ((m = n), (x = o), (u = c), (f = d))
                  : 1 === i
                    ? ((m = o), (x = n), (u = c), (f = d))
                    : 2 === i
                      ? ((m = o), (x = c), (u = n), (f = d))
                      : ((m = o), (x = c), (u = d), (f = n));
                let p = 1 + 0.3 * Math.sin(1.2 * t + 1e-4 * a);
                ((m *= p), (x *= p), (u *= p));
                let g = 0.8 * t,
                  b = Math.cos(g),
                  w = Math.sin(g),
                  y = m * b - (f *= p) * w,
                  v = m * w + f * b,
                  E = 0.8 * t * 0.618,
                  k = Math.cos(E),
                  S = Math.sin(E),
                  C = x * k - u * S,
                  z = 0.8 * t * 0.382,
                  T = Math.cos(z),
                  L = Math.sin(z),
                  P = 0.18 * t,
                  $ = y * T - C * L + 0.16 * Math.sin(1.3 * a + P),
                  F = y * L + C * T + 0.16 * Math.cos(1.7 * a - P),
                  I = x * S + u * k + 0.16 * Math.sin(2.1 * a + P),
                  B = 1 / (4 - v + 1e-4);
                N.set($ * B * 54, F * B * 54, I * B * 54);
                let q = 0.58 + 0.05 * v,
                  U = Math.min(Math.max(0.55 + 0.55 * B, 0.4), 1);
                (M.setHSL(Math.abs(q % 1), 0.18, U),
                  e ? R[a].copy(N) : R[a].lerp(N, 0.1),
                  j.position.copy(R[a]),
                  j.updateMatrix(),
                  A.setMatrixAt(a, j.matrix),
                  A.setColorAt(a, M));
              }
              ((A.instanceMatrix.needsUpdate = true),
                A.instanceColor && (A.instanceColor.needsUpdate = true),
                y.render());
            },
            T = new ResizeObserver(() => {
              let e = x();
              ((u = e.w),
                (f = e.h),
                (b.aspect = u / f),
                b.updateProjectionMatrix(),
                w.setSize(u, f),
                y.setSize(u, f),
                C || z(true));
            });
          T.observe(t);
          let L = 0,
            P = false,
            $ = null;
          if (C) {
            let e = () => {
                (z(false), (L = requestAnimationFrame(e)));
              },
              a = () => {
                P || ((P = true), (L = requestAnimationFrame(e)));
              };
            (($ = new IntersectionObserver(
              ([e]) =>
                e.isIntersecting
                  ? a()
                  : void ((P = false), cancelAnimationFrame(L)),
              {
                threshold: 0,
              },
            )).observe(t),
              a());
          } else z(true);
          n = () => {
            (cancelAnimationFrame(L),
              $?.disconnect(),
              T.disconnect(),
              E.dispose(),
              k.dispose(),
              v.dispose(),
              y.dispose(),
              w.forceContextLoss(),
              w.dispose(),
              w.domElement.parentNode === t && t.removeChild(w.domElement));
          };
        })(),
        () => {
          ((a = true), n());
        }
      );
    }, [l, i, o]),
    (<div ref={r} aria-hidden={true} className={"h-full w-full"} />)
  );
}
let A = (e) => (e < 0 ? 0 : e > 255 ? 255 : e);
function R({ src: e }) {
  let r = React.useRef(null),
    n = React.useRef(null),
    [i, o] = React.useState(false);
  return (
    React.useEffect(() => {
      let t = n.current;
      if (!t) return;
      let a = false,
        i = null,
        c = null,
        d = null,
        h = false,
        m = "",
        x = null,
        u = null,
        f = Motion.prefersReducedMotion(),
        p = () => {
          let e = window.devicePixelRatio || 1;
          ((t.width = Math.max(1, Math.round((t.clientWidth || 1) * e))),
            (t.height = Math.max(1, Math.round((t.clientHeight || 1) * e))));
        },
        g = () => {
          if (!i || a) return;
          let e = window.devicePixelRatio || 1,
            r = `${t.clientWidth}x${t.clientHeight}@${e}`;
          if (r !== m) {
            var l;
            let e, a, n, s;
            ((m = r),
              (l = i),
              (e = window.devicePixelRatio || 1),
              (a = t.clientWidth || l.width),
              (n = t.clientHeight || l.height),
              (t.width = Math.max(1, Math.round(a * e))),
              (t.height = Math.max(1, Math.round(n * e))),
              (s = t.getContext("2d")) &&
                (s.clearRect(0, 0, t.width, t.height),
                (s.imageSmoothingEnabled = true),
                (s.imageSmoothingQuality = "high"),
                s.drawImage(l, 0, 0, t.width, t.height)));
          }
        },
        b = (e) => {
          if (!d || !c) return;
          !(function (e, t, a) {
            let r = e.getContext("2d");
            if (!r) return;
            (r.clearRect(0, 0, e.width, e.height), (r.fillStyle = "#ffffff"));
            let l = 2 * Math.PI;
            for (let e = 0; e < t.n; e++) {
              let n = t.delay[e],
                i =
                  1 -
                  (n >= 1 ? 0 : Math.min(1, Math.max(0, (a - n) / (1 - n)))),
                s = 1 - i * i * i,
                o = (t.sx[e] + (t.tx[e] - t.sx[e]) * s) * 4,
                c = (t.sy[e] + (t.ty[e] - t.sy[e]) * s) * 4,
                d = 8 * t.g[e] * (0.45 + 0.55 * s);
              d <= 0.02 ||
                ((r.globalAlpha = 0.12 + 0.88 * s),
                r.beginPath(),
                r.arc(o, c, d, 0, l),
                r.fill());
            }
            r.globalAlpha = 1;
          })(c, d, e);
          let a = t.getContext("2d");
          a &&
            (a.clearRect(0, 0, t.width, t.height),
            (a.imageSmoothingEnabled = true),
            (a.imageSmoothingQuality = "high"),
            a.drawImage(c, 0, 0, t.width, t.height));
        },
        w = () => {
          ((h = true),
            (m = ""),
            g(),
            !a && r.current && (u = Motion.floatLoop(r.current, 10)));
        },
        y = new window.Image();
      ((y.onload = () => {
        if (!a)
          try {
            let e = (function (e) {
              let t = e.naturalWidth,
                a = e.naturalHeight;
              if (!t || !a) throw Error("empty source image");
              let r = document.createElement("canvas");
              ((r.width = t), (r.height = a));
              let l = r.getContext("2d", {
                willReadFrequently: true,
              });
              if (!l) throw Error("no 2d context");
              l.drawImage(e, 0, 0);
              let n = l.getImageData(0, 0, t, a).data,
                i = t * a,
                s = new Float32Array(i),
                o = new Uint8ClampedArray(i);
              for (let e = 0; e < i; e++) {
                let t = n[4 * e],
                  a = n[4 * e + 1],
                  r = n[4 * e + 2];
                o[e] = n[4 * e + 3];
                let l = 0.299 * t + 0.587 * a + 0.114 * r;
                s[e] = A((l - 128) * 1.4 + 128);
              }
              let c = document.createElement("canvas");
              ((c.width = t), (c.height = a));
              let d = c.getContext("2d", {
                willReadFrequently: true,
              });
              if (!d) throw Error("no 2d context");
              let h = d.createImageData(t, a);
              for (let e = 0; e < i; e++) {
                let t = s[e];
                ((h.data[4 * e] = t),
                  (h.data[4 * e + 1] = t),
                  (h.data[4 * e + 2] = t),
                  (h.data[4 * e + 3] = 255));
              }
              d.putImageData(h, 0, 0);
              let m = document.createElement("canvas");
              ((m.width = t), (m.height = a));
              let x = m.getContext("2d", {
                willReadFrequently: true,
              });
              if (!x) throw Error("no 2d context");
              ((x.filter = "blur(2px)"), x.drawImage(c, 0, 0));
              let u = x.getImageData(0, 0, t, a).data,
                f = new Float32Array(i);
              for (let e = 0; e < i; e++) {
                let t = s[e] - u[4 * e];
                f[e] = A(Math.abs(t) > 2 ? s[e] + 1.8 * t : s[e]);
              }
              let p = Math.ceil(t / 4),
                g = Math.ceil(a / 4),
                b = new Float32Array(p * g),
                w = new Float32Array(p * g),
                y = new Uint32Array(p * g);
              for (let e = 0; e < a; e++) {
                let a = (e / 4) | 0;
                for (let r = 0; r < t; r++) {
                  let l = a * p + ((r / 4) | 0),
                    n = e * t + r;
                  ((b[l] += f[n]), (w[l] += o[n]), y[l]++);
                }
              }
              let v = new Float32Array(p * g),
                j = new Float32Array(p * g);
              for (let e = 0; e < p * g; e++) {
                let t = y[e];
                t && ((v[e] = b[e] / t / 255), (j[e] = w[e] / t));
              }
              return {
                srcW: t,
                srcH: a,
                cols: p,
                rows: g,
                lum: v,
                alpha: j,
              };
            })(y);
            if (
              ((i = (function (e) {
                let {
                    srcW: t,
                    srcH: a,
                    cols: r,
                    rows: l,
                    lum: n,
                    alpha: i,
                  } = e,
                  s = document.createElement("canvas");
                ((s.width = 4 * t), (s.height = 4 * a));
                let o = s.getContext("2d");
                if (!o) return s;
                o.fillStyle = "#ffffff";
                let c = 2 * Math.PI;
                for (let e = 0; e < l; e++)
                  for (let t = 0; t < r; t++) {
                    let a = e * r + t;
                    if (i[a] < 140) continue;
                    let l = 8 * Math.pow(n[a], 1.3);
                    if (l < 0.5) continue;
                    let s = (4 * t + 2) * 4,
                      d = (4 * e + 2) * 4;
                    (o.beginPath(), o.arc(s, d, l, 0, c), o.fill());
                  }
                return s;
              })(e)),
              f)
            )
              return void w();
            ((d = (function (e) {
              let { srcW: t, srcH: a, cols: r, rows: l, lum: n, alpha: i } = e,
                s = [],
                o = [],
                c = [],
                d = [],
                h = [],
                m = [];
              for (let e = 0; e < l; e++)
                for (let l = 0; l < r; l++) {
                  let x = e * r + l;
                  if (i[x] < 140) continue;
                  let u = Math.pow(n[x], 1.3);
                  8 * u < 0.5 ||
                    (s.push(4 * l + 2),
                    o.push(4 * e + 2),
                    c.push(u),
                    d.push((1.3 * Math.random() - 0.15) * t),
                    h.push((1.3 * Math.random() - 0.15) * a),
                    m.push(0.45 * Math.random()));
                }
              return {
                n: s.length,
                srcW: t,
                srcH: a,
                tx: new Float32Array(s),
                ty: new Float32Array(o),
                g: new Float32Array(c),
                sx: new Float32Array(d),
                sy: new Float32Array(h),
                delay: new Float32Array(m),
              };
            })(e)),
              ((c = document.createElement("canvas")).width = i.width),
              (c.height = i.height),
              p());
            let t = {
              t: 0,
            };
            (b(0),
              (x = Animation.gsap.to(t, {
                t: 1,
                duration: 1.8,
                ease: "none",
                onUpdate: () => b(t.t),
                onComplete: w,
              })));
          } catch {
            o(true);
          }
      }),
        (y.onerror = () => {
          a || o(true);
        }),
        (y.src = e));
      let v = new ResizeObserver(() => {
        h ? g() : f || p();
      });
      return (
        v.observe(t),
        () => {
          ((a = true), x?.kill(), u?.kill(), v.disconnect());
        }
      );
    }, [e]),
    (
      <div
        ref={r}
        data-hero-portrait={true}
        aria-hidden={true}
        className={
          "relative aspect-[471/530] h-[clamp(22rem,88vmin,52rem)] will-change-transform"
        }
      >
        {i ? (
          <div
            className={
              "flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black ring-1 ring-white/15"
            }
          >
            <span className={"font-mono text-6xl font-semibold text-white/10"}>
              {"AH"}
            </span>
            <span className={"h-px w-12 bg-blue-500"} />
            <span
              className={
                "font-mono text-[0.625rem] uppercase tracking-[0.25em] text-zinc-600"
              }
            >
              {"Portrait — placeholder"}
            </span>
          </div>
        ) : (
          <canvas
            ref={n}
            className={"block h-full w-full"}
            style={{
              maskImage:
                "linear-gradient(to bottom, #000 58%, transparent 82%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 58%, transparent 82%)",
            }}
          />
        )}
      </div>
    )
  );
}
function S({ location: e, availability: r, timeZone: l }) {
  let [n, i] = React.useState(null);
  return (
    React.useEffect(() => {
      let e = new Intl.DateTimeFormat("en-GB", {
          timeZone: l,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
        t = () => i(e.format(new Date()));
      t();
      let a = setInterval(t, 1e3);
      return () => clearInterval(a);
    }, [l]),
    (
      <div
        className={
          "flex flex-col items-end gap-2 text-right font-mono uppercase"
        }
      >
        <span
          className={"text-xs tabular-nums tracking-[0.25em] text-zinc-300"}
        >
          {n ?? "--:--:--"}
        </span>
        <ScrambleText.ScrambleText
          as={"span"}
          entrance={"observer"}
          className={"text-[0.625rem] tracking-[0.25em] text-zinc-500"}
        >
          {e}
        </ScrambleText.ScrambleText>
        <span
          className={
            "mt-1 flex items-center gap-2 text-[0.625rem] tracking-[0.25em] text-zinc-400"
          }
        >
          <span className={"relative flex h-1.5 w-1.5"}>
            <span
              className={
                "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden"
              }
            />
            <span
              className={
                "relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"
              }
            />
          </span>
          <ScrambleText.ScrambleText as={"span"} entrance={"observer"}>
            {r}
          </ScrambleText.ScrambleText>
        </span>
      </div>
    )
  );
}
let T = [
    {
      degree: "BSc in Computer Science & Engineering",
      institution: "Leading University",
      period: "",
      detail: "",
    },
  ],
  L = Dynamic.default(
    () => import("@/components/three/hero-head").then((e) => e.HeroHead),
    {
      ssr: false,
    },
  ),
  P = React.useLayoutEffect;
export const AboutView = function ({
  about: e,
  hero: r,
  career: c,
  footer: h,
  logo: m,
}) {
  let x = React.useRef(null),
    u = React.useRef(null),
    p = React.useRef(null),
    b = React.useRef(null),
    y = SmoothScrollProvider.useSmoothScroll(),
    v = React.useRef(y);
  v.current = y;
  let [j, M] = h.email.split("@");
  return (
    Animation.useGSAP(
      () => {
        (Motion.scrollReveal(
          "[data-skill]",
          {
            y: 24,
          },
          "top 88%",
        ),
          Motion.scrollReveal(
            "[data-contact]",
            {
              y: 24,
            },
            "top 88%",
          ),
          Motion.floatLoop("[data-float]"));
        let e = x.current?.querySelector("[data-marquee]");
        (e && Motion.marqueeLoop(e),
          Animation.gsap.matchMedia().add("(min-width: 1024px)", () => {
            let e = u.current,
              t = p.current,
              a = b.current;
            if (!e || !t || !a) return;
            let r = Animation.gsap.utils.toArray("[data-panel]", a),
              i = Motion.aboutCurtainRise({
                pinEl: e,
                curtain: a,
                panels: r,
                dimmer: t,
              }),
              o = () => {
                (Animation.ScrollTrigger.refresh(), v.current?.resize());
              },
              c = Animation.gsap.delayedCall(0.3, o),
              d = Animation.gsap.delayedCall(1.2, o);
            return (
              window.addEventListener("load", o),
              () => {
                (i?.kill(),
                  c.kill(),
                  d.kill(),
                  window.removeEventListener("load", o));
              }
            );
          }));
      },
      {
        scope: x,
      },
    ),
    P(() => {
      if (window.location.hash.length < 2) return;
      let e = false,
        t = () => {
          e = true;
        },
        a = (t) => {
          if (t && e) return;
          let a = document.querySelector(window.location.hash);
          if (!a) return;
          v.current?.resize();
          let r = Math.max(
            0,
            a.getBoundingClientRect().top + window.scrollY - 96,
          );
          v.current
            ? v.current.scrollTo(r, {
                immediate: true,
              })
            : window.scrollTo(0, r);
        };
      a(false);
      let r = window.setTimeout(() => a(true), 500);
      return (
        window.addEventListener("wheel", t, {
          passive: true,
          once: true,
        }),
        window.addEventListener("touchmove", t, {
          passive: true,
          once: true,
        }),
        window.addEventListener("keydown", t, {
          once: true,
        }),
        () => {
          (window.clearTimeout(r),
            window.removeEventListener("wheel", t),
            window.removeEventListener("touchmove", t),
            window.removeEventListener("keydown", t));
        }
      );
    }, []),
    (
      <main ref={x} className={"bg-black text-white"}>
        <section ref={u} className={"relative min-h-screen overflow-hidden"}>
          <div
            className={"relative h-screen overflow-hidden px-6 pt-28 sm:px-10"}
          >
            <div
              className={
                "pointer-events-none absolute inset-0 z-0 flex translate-x-[1.5vw] items-center justify-center"
              }
            >
              <R src={r.portraitImage} />
            </div>
            <div
              className={
                "pointer-events-none absolute bottom-24 left-6 text-left sm:bottom-28 sm:left-10"
              }
            >
              <ScrambleText.ScrambleText
                as={"p"}
                entrance={"observer"}
                className={
                  "font-mono text-xs uppercase tracking-[0.3em] text-blue-400"
                }
              >
                {r.eyebrow}
              </ScrambleText.ScrambleText>
              <h1
                className={
                  "mt-3 font-[family-name:var(--font-relidux)] text-5xl uppercase leading-[0.95] tracking-[0.03em] sm:text-7xl"
                }
              >
                {r.name.split(/\s+/).map((e, a) => (
                  <ScrambleText.ScrambleText
                    as={"span"}
                    entrance={"observer"}
                    className={"block"}
                    key={a}
                  >
                    {e}
                  </ScrambleText.ScrambleText>
                ))}
              </h1>
            </div>
            <div
              className={
                "pointer-events-none absolute right-6 top-[calc(env(safe-area-inset-top)+6.5rem)] z-10 sm:right-10 sm:top-1/2 sm:-translate-y-1/2"
              }
            >
              <S
                location={e.heroStatus.location}
                availability={e.heroStatus.availability}
                timeZone={e.heroStatus.timeZone}
              />
            </div>
            <div
              className={
                "pointer-events-none absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-blue-400"
              }
            >
              <span
                className={
                  "font-mono text-[0.625rem] uppercase tracking-[0.3em] text-zinc-500"
                }
              >
                {e.heroStatus.scrollCue}
              </span>
              <span className={"relative block h-12 w-px overflow-hidden"}>
                <span className={"absolute inset-0 bg-current opacity-20"} />
                <span
                  className={
                    "scroll-cue-line absolute left-0 top-0 h-1/2 w-full bg-current"
                  }
                />
              </span>
            </div>
            <div className={"absolute bottom-10 right-6 sm:right-10"}>
              <LiveStatus.CodingSince year={r.hud.codingSinceYear} />
            </div>
          </div>
          <div
            ref={p}
            aria-hidden={true}
            className={
              "pointer-events-none absolute inset-x-0 top-0 z-30 hidden h-screen bg-black lg:block"
            }
            style={{
              opacity: 0,
            }}
          />
          <div
            ref={b}
            className={
              "relative z-40 bg-black will-change-transform lg:absolute lg:inset-x-0 lg:top-0 lg:h-screen lg:[transform:translateY(142vh)]"
            }
          >
            <div
              aria-hidden={true}
              className={
                "pointer-events-none absolute inset-x-0 bottom-full hidden items-end lg:flex"
              }
              style={{
                height: `${100 * Motion.ABOUT_PANEL.bandVh}vh`,
              }}
            >
              {Motion.ABOUT_PANEL.widths.map((e, a) => {
                let r = 100 * Motion.ABOUT_PANEL.litTo,
                  l = `linear-gradient(to bottom, #52525b 0%, #18181b ${0.5 * r}%, #000 ${r}%, #000 100%)`;
                return (
                  <div
                    data-panel={true}
                    className={
                      "border-t-2 border-t-white/25 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-l-white/[0.06]"
                    }
                    style={{
                      width: `${100 * e}%`,
                      height: `${(Motion.ABOUT_PANEL.heights[a] ?? 1) * 100}%`,
                      backgroundImage: l,
                    }}
                    key={a}
                  />
                );
              })}
            </div>
            <div
              className={
                "mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:px-10 lg:h-full lg:grid-cols-2 lg:py-0"
              }
            >
              <div data-desc={true} className={"flex flex-col gap-8"}>
                <h2
                  className={
                    "font-[family-name:var(--font-relidux)] text-4xl uppercase leading-[1.02] tracking-[0.03em] sm:text-6xl"
                  }
                >
                  {e.descriptionHeading.map((e, r) => (
                    <React.Fragment key={r}>
                      {r > 0 && <br />}
                      {e.segments.map((e, r) =>
                        e.accent ? (
                          <span className={"text-blue-500"} key={r}>
                            {e.text}
                          </span>
                        ) : (
                          <React.Fragment key={r}>{e.text}</React.Fragment>
                        ),
                      )}
                    </React.Fragment>
                  ))}
                </h2>
                <div
                  className={
                    "max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base"
                  }
                >
                  <p>{e.bio}</p>
                </div>
              </div>
              <div className={"relative order-first lg:order-last"}>
                <div
                  aria-hidden={true}
                  className={
                    "relative mx-auto aspect-square w-[clamp(16rem,40vw,30rem)]"
                  }
                >
                  <div
                    data-float={true}
                    className={
                      "pointer-events-none absolute -left-6 top-10 h-3 w-3 rotate-45 border border-zinc-700"
                    }
                  />
                  <L shape={"robot"} spin={0.3} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <EducationSection
          entries={e.education?.length ? e.education : T}
          eyebrow={e.educationEyebrow || "— Education"}
          heading={e.educationHeading ?? "Where it started"}
        />
        <CareerTimeline entries={c.items} eyebrow={c.eyebrow} />
        <E skills={e.skills} eyebrow={e.skillsEyebrow} logo={m} />
        <section
          id={"contact"}
          className={
            "relative flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden border-t border-white/5 px-6 py-24 sm:px-10"
          }
        >
          <div
            className={"pointer-events-none absolute inset-0 z-0 opacity-70"}
          >
            <SkillsBackground />
          </div>
          <div className={"relative z-10 mx-auto w-full max-w-6xl"}>
            <div
              className={
                "flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-blue-400"
              }
            >
              <span>{h.eyebrow}</span>
              <span className={"hidden sm:inline"}>{h.note}</span>
            </div>
            <a
              href={`mailto:${h.email}`}
              className={
                "mt-14 block max-w-full cursor-pointer break-words [overflow-wrap:anywhere] text-[clamp(1.5rem,6.5vw,4.75rem)] font-semibold leading-tight tracking-tight text-white transition-colors sm:w-fit sm:leading-none hover:text-zinc-300"
              }
            >
              {j}
              <span className={"text-blue-500"}>{"@"}</span>
              {M}
            </a>
            <div
              className={"mt-14 overflow-hidden border-y border-white/5 py-3"}
            >
              <div
                data-marquee={true}
                className={
                  "flex w-max whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-zinc-500"
                }
              >
                {[...h.tags, ...h.tags].map((e, a) => (
                  <span className={"flex items-center"} key={a}>
                    <span className={"mx-6 text-blue-500"}>{"•"}</span>
                    {e}
                  </span>
                ))}
              </div>
            </div>
            <div
              className={"mt-16 grid grid-cols-3 gap-3 sm:grid-cols-3 sm:gap-3"}
            >
              {h.socialLinks.map((e) => (
                <a
                  href={Links.externalHref(e.href)}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  aria-label={e.label}
                  className={
                    "group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-white/15 bg-transparent px-4 py-7 transition-[scale,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-blue-500 motion-safe:hover:scale-[1.06]"
                  }
                  key={e.label}
                >
                  <span
                    aria-hidden={true}
                    className={
                      "pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                    }
                  />
                  <svg
                    viewBox={"0 0 24 24"}
                    aria-hidden={true}
                    fill={"currentColor"}
                    className={
                      "relative h-7 w-7 text-zinc-300 transition-colors duration-500 group-hover:text-white"
                    }
                  >
                    <path d={e.icon} />
                  </svg>
                  <span
                    className={
                      "relative font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors duration-500 group-hover:text-white"
                    }
                  >
                    {e.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  );
};

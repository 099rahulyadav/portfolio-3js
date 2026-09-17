"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as Dynamic from "next/dynamic";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
import * as Image from "next/image";
import * as ScrambleText from "@/components/ui/scramble-text";
function CertificateCard({ achievement: e, focused: n = false }) {
  let [l, a] = React.useState(4 / 3);
  return (
    <div
      style={{
        aspectRatio: e.image ? l : 4 / 3,
      }}
      className={`relative w-full rounded-xl bg-zinc-950 ring-1 transition duration-300 ease-out will-change-transform ${n ? "z-10 scale-[1.12] ring-white/50" : "scale-100 ring-white/10"}`}
    >
      {e.image ? (
        <Image.default
          src={e.image}
          alt={`${e.title} certificate`}
          fill={true}
          sizes={"(min-width: 1024px) 20rem, 45vw"}
          className={"rounded-xl object-cover"}
          onLoad={(e) => {
            let t = e.currentTarget;
            t.naturalWidth &&
              t.naturalHeight &&
              a(t.naturalWidth / t.naturalHeight);
          }}
        />
      ) : (
        <div
          className={
            "flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black"
          }
        >
          <span
            className={
              "font-mono text-5xl font-semibold tracking-tight text-white/10"
            }
          >
            {e.id}
          </span>
          <span aria-hidden={true} className={"h-px w-10 bg-blue-500"} />
        </div>
      )}
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col gap-0.5 rounded-b-xl bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pb-3 pt-8 text-left transition-all duration-300 ${n ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
      >
        <ScrambleText.ScrambleText
          as={"p"}
          entrance={"observer"}
          className={"text-sm font-medium text-white"}
        >
          {e.title}
        </ScrambleText.ScrambleText>
        <p
          className={
            "font-mono text-[0.625rem] uppercase tracking-[0.2em] text-zinc-400"
          }
        >
          {e.issuer}
        </p>
      </div>
    </div>
  );
}
function u(e, t, r, n) {
  let l = window.innerWidth >= 1024 ? 228 * !!t + 148 * !!r : 0,
    a = Math.min(0.92 * window.innerWidth - l, 704),
    s = 16 + n,
    i = window.innerHeight,
    c = Math.min(
      0.82 * i,
      window.innerWidth >= 1024 ? i - 48 - 2 * s : i - 48 - s,
    ),
    o = a,
    d = a / e;
  return (
    d > c && ((d = c), (o = c * e)),
    {
      w: Math.round(o),
      h: Math.round(d),
    }
  );
}
function CertificateModal({ achievement: e, onClose: n }) {
  let l = React.useRef(null),
    a = React.useRef(null),
    i = React.useRef(null),
    o = React.useRef(null),
    d = React.useRef(null),
    h = (e.links ?? []).filter((e) => e.href.trim()),
    x = (e.extraImages ?? []).filter((e) => e.trim()),
    f = h.length,
    p = x.length,
    [g, b] = React.useState(null),
    v = null === g ? e.image : x[g],
    [j, w] = React.useState(null),
    y = React.useRef(4 / 3);
  React.useEffect(() => {
    let e = () => w(u(y.current, f, p, d.current?.offsetHeight ?? 0));
    return (
      window.addEventListener("resize", e),
      () => window.removeEventListener("resize", e)
    );
  }, [f, p]);
  let N = React.useCallback(() => Motion.achievementModalOut(a.current, i.current, n), [n]);
  return (
    React.useEffect(() => {
      let e = l.current.querySelectorAll("[data-block]"),
        t = Motion.achievementModalIn(a.current, i.current, e),
        r = Motion.achievementCardTilt(o.current, o.current);
      return () => {
        (t.kill(), r());
      };
    }, []),
    React.useEffect(() => {
      let e = (e) => {
        "Escape" === e.key && N();
      };
      window.addEventListener("keydown", e);
      let t = document.body.style.overflow;
      return (
        (document.body.style.overflow = "hidden"),
        () => {
          (window.removeEventListener("keydown", e),
            (document.body.style.overflow = t));
        }
      );
    }, [N]),
    (
      <div
        ref={l}
        role={"dialog"}
        aria-modal={"true"}
        aria-label={`${e.title} certificate`}
        className={"fixed inset-0 z-[60] flex items-center justify-center p-6"}
      >
        <div
          ref={a}
          onClick={N}
          className={"absolute inset-0 bg-black/35 backdrop-blur-xl"}
        />
        <div
          ref={i}
          onClick={(e) => e.stopPropagation()}
          className={
            "relative z-10 flex w-fit max-w-[96vw] flex-col items-center gap-5 will-change-transform lg:flex-row lg:items-center"
          }
        >
          {h.length > 0 && (
            <nav
              className={
                "order-2 flex w-full shrink-0 flex-col gap-2.5 lg:order-none lg:w-52"
              }
            >
              {h.map((e) => (
                <a
                  href={e.href}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={
                    "group flex items-center justify-between gap-3 rounded-lg border border-white/25 bg-white/[0.08] px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:border-blue-400/70 hover:bg-blue-500/15"
                  }
                  key={`${e.label}-${e.href}`}
                >
                  <span className={"truncate"}>{e.label || e.href}</span>
                  <span
                    aria-hidden={true}
                    className={
                      "shrink-0 text-blue-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    }
                  >
                    {"↗"}
                  </span>
                </a>
              ))}
            </nav>
          )}
          <div
            className={"flex w-fit flex-col lg:relative [perspective:1200px]"}
          >
            <div
              ref={o}
              style={
                j
                  ? {
                      width: j.w,
                      height: j.h,
                    }
                  : {
                      width: "min(92vw, 44rem)",
                      aspectRatio: "4 / 3",
                    }
              }
              className={
                "relative overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-white/15 will-change-transform"
              }
            >
              {v ? (
                <Image.default
                  src={v}
                  alt={
                    null === g
                      ? `${e.title} certificate`
                      : `${e.title} — photo ${g + 1}`
                  }
                  fill={true}
                  sizes={"(min-width: 768px) 44rem, 92vw"}
                  className={"object-cover"}
                  priority={true}
                  onLoad={(e) => {
                    let t = e.currentTarget;
                    t.naturalWidth &&
                      t.naturalHeight &&
                      ((y.current = t.naturalWidth / t.naturalHeight),
                      w(u(y.current, f, p, d.current?.offsetHeight ?? 0)));
                  }}
                  key={v}
                />
              ) : (
                <div
                  className={
                    "flex h-full w-full flex-col items-center justify-center gap-4"
                  }
                >
                  <span
                    className={
                      "font-mono text-8xl font-semibold tracking-tight text-white/10"
                    }
                  >
                    {e.id}
                  </span>
                  <span
                    aria-hidden={true}
                    className={"h-px w-16 bg-blue-500"}
                  />
                  <span
                    className={
                      "font-mono text-[0.625rem] uppercase tracking-[0.25em] text-zinc-600"
                    }
                  >
                    {"Certificate image coming soon"}
                  </span>
                </div>
              )}
              <div
                aria-hidden={true}
                className={"pointer-events-none absolute inset-0 grid gap-px"}
                style={{
                  gridTemplateColumns: "repeat(48, minmax(0, 1fr))",
                  gridTemplateRows: "repeat(36, minmax(0, 1fr))",
                }}
              >
                {Array.from({
                  length: 1728,
                }).map((e, r) => (
                  <div data-block={true} className={"bg-black"} key={r} />
                ))}
              </div>
            </div>
            <div
              ref={d}
              className={
                "mt-4 flex items-start justify-between gap-6 lg:absolute lg:inset-x-0 lg:top-full"
              }
            >
              <div>
                <p
                  className={
                    "font-mono text-[0.625rem] uppercase tracking-[0.25em] text-blue-400"
                  }
                >
                  {"/ "}
                  {e.category}
                </p>
                <h2
                  className={
                    "mt-1 text-xl font-semibold tracking-tight text-white"
                  }
                >
                  {e.title}
                </h2>
                <p
                  className={
                    "mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-zinc-400"
                  }
                >
                  {e.issuer}
                </p>
              </div>
              <button
                type={"button"}
                onClick={N}
                aria-label={"Close"}
                className={
                  "shrink-0 rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
                }
              >
                {"Esc ✕"}
              </button>
            </div>
          </div>
          {x.length > 0 && (
            <div
              className={
                "order-3 flex w-full shrink-0 flex-col gap-2 lg:order-none lg:mt-1 lg:w-32"
              }
            >
              <p
                className={
                  "font-mono text-[0.625rem] uppercase tracking-[0.25em] text-zinc-500"
                }
              >
                {"More"}
              </p>
              <div
                className={
                  "flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible"
                }
              >
                {x.map((e, r) => {
                  let n = r === g;
                  return (
                    <button
                      type={"button"}
                      onClick={() => b(n ? null : r)}
                      aria-label={
                        n ? "Back to the certificate" : `Show photo ${r + 1}`
                      }
                      aria-current={n}
                      className={`group relative block aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-950 ring-1 transition-[transform,box-shadow] duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.85)] lg:w-full ${n ? "z-10 -translate-y-1 ring-2 ring-blue-400" : "ring-white/15 hover:ring-white/45"}`}
                      style={{
                        marginTop: 0 === r ? void 0 : "-1.25rem",
                      }}
                      key={e}
                    >
                      <Image.default
                        src={e}
                        alt={""}
                        fill={true}
                        sizes={"7rem"}
                        className={`object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-105 ${n ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
let SpaceTimeBackground = Dynamic.default(
    () =>
      import("@/components/three/space-time-fabric").then(
        (e) => e.SpaceTimeFabric,
      ),
    {
      ssr: false,
    },
  ),
  x = "18.75rem";
export const AchievementsView = function ({ content: e }) {
  var n;
  let c = React.useRef(null),
    u = React.useRef(null),
    f = React.useRef(null),
    p =
      ((n = e.items),
      e.categoryOrder
        .map((e) => ({
          category: e,
          items: n.filter((t) => t.category === e),
        }))
        .filter((e) => e.items.length > 0)),
    [g, b] = React.useState(0),
    [v, j] = React.useState(0),
    [w, y] = React.useState(null),
    N = React.useRef(null),
    [k, z] = React.useState(null),
    S = React.useRef(null);
  React.useEffect(() => {
    let e = setInterval(() => b((e) => e + 1), 1e3);
    return () => clearInterval(e);
  }, []);
  let P = (e) => {
    (null !== e && e !== N.current && j((e) => e + 1), (N.current = e), y(e));
  };
  Animation.useGSAP(
    () => {
      let e = Animation.gsap.matchMedia();
      return (
        e.add("(min-width: 1024px)", () => {
          let e = Animation.gsap.utils.toArray("[data-cell]", f.current);
          (Animation.gsap.set(f.current, {
            xPercent: -50,
            yPercent: -50,
          }),
            Motion.achievementsGridIntro(e));
          let t = Motion.achievementsIdleWarp(e),
            r =
              u.current && f.current
                ? Motion.achievementsPanWarp(u.current, f.current, () => {
                    let e = f.current;
                    return e
                      ? {
                          maxX: Math.max(
                            0,
                            (e.offsetWidth - window.innerWidth) / 2 +
                              Motion.ACHIEVE.edgePad,
                          ),
                          maxY: Math.max(
                            0,
                            (e.offsetHeight - window.innerHeight) / 2 +
                              Motion.ACHIEVE.edgePad,
                          ),
                        }
                      : {
                          maxX: 0,
                          maxY: 0,
                        };
                  })
                : () => {};
          return () => {
            (t.kill(), r());
          };
        }),
        e.add("(max-width: 1023px)", () => {
          Animation.gsap.utils
            .toArray("[data-mobile-card]", c.current)
            .forEach((e) =>
              Motion.scrollReveal(
                e,
                {
                  y: 24,
                },
                "top 90%",
              ),
            );
        }),
        () => e.revert()
      );
    },
    {
      scope: c,
    },
  );
  let R = `${String(Math.floor(g / 60)).padStart(2, "0")}:${String(g % 60).padStart(2, "0")}`,
    _ = String(e.items.length).padStart(3, "0"),
    C = String(v).padStart(3, "0");
  return (
    <main
      ref={c}
      className={
        "relative min-h-screen bg-black text-white lg:h-screen lg:overflow-hidden"
      }
    >
      <div
        className={
          "pointer-events-none absolute inset-0 z-0 hidden opacity-55 lg:block"
        }
      >
        <SpaceTimeBackground />
      </div>
      <div
        ref={u}
        className={
          "absolute inset-0 z-10 hidden cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing lg:block"
        }
      >
        <div
          ref={f}
          className={"absolute left-1/2 top-1/2 will-change-transform"}
        >
          <div className={"flex flex-col gap-20 pt-16"}>
            {p.map(({ category: e, items: r }) => (
              <section className={"flex flex-col gap-5"} key={e}>
                <p
                  className={
                    "font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-zinc-500"
                  }
                >
                  <span className={"text-zinc-300"}>
                    {"/ "}
                    {e}
                  </span>
                  <span className={"ml-3 text-zinc-600"}>
                    {String(r.length).padStart(2, "0")}
                  </span>
                </p>
                <div
                  className={"grid items-start gap-x-24 gap-y-24"}
                  style={{
                    gridTemplateColumns: `repeat(4, ${x})`,
                  }}
                >
                  {r.map((r) => {
                    let n = `${e}::${r.id}`;
                    return (
                      <div
                        data-cell={true}
                        style={{
                          width: x,
                        }}
                        className={"will-change-transform"}
                        onMouseEnter={() => P(n)}
                        onMouseLeave={() => P(null)}
                        onPointerDown={(e) => {
                          S.current = {
                            x: e.clientX,
                            y: e.clientY,
                          };
                        }}
                        onPointerUp={(e) => {
                          let t;
                          return (
                            (t = S.current),
                            void ((S.current = null),
                            t &&
                              6 >
                                Math.hypot(e.clientX - t.x, e.clientY - t.y) &&
                              z(r))
                          );
                        }}
                        key={n}
                      >
                        <CertificateCard achievement={r} focused={w === n} />
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <div
        className={
          "pointer-events-none absolute bottom-8 left-6 z-20 hidden sm:left-10 lg:block"
        }
      >
        <ScrambleText.ScrambleText
          as={"h1"}
          entrance={"observer"}
          className={
            "font-mono text-sm font-semibold uppercase tracking-[0.2em] text-white"
          }
        >
          {e.eyebrow}
        </ScrambleText.ScrambleText>
        <p
          className={
            "mt-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-zinc-500"
          }
        >
          {e.subtitle}
        </p>
      </div>
      <div
        className={
          "pointer-events-none absolute bottom-8 right-6 z-20 hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] sm:right-10 lg:block"
        }
      >
        <div className={"grid grid-cols-[auto_auto] gap-x-6 gap-y-1"}>
          <span className={"text-zinc-600"}>{"Certificates"}</span>
          <span className={"text-right tabular-nums text-zinc-300"}>{_}</span>
          <span className={"text-zinc-600"}>{"Elapsed"}</span>
          <span className={"text-right tabular-nums text-zinc-300"}>{R}</span>
          <span className={"text-zinc-600"}>{"Switches"}</span>
          <span className={"text-right tabular-nums text-zinc-300"}>{C}</span>
        </div>
      </div>
      <div
        className={
          "px-6 pb-24 pt-[calc(7rem+env(safe-area-inset-top))] lg:hidden"
        }
      >
        <ScrambleText.ScrambleText
          as={"p"}
          entrance={"observer"}
          className={
            "text-xs font-medium uppercase tracking-[0.3em] text-zinc-500"
          }
        >
          {e.eyebrow}
        </ScrambleText.ScrambleText>
        <ScrambleText.ScrambleText
          as={"h1"}
          entrance={"observer"}
          className={"mt-3 text-4xl font-semibold tracking-tight"}
        >
          {e.heading}
        </ScrambleText.ScrambleText>
        <p className={"mt-3 text-sm text-zinc-400"}>{e.subtitle}</p>
        <div
          className={
            "mt-6 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-white/5 pt-5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-zinc-500"
          }
        >
          <span>
            {"Certificates "}
            <span className={"tabular-nums text-zinc-300"}>{_}</span>
          </span>
          <span>
            {"Elapsed "}
            <span className={"tabular-nums text-zinc-300"}>{R}</span>
          </span>
          <span>
            {"Switches "}
            <span className={"tabular-nums text-zinc-300"}>{C}</span>
          </span>
        </div>
        {p.map(({ category: e, items: r }) => (
          <section className={"mt-12"} key={e}>
            <p
              className={
                "font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-zinc-500"
              }
            >
              <span className={"text-zinc-300"}>
                {"/ "}
                {e}
              </span>
              <span className={"ml-3 text-zinc-600"}>
                {String(r.length).padStart(2, "0")}
              </span>
            </p>
            <div className={"mt-4 grid grid-cols-2 items-start gap-4"}>
              {r.map((r) => (
                <div
                  data-mobile-card={true}
                  onClick={() => z(r)}
                  key={`${e}::${r.id}`}
                >
                  <CertificateCard
                    achievement={r}
                    focused={w === `${e}::${r.id}`}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      {k && <CertificateModal achievement={k} onClose={() => z(null)} />}
    </main>
  );
};

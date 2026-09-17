"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as Image from "next/image";
import * as React from "react";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
import * as SmoothScrollProvider from "@/components/layout/smooth-scroll-provider";
import * as ProjectUtils from "@/lib/project-utils";
import * as Links from "@/lib/links";
import * as LiquidButton from "@/components/ui/liquid-button";
let u = Motion.PIXEL_SCRUB.cols,
  h = Math.max(2, Math.round(u / 2.5)),
  p = u * h,
  f =
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";
function GalleryModal({ shot: e, index: n, total: s, onClose: a }) {
  let c = React.useRef(null),
    o = React.useRef(null),
    d = React.useRef(null),
    x = React.useRef(null),
    m = React.useCallback(() => Motion.achievementModalOut(o.current, d.current, a), [a]);
  return (
    React.useEffect(() => {
      let e = c.current.querySelectorAll("[data-block]"),
        t = Motion.achievementModalIn(o.current, d.current, e),
        r = Motion.achievementCardTilt(x.current, x.current);
      return () => {
        (t.kill(), r());
      };
    }, []),
    React.useEffect(() => {
      let e = (e) => {
        "Escape" === e.key && m();
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
    }, [m]),
    (
      <div
        ref={c}
        role={"dialog"}
        aria-modal={"true"}
        aria-label={e.caption}
        className={"fixed inset-0 z-[60] flex items-center justify-center p-6"}
      >
        <div
          ref={o}
          onClick={m}
          className={"absolute inset-0 bg-black/60 backdrop-blur-xl"}
        />
        <div
          ref={d}
          onClick={(e) => e.stopPropagation()}
          className={
            "relative z-10 w-full will-change-transform [perspective:1200px]"
          }
          style={{
            maxWidth: "min(72rem, calc((100vh - 9rem) * 16 / 9))",
          }}
        >
          <div
            ref={x}
            className={
              "relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-white/15 will-change-transform"
            }
          >
            <Image.default
              src={e.src}
              alt={e.caption}
              fill={true}
              sizes={"90vw"}
              className={"object-cover"}
              priority={true}
            />
            <div
              aria-hidden={true}
              className={"pointer-events-none absolute inset-0 grid gap-px"}
              style={{
                gridTemplateColumns: "repeat(48, minmax(0, 1fr))",
                gridTemplateRows: "repeat(27, minmax(0, 1fr))",
              }}
            >
              {Array.from({
                length: 1296,
              }).map((e, r) => (
                <div data-block={true} className={"bg-black"} key={r} />
              ))}
            </div>
          </div>
          <div className={"mt-4 flex items-start justify-between gap-6"}>
            <div>
              <p
                className={
                  "font-mono text-[0.625rem] uppercase tracking-[0.25em] text-zinc-500"
                }
              >
                {String(n + 1).padStart(2, "0")}
                {" / "}
                {String(s).padStart(2, "0")}
              </p>
              <h2
                className={
                  "mt-1 text-xl font-semibold tracking-tight text-white"
                }
              >
                {e.caption}
              </h2>
            </div>
            <button
              type={"button"}
              onClick={m}
              aria-label={"Close"}
              className={
                "shrink-0 rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
              }
            >
              {"Esc ✕"}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
function ScrollCue({ accent: e, label: r }) {
  return (
    <div
      className={"pointer-events-none flex flex-col items-center gap-3"}
      style={{
        color: e,
      }}
    >
      <span
        className={
          "font-mono text-[0.625rem] uppercase tracking-[0.3em] text-zinc-500"
        }
      >
        {r}
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
  );
}
function ImagePlaceholder({ label: e }) {
  return (
    <div
      className={
        "mx-auto flex aspect-[5/2] w-full max-w-4xl items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02]"
      }
    >
      <span
        className={
          "font-mono text-xs uppercase tracking-[0.25em] text-zinc-600"
        }
      >
        {e}
      </span>
    </div>
  );
}
export const ProjectCaseStudy = function ({ project: e, copy: c }) {
  let b = React.useRef(null),
    w = React.useRef(null),
    N = React.useRef(null),
    k = React.useRef(null),
    y = SmoothScrollProvider.useSmoothScroll(),
    R = React.useRef(y);
  R.current = y;
  let [z, C] = React.useState(0),
    [S, T] = React.useState(null),
    E = !!e.heroImage,
    P = !!e.gallery?.length,
    _ = e.accent ?? "#3b82f6",
    M = e.gallery ?? [],
    L = M[z],
    $ = String(M.length).padStart(2, "0"),
    O = ProjectUtils.overviewRows(e, c.metaLabels);
  return (
    Animation.useGSAP(
      () => {
        (window.scrollTo(0, 0),
          R.current?.scrollTo(0, {
            immediate: true,
          }));
        let e = Animation.gsap.matchMedia();
        (e.add("(min-width: 1024px)", () => {
          if (!E || !w.current || !N.current) return;
          let e = Animation.gsap.utils.toArray("[data-pxcell]", N.current),
            t = Motion.pixelScrubReveal({
              windowEl: w.current,
              cells: e,
              cols: u,
              rows: h,
            });
          return () => t?.kill();
        }),
          e.add("(max-width: 1023px)", () => {
            N.current &&
              Animation.gsap.set(N.current.querySelectorAll("[data-pxcell]"), {
                opacity: 0,
              });
          }),
          Motion.prefersReducedMotion() ||
            Animation.gsap.from("[data-entry-title]", {
              opacity: 0,
              scale: 1.06,
              duration: 1,
              ease: "power3.out",
              clearProps: "transform",
            }),
          Motion.scrollReveal(
            "[data-overview]",
            {
              y: 24,
            },
            "top 85%",
          ),
          e.add("(min-width: 1280px)", () => {
            Animation.gsap.utils
              .toArray("[data-deck-card]", b.current)
              .forEach((e, t) => {
                Animation.ScrollTrigger.create({
                  trigger: e,
                  start: "top 60%",
                  end: "bottom 40%",
                  onToggle: (e) => e.isActive && C(t),
                });
              });
          }));
        let t = () => {
            (Animation.ScrollTrigger.refresh(), R.current?.resize());
          },
          r = Animation.gsap.delayedCall(0.25, t),
          l = Animation.gsap.delayedCall(1, t),
          a = Animation.gsap.delayedCall(2.5, t);
        return (
          window.addEventListener("load", t),
          () => {
            (r.kill(),
              l.kill(),
              a.kill(),
              window.removeEventListener("load", t));
          }
        );
      },
      {
        scope: b,
      },
    ),
    React.useEffect(() => {
      let e = k.current;
      if (!e || Motion.prefersReducedMotion()) return;
      let t = Animation.gsap.fromTo(
        e,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
      );
      return () => {
        t.kill();
      };
    }, [z]),
    (
      <div ref={b}>
        <div
          className={
            "pointer-events-none fixed inset-0 z-10 flex items-center justify-center px-6 text-center sm:px-10"
          }
        >
          <h1
            data-entry-title={true}
            className={
              "font-[family-name:var(--font-anton)] text-[clamp(3.5rem,16vw,14rem)] leading-[0.9] tracking-tight text-[#ece7df]"
            }
          >
            {e.name}
          </h1>
        </div>
        <div
          className={
            "pointer-events-none fixed bottom-12 left-1/2 z-10 -translate-x-1/2"
          }
        >
          <ScrollCue accent={_} label={c.scrollCue} />
        </div>
        <div className={"h-screen"} aria-hidden={true} />
        <div className={"relative z-20 bg-black"}>
          <section className={"px-6 sm:px-10 lg:px-16"}>
            {E ? (
              <div
                ref={w}
                className={
                  "relative aspect-[5/2] w-full overflow-hidden rounded-xl"
                }
              >
                <Image.default
                  src={e.heroImage}
                  alt={`${e.name} hero`}
                  fill={true}
                  priority={true}
                  sizes={"100vw"}
                  className={"object-cover"}
                />
                <div
                  ref={N}
                  aria-hidden={true}
                  className={"pointer-events-none absolute inset-0 grid"}
                  style={{
                    gridTemplateColumns: `repeat(${u}, 1fr)`,
                    gridTemplateRows: `repeat(${h}, 1fr)`,
                  }}
                >
                  {Array.from({
                    length: p,
                  }).map((e, r) => (
                    <div
                      data-pxcell={true}
                      className={"bg-black will-change-transform"}
                      key={r}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <ImagePlaceholder label={c.heroPlaceholder} />
            )}
          </section>
          <section className={"px-6 pb-24 pt-10 sm:px-10"}>
            <div
              data-overview={true}
              className={
                "mx-auto grid w-full max-w-6xl items-center gap-x-16 gap-y-14 lg:grid-cols-2"
              }
            >
              <div>
                <p
                  className={
                    "font-mono text-xs uppercase tracking-[0.3em] text-zinc-500"
                  }
                >
                  {"Project Overview"}
                </p>
                <h2
                  className={
                    "mt-6 font-[family-name:var(--font-anton)] text-6xl leading-[0.92] tracking-tight text-[#ece7df] sm:text-7xl lg:text-8xl"
                  }
                >
                  {e.name}
                </h2>
              </div>
              <div className={"flex flex-col"}>
                <dl className={"flex flex-col"}>
                  {O.map((e) =>
                    "row" === e.kind ? (
                      <div
                        className={
                          "grid grid-cols-[6.5rem_1fr] items-start gap-x-6 border-t border-white/10 py-5"
                        }
                        key={e.label}
                      >
                        <dt
                          className={
                            "flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em]"
                          }
                          style={{
                            color: _,
                          }}
                        >
                          <span className={"text-[0.4375rem] leading-none"}>
                            {"●"}
                          </span>
                          {e.label}
                        </dt>
                        <dd className={"text-sm leading-relaxed text-white/85"}>
                          {e.value}
                        </dd>
                      </div>
                    ) : (
                      <div
                        className={"border-t border-white/10 py-5"}
                        key={e.label}
                      >
                        <p
                          className={
                            "flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em]"
                          }
                          style={{
                            color: _,
                          }}
                        >
                          <span className={"text-[0.4375rem] leading-none"}>
                            {"●"}
                          </span>
                          {e.label}
                        </p>
                        <div
                          className={"mt-4 flex flex-col gap-3 pl-[1.125rem]"}
                        >
                          {e.rows.map((e) => (
                            <div
                              className={
                                "grid grid-cols-[5.5rem_1fr] items-baseline gap-x-5"
                              }
                              key={e.label}
                            >
                              <dt
                                className={
                                  "font-mono text-[0.625rem] uppercase tracking-[0.18em]"
                                }
                                style={{
                                  color: _,
                                }}
                              >
                                {e.label}
                              </dt>
                              <dd
                                className={
                                  "text-sm leading-relaxed text-white/85"
                                }
                              >
                                {e.value}
                              </dd>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </dl>
                <div className={"mt-8 border-t border-white/10 pt-8"}>
                  <LiquidButton.LiquidButton
                    href={Links.externalHref(e.liveUrl ?? e.repo)}
                    external={true}
                    shape={"rounded"}
                  >
                    {e.liveUrl ? c.launchWebsite : c.viewRepository}
                  </LiquidButton.LiquidButton>
                </div>
              </div>
            </div>
          </section>
          <section className={"relative px-6 pb-40 pt-8 sm:px-10"}>
            {P ? (
              <jsxRuntime.Fragment>
                <div
                  className={
                    "mx-auto hidden max-w-[110rem] xl:grid xl:grid-cols-[minmax(0,1fr)_42rem_minmax(0,1fr)] xl:gap-8"
                  }
                >
                  <div
                    className={
                      "sticky top-0 flex h-screen flex-col justify-center"
                    }
                  >
                    <div ref={k}>
                      <p
                        className={
                          "font-mono text-[0.6875rem] uppercase tracking-[0.25em] text-zinc-500"
                        }
                      >
                        {e.name}
                        {" — "}
                        {String(z + 1).padStart(2, "0")}
                        {" /"} {$}
                      </p>
                      <h3
                        className={
                          "mt-5 font-[family-name:var(--font-anton)] text-4xl leading-[1.02] tracking-tight text-[#ece7df]"
                        }
                      >
                        {L?.caption}
                      </h3>
                    </div>
                  </div>
                  <div className={"relative"}>
                    {M.map((e, l) => (
                      <div
                        data-deck-card={true}
                        className={"sticky"}
                        style={{
                          top: `calc(50vh - 11.81rem + ${1.25 * l}rem)`,
                          zIndex: l + 1,
                        }}
                        key={e.src}
                      >
                        <figure className={"pb-[22vh]"}>
                          <button
                            type={"button"}
                            onClick={() => T(l)}
                            aria-label={`Open ${e.caption}`}
                            className={
                              "relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition-[scale,box-shadow] duration-500 ease-out hover:ring-white/25 motion-safe:hover:scale-[1.03]"
                            }
                          >
                            <Image.default
                              src={e.src}
                              alt={e.caption}
                              fill={true}
                              sizes={"42rem"}
                              className={"object-cover"}
                            />
                          </button>
                        </figure>
                      </div>
                    ))}
                  </div>
                  <div
                    className={
                      "sticky top-0 flex h-screen flex-col items-end justify-center"
                    }
                  >
                    <a
                      href={Links.externalHref(e.repo)}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                      aria-label={`${e.name} on GitHub`}
                      className={
                        "group inline-flex items-center gap-3 rounded-2xl bg-white/[0.04] px-5 py-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07] hover:ring-white/25"
                      }
                    >
                      <svg
                        viewBox={"0 0 24 24"}
                        className={
                          "h-6 w-6 text-zinc-200 transition-colors group-hover:text-white"
                        }
                        fill={"currentColor"}
                        aria-hidden={true}
                      >
                        <path d={f} />
                      </svg>
                      <span
                        className={
                          "font-mono text-sm text-zinc-200 transition-colors group-hover:text-white"
                        }
                      >
                        {c.githubLabel} <span aria-hidden={true}>{"↗"}</span>
                      </span>
                    </a>
                  </div>
                </div>
                <div
                  className={"mx-auto flex max-w-2xl flex-col gap-14 xl:hidden"}
                >
                  <div className={"flex items-center justify-between"}>
                    <h3
                      className={
                        "font-[family-name:var(--font-anton)] text-4xl leading-[0.9] tracking-tight text-[#ece7df]"
                      }
                    >
                      {e.name}
                    </h3>
                    <a
                      href={Links.externalHref(e.repo)}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                      aria-label={`${e.name} on GitHub`}
                      className={
                        "group inline-flex items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07] hover:ring-white/25"
                      }
                    >
                      <svg
                        viewBox={"0 0 24 24"}
                        className={
                          "h-5 w-5 text-zinc-200 transition-colors group-hover:text-white"
                        }
                        fill={"currentColor"}
                        aria-hidden={true}
                      >
                        <path d={f} />
                      </svg>
                      <span
                        className={
                          "font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors group-hover:text-white"
                        }
                      >
                        {c.githubLabel}
                      </span>
                    </a>
                  </div>
                  {e.gallery?.map((l, n) => (
                    <figure className={"flex flex-col gap-4"} key={l.src}>
                      <button
                        type={"button"}
                        onClick={() => T(n)}
                        aria-label={`Open ${l.caption}`}
                        className={
                          "relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-white/10 transition-transform duration-500 ease-out motion-safe:hover:scale-[1.02]"
                        }
                      >
                        <Image.default
                          src={l.src}
                          alt={l.caption}
                          fill={true}
                          sizes={"(min-width: 640px) 42rem, 100vw"}
                          className={"object-cover"}
                        />
                      </button>
                      <figcaption
                        className={
                          "grid grid-cols-3 items-start font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-zinc-500"
                        }
                      >
                        <span className={"text-zinc-600"}>
                          {String(n + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={
                            "text-center text-sm normal-case tracking-normal text-zinc-100"
                          }
                        >
                          {l.caption}
                        </span>
                        <span
                          className={"text-right"}
                          style={{
                            color: _,
                          }}
                        >
                          {"© "}
                          {e.year ?? ""}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </jsxRuntime.Fragment>
            ) : (
              <div className={"mx-auto max-w-4xl"}>
                <ImagePlaceholder label={c.galleryPlaceholder} />
              </div>
            )}
          </section>
        </div>
        {null !== S && M[S] && (
          <GalleryModal
            shot={M[S]}
            index={S}
            total={M.length}
            onClose={() => T(null)}
          />
        )}
      </div>
    )
  );
};

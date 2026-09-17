"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as Dynamic from "next/dynamic";
import * as Link from "next/link";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
import * as ProjectUtils from "@/lib/project-utils";
import * as Image from "next/image";
import * as ScrambleText from "@/components/ui/scramble-text";
import * as Links from "@/lib/links";
import * as SmoothScrollProvider from "@/components/layout/smooth-scroll-provider";
let f = [
    "M0 18 H70 l20 20 H150",
    "M0 46 H50 l18 -18 H130",
    "M0 70 H100 l16 16 H150",
    "M0 96 H60 l20 -20 H140",
    "M0 120 H90 l18 18 H150",
    "M0 142 H40 l20 -20 H120",
    "M400 22 H330 l-20 20 H250",
    "M400 50 H350 l-18 -18 H270",
    "M400 74 H300 l-16 16 H250",
    "M400 100 H340 l-20 -20 H260",
    "M400 126 H310 l-18 18 H250",
    "M400 146 H360 l-20 -20 H280",
    "M30 0 V40 l20 20 V90",
    "M370 0 V44 l-20 20 V96",
    "M120 160 V126 l20 -20 H150",
    "M280 160 V130 l-20 -20 H250",
  ],
  p = [
    {
      x: 150,
      y: 38,
      pulse: true,
    },
    {
      x: 130,
      y: 28,
    },
    {
      x: 150,
      y: 86,
    },
    {
      x: 140,
      y: 76,
      pulse: true,
    },
    {
      x: 150,
      y: 138,
    },
    {
      x: 120,
      y: 122,
      pulse: true,
    },
    {
      x: 250,
      y: 42,
    },
    {
      x: 270,
      y: 32,
      pulse: true,
    },
    {
      x: 250,
      y: 90,
    },
    {
      x: 260,
      y: 80,
    },
    {
      x: 250,
      y: 144,
      pulse: true,
    },
    {
      x: 280,
      y: 126,
    },
    {
      x: 50,
      y: 90,
    },
    {
      x: 350,
      y: 96,
      pulse: true,
    },
    {
      x: 150,
      y: 106,
    },
    {
      x: 250,
      y: 110,
    },
  ];
function ProjectCircuit({ accent: e = "#3b82f6", variant: r = 0 }) {
  let n = (r % 6) * 0.31;
  return (
    <svg
      aria-hidden={true}
      viewBox={"0 0 400 160"}
      preserveAspectRatio={"xMidYMid slice"}
      className={"absolute inset-0 h-full w-full"}
      style={{
        color: e,
      }}
    >
      <g
        transform={`translate(200 80) scale(${r % 2 == 0 ? 1 : -1} ${r % 4 < 2 ? 1 : -1}) translate(-200 -80)`}
      >
        <g
          fill={"none"}
          stroke={"currentColor"}
          strokeOpacity={0.16}
          strokeWidth={1}
        >
          {f.map((e, r) => (
            <path d={e} key={`b${r}`} />
          ))}
        </g>
        <g
          fill={"none"}
          stroke={"currentColor"}
          strokeWidth={1.6}
          strokeLinecap={"round"}
        >
          {f.map((e, r) => (
            <path
              d={e}
              pathLength={1}
              className={"circuit-flow"}
              style={{
                animationDuration: `${2.6 + (r % 5) * 0.6}s`,
                animationDelay: `${(((0.53 * r) % 3) + n).toFixed(2)}s`,
              }}
              key={`f${r}`}
            />
          ))}
        </g>
        <g fill={"currentColor"}>
          {p.map((e, r) => (
            <circle
              cx={e.x}
              cy={e.y}
              r={2}
              opacity={e.pulse ? void 0 : 0.35}
              className={e.pulse ? "circuit-node" : void 0}
              style={
                e.pulse
                  ? {
                      animationDuration: `${2.2 + (r % 4) * 0.5}s`,
                      animationDelay: `${((0.4 * r) % 2).toFixed(2)}s`,
                    }
                  : void 0
              }
              key={`n${r}`}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
function ProjectThumbnail({ project: e }) {
  return e.logo ? (
    <div
      style={{
        "--accent": e.accent ?? "#3b82f6",
      }}
      className={
        "group relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:ring-white/25 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]"
      }
    >
      <div
        aria-hidden={true}
        className={"thumb-glow pointer-events-none absolute inset-0"}
      />
      <div
        aria-hidden={true}
        className={"pointer-events-none absolute inset-0"}
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at center, transparent 64px, #000 112px)",
          maskImage:
            "radial-gradient(circle at center, transparent 64px, #000 112px)",
        }}
      >
        <ProjectCircuit
          accent={e.accent}
          variant={Number.parseInt(e.num, 10) - 1}
        />
      </div>
      <div
        aria-hidden={true}
        className={
          "thumb-glow-strong pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        }
      />
      <div
        aria-hidden={true}
        className={
          "pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[350%]"
        }
      />
      <div className={"thumb-float relative"}>
        <Image.default
          src={e.logo}
          alt={`${e.name} logo`}
          width={160}
          height={160}
          sizes={"128px"}
          className={
            "h-32 w-32 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:scale-110"
          }
        />
      </div>
    </div>
  ) : e.image ? (
    <div
      className={
        "relative h-40 w-full overflow-hidden rounded-xl ring-1 ring-white/10"
      }
    >
      <Image.default
        src={e.image}
        alt={`${e.name} screenshot`}
        fill={true}
        sizes={"(min-width: 1024px) 24rem, 100vw"}
        className={"object-cover"}
      />
    </div>
  ) : (
    <div
      className={
        "relative flex h-40 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black ring-1 ring-white/10"
      }
    >
      <span
        className={
          "font-mono text-6xl font-semibold tracking-tight text-white/10"
        }
      >
        {e.num}
      </span>
      <span aria-hidden={true} className={"h-px w-10 bg-blue-500"} />
    </div>
  );
}
let ProjectBackdrop = Dynamic.default(
  () => import("@/components/three/hero-head").then((e) => e.HeroHead),
  {
    ssr: false,
  },
);
function RepositoryLink({ repo: e, name: r }) {
  return (
    <a
      href={Links.externalHref(e)}
      target={"_blank"}
      rel={"noopener noreferrer"}
      aria-label={`${r} on GitHub`}
      className={
        "absolute bottom-0 right-0 z-20 flex h-14 w-14 items-center justify-center rounded-xl bg-black/50 text-zinc-300 ring-1 ring-white/30 backdrop-blur transition-colors hover:text-white hover:ring-white/60"
      }
    >
      <svg
        viewBox={"0 0 24 24"}
        className={"h-7 w-7"}
        fill={"currentColor"}
        aria-hidden={true}
      >
        <path
          d={
            "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          }
        />
      </svg>
    </a>
  );
}
function ProjectSummary({ project: e }) {
  return (
    <div className={"flex flex-col gap-2 pr-[4.25rem] text-left"}>
      <p className={"text-sm font-medium text-white"}>
        <span className={"mr-2 font-mono text-zinc-500"}>{e.num}</span>
        <ScrambleText.ScrambleText entrance={"observer"}>
          {e.name}
        </ScrambleText.ScrambleText>
      </p>
      <p className={"text-sm text-zinc-400"}>{e.description}</p>
      <p className={"text-xs uppercase tracking-[0.15em] text-zinc-500"}>
        {ProjectUtils.flattenStack(e).join(" · ")}
      </p>
    </div>
  );
}
export const Projects = function ({ projects: e }) {
  let n = React.useRef(null),
    u = React.useRef(null),
    d = React.useRef(null),
    f = React.useRef([]),
    [p, m] = React.useState(0),
    g = React.useRef(0),
    [w, k] = React.useState(false),
    N = SmoothScrollProvider.useSmoothScroll(),
    _ = React.useRef(N);
  return (
    (_.current = N),
    Animation.useGSAP(
      () => {
        let e = Animation.gsap.matchMedia();
        return (
          e.add("(min-width: 1024px)", () => {
            let e = Animation.gsap.utils.toArray(
              "[data-marquee-row]",
              n.current,
            );
            (Motion.prefersReducedMotion()
              ? Animation.gsap.set(d.current, {
                  scale: 1,
                  opacity: Motion.BG_SHAPE_OPACITY,
                })
              : Animation.gsap.fromTo(
                  d.current,
                  {
                    scale: 0.6,
                    opacity: 0,
                  },
                  {
                    scale: 1,
                    opacity: Motion.BG_SHAPE_OPACITY,
                    duration: Motion.DURATION.bgZoom,
                    ease: Motion.EASE.marquee,
                    scrollTrigger: {
                      trigger: n.current,
                      start: "top 70%",
                      toggleActions: "play none none none",
                    },
                  },
                ),
              Animation.ScrollTrigger.create({
                trigger: n.current,
                start: "top top",
                end: "bottom bottom",
                pin: u.current,
                pinSpacing: false,
              }),
              e.forEach((e, t) => {
                (Motion.marqueeRowFocus(e),
                  Animation.ScrollTrigger.create({
                    trigger: e,
                    start: "top 55%",
                    end: "bottom 45%",
                    onToggle: (e) => e.isActive && m(t),
                  }));
              }));
            let t = () => {
                (Animation.ScrollTrigger.refresh(), _.current?.resize());
              },
              r = Animation.gsap.delayedCall(0.35, t),
              a = Animation.gsap.delayedCall(1.2, t);
            return (
              window.addEventListener("load", t),
              () => {
                (r.kill(), a.kill(), window.removeEventListener("load", t));
              }
            );
          }),
          e.add("(max-width: 1023px)", () => {
            Animation.gsap.utils
              .toArray("[data-project-block]", n.current)
              .forEach((e) => {
                Motion.scrollReveal(
                  e,
                  {
                    y: 28,
                  },
                  "top 85%",
                );
              });
          }),
          () => e.revert()
        );
      },
      {
        scope: n,
      },
    ),
    React.useEffect(() => {
      if (g.current === p) return;
      let e = f.current[g.current],
        t = f.current[p];
      if (((g.current = p), e && t)) {
        if (
          (Animation.gsap.killTweensOf([e, t]),
          Animation.gsap.set(e, {
            pointerEvents: "none",
          }),
          Animation.gsap.set(t, {
            pointerEvents: "auto",
          }),
          Motion.prefersReducedMotion())
        ) {
          (Animation.gsap.set(e, {
            opacity: 0,
          }),
            Animation.gsap.set(t, {
              opacity: 1,
              y: 0,
            }));
          return;
        }
        Motion.thumbRailSwap(e, t);
      }
    }, [p]),
    React.useEffect(() => {
      let e = setTimeout(() => k(true), 150),
        t = setTimeout(() => window.dispatchEvent(new Event("resize")), 600);
      return () => {
        (clearTimeout(e), clearTimeout(t));
      };
    }, []),
    (
      <section
        id={"projects"}
        ref={n}
        className={"relative bg-black px-6 sm:px-10"}
      >
        <div
          aria-hidden={true}
          className={"pointer-events-none absolute inset-0 z-0 hidden lg:block"}
        >
          <div
            className={"sticky top-0 flex h-screen items-center justify-center"}
          >
            <div
              ref={d}
              className={
                "relative aspect-square w-[clamp(24rem,42vw,34rem)] opacity-0"
              }
            >
              {w && <ProjectBackdrop spin={0.12} scan={true} />}
            </div>
          </div>
        </div>
        <div
          className={"relative z-10 hidden lg:grid lg:grid-cols-[1.2fr_1fr]"}
        >
          <div className={"pb-[45vh] pt-[30vh]"}>
            {e.map((e, r) => (
              <div
                data-marquee-row={true}
                className={`flex min-h-[40vh] items-baseline gap-6 ${0 === r ? "text-white opacity-100" : "text-zinc-500 opacity-35"}`}
                key={e.num}
              >
                <Link.default
                  href={`/projects/${e.slug}`}
                  className={
                    "flex w-fit items-baseline gap-6 outline-none focus-visible:underline"
                  }
                >
                  <span className={"font-mono text-sm"}>{e.num}</span>
                  <ScrambleText.ScrambleText
                    as={"h3"}
                    entrance={"observer"}
                    className={
                      "text-5xl font-semibold tracking-tight xl:text-7xl"
                    }
                  >
                    {e.name}
                  </ScrambleText.ScrambleText>
                </Link.default>
              </div>
            ))}
          </div>
          <div className={"relative"}>
            <div
              ref={u}
              className={
                "flex h-screen flex-col items-center justify-center gap-10"
              }
            >
              <div className={"relative h-96 w-full max-w-sm"}>
                {e.map((e, r) => (
                  <div
                    ref={(e) => {
                      f.current[r] = e;
                    }}
                    className={"absolute inset-0 flex flex-col justify-center"}
                    style={{
                      opacity: +(0 === r),
                      pointerEvents: 0 === r ? "auto" : "none",
                    }}
                    key={e.num}
                  >
                    <div className={"relative"}>
                      <Link.default
                        href={`/projects/${e.slug}`}
                        className={
                          "flex flex-col gap-4 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        }
                      >
                        <ProjectThumbnail project={e} />
                        <ProjectSummary project={e} />
                      </Link.default>
                      <RepositoryLink repo={e.repo} name={e.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "flex flex-col gap-16 pb-24 pt-[calc(6rem+env(safe-area-inset-top))] lg:hidden"
          }
        >
          {e.map((e) => (
            <div data-project-block={true} className={"relative"} key={e.num}>
              <Link.default
                href={`/projects/${e.slug}`}
                className={"flex flex-col gap-4"}
              >
                <ProjectThumbnail project={e} />
                <ProjectSummary project={e} />
              </Link.default>
              <RepositoryLink repo={e.repo} name={e.name} />
            </div>
          ))}
        </div>
      </section>
    )
  );
};

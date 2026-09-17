"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as Link from "next/link";
import * as Navigation from "next/navigation";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
import * as NavigationState from "@/lib/navigation-state";
export const NextProjectChain = function ({ next: e, label: x }) {
  let m = e.themeColor ?? e.accent ?? "#ffffff",
    u = Navigation.useRouter(),
    h = React.useRef(null),
    p = React.useRef(null),
    f = React.useRef(null),
    g = React.useRef(null),
    v = React.useRef(null),
    j = React.useRef(false),
    b = Motion.NEXT_PROJECT.ringSize,
    w = b / 2 - Motion.NEXT_PROJECT.ringStroke - 2,
    N = 2 * Math.PI * w,
    k = `${b / 16}rem`;
  return (
    Animation.useGSAP(
      () => {
        if (Motion.prefersReducedMotion()) return;
        let t = f.current,
          r = g.current,
          l = v.current,
          n = p.current;
        if (!t || !r || !n) return;
        let i = {
            v: 0,
          },
          x = (e) => {
            ((e = e < 0 ? 0 : e > 1 ? 1 : e),
              (r.style.strokeDashoffset = String(N * (1 - e))),
              l && (l.textContent = String(Math.round(100 * e))),
              (t.style.opacity = String(
                Math.min(1, e / Motion.NEXT_PROJECT.fadeIn),
              )));
          };
        x(0);
        let m = Animation.gsap.to(i, {
            v: 1,
            duration: Motion.NEXT_PROJECT.countDuration,
            ease: "none",
            paused: true,
            onUpdate: () => x(i.v),
            onComplete: () => {
              j.current ||
                ((j.current = true),
                NavigationState.suppressNextPixelReveal(),
                u.push(`/projects/${e.slug}`));
            },
          }),
          h = Animation.ScrollTrigger.create({
            trigger: n,
            start: "top center",
            end: "max",
            onEnter: () => m.play(),
            onLeaveBack: () => m.reverse(),
          });
        return () => {
          (m.kill(), h.kill());
        };
      },
      {
        scope: h,
        dependencies: [e.slug],
      },
    ),
    (
      <div ref={h}>
        <div
          ref={p}
          aria-hidden={true}
          className={"relative z-20 bg-black motion-reduce:hidden"}
          style={{
            height: Motion.NEXT_PROJECT.runway,
          }}
        />
        <div
          ref={f}
          aria-hidden={true}
          className={
            "pointer-events-none fixed bottom-10 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-5 opacity-0 motion-reduce:hidden"
          }
        >
          <div
            className={"relative shrink-0"}
            style={{
              width: k,
              height: k,
            }}
          >
            <svg
              viewBox={`0 0 ${b} ${b}`}
              style={{
                width: k,
                height: k,
              }}
              className={"-rotate-90"}
            >
              <circle
                cx={b / 2}
                cy={b / 2}
                r={w}
                fill={"none"}
                stroke={"rgba(255,255,255,0.15)"}
                strokeWidth={Motion.NEXT_PROJECT.ringStroke}
              />
              <circle
                ref={g}
                cx={b / 2}
                cy={b / 2}
                r={w}
                fill={"none"}
                stroke={m}
                strokeWidth={Motion.NEXT_PROJECT.ringStroke}
                strokeLinecap={"round"}
                strokeDasharray={N}
                strokeDashoffset={N}
              />
            </svg>
            <span
              ref={v}
              className={
                "absolute inset-0 flex items-center justify-center font-mono text-lg text-white"
              }
            >
              {"0"}
            </span>
          </div>
          <div className={"whitespace-nowrap"}>
            <span
              className={
                "block font-mono text-[0.625rem] uppercase tracking-[0.3em] text-zinc-400"
              }
            >
              {x}
            </span>
            <span className={"block text-2xl font-bold text-white sm:text-3xl"}>
              {e.name}
            </span>
          </div>
        </div>
        <div
          className={
            "relative z-20 hidden justify-center bg-black px-6 pb-32 pt-[40vh] motion-reduce:flex"
          }
        >
          <Link.default
            href={`/projects/${e.slug}`}
            className={
              "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
            }
          >
            {x}
            {": "}
            {e.name}
            <span aria-hidden={true}>{"↓"}</span>
          </Link.default>
        </div>
      </div>
    )
  );
};

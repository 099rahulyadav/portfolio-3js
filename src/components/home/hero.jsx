"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as Dynamic from "next/dynamic";
import * as Navigation from "next/navigation";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
import * as IntroState from "@/lib/intro-state";
import * as LiveStatus from "@/components/home/live-status";
import * as LiquidButton from "@/components/ui/liquid-button";
import * as ScrambleText from "@/components/ui/scramble-text";
import * as HeadScanProvider from "@/components/layout/head-scan-provider";
let h = "/about#contact",
  HeroHead = Dynamic.default(
    () => import("@/components/three/hero-head").then((e) => e.HeroHead),
    {
      ssr: false,
    },
  );
export const Hero = function ({ hero: e }) {
  let r = React.useRef(null),
    x = Navigation.useRouter(),
    g = HeadScanProvider.useHeadScan(),
    b = React.useRef(false),
    v = React.useCallback(() => {
      b.current ||
        ((b.current = true),
        g
          .playExitAll()
          .then(() => x.push("/about"))
          .catch(() => {
            b.current = false;
          }));
    }, [g, x]);
  (Animation.useGSAP(
    () => {
      Animation.gsap.set("[data-hero-line]", {
        opacity: 0,
      });
    },
    {
      scope: r,
    },
  ),
    React.useEffect(
      () => IntroState.onReveal(() => Motion.navIntro("[data-hero-line]", 12)),
      [],
    ));
  let [y, j] = React.useState(IntroState.isRevealed);
  return (
    React.useEffect(() => {
      if (y) return;
      let e = window.setTimeout(() => j(true), 1e3 * Motion.INTRO.reveal);
      return () => window.clearTimeout(e);
    }, [y]),
    (
      <section
        ref={r}
        className={
          "relative flex min-h-screen items-center justify-center overflow-hidden"
        }
      >
        <div
          aria-hidden={true}
          className={
            "pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
          }
        >
          <div
            className={
              "relative aspect-square w-[100vmin] lg:aspect-auto lg:h-full lg:w-full"
            }
          >
            {y && (
              <HeroHead
                shape={"robot"}
                zoom={0.95}
                scanOnReveal={true}
                draggable={true}
                onActivate={v}
              />
            )}
          </div>
        </div>
        <div
          data-hero-line={true}
          className={
            "absolute left-6 top-[calc(env(safe-area-inset-top)+6.5rem)] z-10 max-w-[calc(100%-3rem)] sm:left-10 sm:top-1/2 sm:max-w-none sm:-translate-y-1/2"
          }
        >
          <LiveStatus.LiveStatus
            statusWords={e.hud.statusWords}
            timeZone={e.hud.timeZone}
            locationLabel={e.hud.locationLabel}
          />
        </div>
        <div
          data-hero-line={true}
          className={
            "absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 text-right font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.2em] text-zinc-500 sm:right-10 sm:block"
          }
        >
          <span className={"block text-zinc-300"}>{e.tagline.primary}</span>
          <span className={"block"}>{e.tagline.secondary}</span>
        </div>
        <div
          className={
            "absolute bottom-32 left-6 z-10 text-left sm:bottom-12 sm:left-10"
          }
        >
          <ScrambleText.ScrambleText
            as={"p"}
            data-hero-line={true}
            className={
              "font-mono text-xs uppercase tracking-[0.3em] text-blue-400"
            }
          >
            {e.eyebrow}
          </ScrambleText.ScrambleText>
          <h1
            data-hero-line={true}
            className={
              "mt-3 font-[family-name:var(--font-relidux)] text-5xl uppercase leading-[0.95] tracking-[0.03em] text-white sm:text-7xl"
            }
          >
            {e.name.split(/\s+/).map((e, n) => (
              <ScrambleText.ScrambleText
                as={"span"}
                className={"block"}
                key={n}
              >
                {e}
              </ScrambleText.ScrambleText>
            ))}
          </h1>
        </div>
        <div
          data-hero-line={true}
          className={"absolute bottom-12 left-6 z-10 sm:left-auto sm:right-10"}
        >
          <LiquidButton.LiquidButton
            href={h}
            onClick={(e) => {
              e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey ||
                0 !== e.button ||
                (g.hasMounted() &&
                  (e.preventDefault(),
                  g.playExitAll().then(() =>
                    x.push(h, {
                      scroll: false,
                    }),
                  )));
            }}
            aria-label={e.ctaLabel}
          >
            {e.ctaLabel}
          </LiquidButton.LiquidButton>
        </div>
      </section>
    )
  );
};

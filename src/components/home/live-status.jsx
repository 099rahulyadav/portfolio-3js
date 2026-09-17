"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
export const CodingSince = function ({ year: e }) {
  return (
    <div
      className={
        "text-right font-mono text-[0.625rem] uppercase tracking-[0.2em]"
      }
    >
      <span className={"block text-zinc-300"}>{e}</span>
      <span className={"block text-zinc-600"}>{"Coding since"}</span>
    </div>
  );
};
export const LiveStatus = function ({
  statusWords: e,
  timeZone: s,
  locationLabel: i,
}) {
  let [o, u] = React.useState(null),
    [c, d] = React.useState(0),
    f = React.useRef(null);
  return (
    React.useEffect(() => {
      let e = new Intl.DateTimeFormat("en-GB", {
          timeZone: s,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
        t = () => u(e.format(new Date()));
      t();
      let n = setInterval(t, 1e3);
      return () => clearInterval(n);
    }, [s]),
    React.useEffect(() => {
      let t = f.current,
        n = setInterval(
          () => {
            let n = () => d((t) => (t + 1) % e.length);
            Motion.prefersReducedMotion() || !t
              ? n()
              : Animation.gsap.to(t, {
                  opacity: 0,
                  duration: Motion.DURATION.indicatorExit,
                  ease: Motion.EASE.boot,
                  onComplete: () => {
                    (n(),
                      Animation.gsap.to(t, {
                        opacity: 1,
                        duration: Motion.DURATION.indicatorExit,
                        ease: Motion.EASE.boot,
                      }));
                  },
                });
          },
          (Motion.DURATION.ghostHold + 2 * Motion.DURATION.indicatorExit) * 1e3,
        );
      return () => clearInterval(n);
    }, [e.length]),
    (
      <div
        className={
          "flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-zinc-500"
        }
      >
        <span className={"tabular-nums"}>{o ?? "--:--:--"}</span>
        <span>{i}</span>
        <span ref={f} className={"text-zinc-300"}>
          {"/ "}
          {e[c]}
        </span>
      </div>
    )
  );
};

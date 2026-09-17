"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as Navigation from "next/navigation";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
import * as NavigationState from "@/lib/navigation-state";
let u = React.useLayoutEffect,
  s = {
    cols: 22,
    rows: 13,
  },
  c = new Set(["/", "/about"]);
export const PixelReveal = function () {
  let e = React.useRef(null),
    [f, d] = React.useState(s),
    p = React.useRef(s.cols),
    m = React.useRef(true),
    h = Navigation.usePathname();
  return (
    React.useEffect(() => {
      let e = () => {
        let e,
          t,
          r,
          n,
          i =
            ((e = window.innerWidth),
            (t = window.innerHeight),
            (r = Math.min(
              Motion.PIXEL_REVEAL.maxCols,
              Math.max(
                Motion.PIXEL_REVEAL.minCols,
                Math.round(e / Motion.PIXEL_REVEAL.targetCell),
              ),
            )),
            (n = Math.max(6, Math.round(t / (e / r)))),
            {
              cols: r,
              rows: n,
            });
        ((p.current = i.cols), d(i));
      };
      return (
        e(),
        window.addEventListener("resize", e),
        () => window.removeEventListener("resize", e)
      );
    }, []),
    u(() => {
      if (Motion.prefersReducedMotion()) return;
      if (c.has(h)) {
        m.current = false;
        let t = e.current;
        t &&
          Animation.gsap.set(t, {
            opacity: 0,
            pointerEvents: "none",
          });
        return;
      }
      let t = e.current;
      if (!t) return;
      let r = t.querySelectorAll("[data-pixel-cell]");
      if (!r.length) return;
      let n = () => {
        (Animation.gsap.set(t, {
          opacity: 1,
          pointerEvents: "auto",
        }),
          Motion.pixelRevealOut(r, p.current, () =>
            Animation.gsap.set(t, {
              opacity: 0,
              pointerEvents: "none",
            }),
          ));
      };
      if (m.current) {
        m.current = false;
        let e = Animation.gsap.delayedCall(Motion.PIXEL_REVEAL.initialDelay, n);
        return () => {
          e.kill();
        };
      }
      if (NavigationState.consumePixelRevealSkip())
        return void Animation.gsap.set(t, {
          opacity: 0,
          pointerEvents: "none",
        });
      (Animation.gsap.set(t, {
        opacity: 1,
        pointerEvents: "auto",
      }),
        Motion.pixelRevealCoverInstant(r));
      let u = Animation.gsap.delayedCall(Motion.PIXEL_REVEAL.swapDelay, n);
      return () => {
        u.kill();
      };
    }, [h]),
    (
      <div
        ref={e}
        aria-hidden={true}
        className={`fixed inset-0 z-[100] grid motion-reduce:hidden ${c.has(h) ? "hidden" : ""}`}
        style={{
          gridTemplateColumns: `repeat(${f.cols}, 1fr)`,
          gridTemplateRows: `repeat(${f.rows}, 1fr)`,
        }}
      >
        {Array.from({
          length: f.cols * f.rows,
        }).map((e, r) => (
          <div
            data-pixel-cell={true}
            className={"bg-black will-change-transform"}
            key={r}
          />
        ))}
      </div>
    )
  );
};

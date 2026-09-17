"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
import * as UiScale from "@/lib/ui-scale";
export const CursorDot = function () {
  let e = React.useRef(null),
    l = UiScale.useUiScale(),
    [u, s] = React.useState(false);
  return (React.useEffect(() => {
    window.matchMedia("(hover: hover) and (pointer: fine)").matches && s(true);
  }, []),
  React.useEffect(() => {
    let t = e.current;
    if (!u || !t) return;
    document.documentElement.classList.add("cursor-none");
    let r = (Motion.CURSOR.size * l) / 2,
      o = Animation.gsap.quickSetter(t, "x", "px"),
      s = Animation.gsap.quickSetter(t, "y", "px"),
      c = Animation.gsap.quickSetter(t, "opacity");
    (o(window.innerWidth / 2 - r), s(window.innerHeight / 2 - r));
    let f = Motion.cursorChase((e, t, n) => {
      (o(e - r), s(t - r), c(n));
    });
    return () => {
      (f(), document.documentElement.classList.remove("cursor-none"));
    };
  }, [u, l]),
  u) ? (
    <div
      ref={e}
      aria-hidden={true}
      className={
        "pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white will-change-transform"
      }
      style={{
        width: Motion.CURSOR.size * l,
        height: Motion.CURSOR.size * l,
      }}
    />
  ) : null;
};

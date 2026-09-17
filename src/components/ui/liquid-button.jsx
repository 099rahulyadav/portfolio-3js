"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as Link from "next/link";
import * as Motion from "@/lib/motion";
import * as UiScale from "@/lib/ui-scale";
let i = `${6 / 16}rem`;
export const LiquidButton = function ({
  children: e,
  href: o,
  onClick: u,
  external: c = false,
  shape: d = "pill",
  className: f = "",
  ...m
}) {
  let h = "rounded" === d ? "rounded-lg" : "rounded-full",
    p = React.useRef(null),
    x = React.useRef(null),
    g = React.useRef(null),
    b = React.useRef(null),
    v = React.useRef(false);
  React.useEffect(() => {
    let e = p.current,
      t = x.current,
      n = g.current;
    if (!e || !t || !n) return;
    let r = () => {
      let r = 6 * UiScale.uiScale(),
        a = Math.max(0, e.clientHeight - 2 * r);
      (b.current?.kill(),
        (b.current = Motion.liquidFillTimeline({
          fill: t,
          label: n,
          from: {
            top: r,
            left: r,
            bottom: r,
            width: a,
          },
          to: {
            top: 0,
            left: 0,
            bottom: 0,
            width: e.clientWidth,
          },
        })),
        b.current.progress(+!!v.current));
    };
    r();
    let a = new ResizeObserver(r);
    return (
      a.observe(e),
      () => {
        (a.disconnect(), b.current?.kill());
      }
    );
  }, []);
  let y = (e) => {
      if (e === v.current) return;
      v.current = e;
      let t = b.current;
      if (t) {
        if (Motion.prefersReducedMotion()) return void t.progress(+!!e).pause();
        e ? t.play() : t.reverse();
      }
    },
    j = {
      onMouseEnter: () => y(true),
      onMouseLeave: () => y(false),
      onFocus: () => y(true),
      onBlur: () => y(false),
      onTouchStart: () => y(true),
      onTouchEnd: () => y(false),
      onTouchCancel: () => y(false),
    },
    k = (
      <jsxRuntime.Fragment>
        <span
          ref={x}
          aria-hidden={true}
          className={`pointer-events-none absolute z-0 ${h}`}
          style={{
            top: i,
            left: i,
            bottom: i,
            width: "2.25rem",
            backgroundColor: Motion.LIQUID.ink,
          }}
        />
        <span
          className={"relative z-10 flex items-center gap-3 py-1.5 pl-1.5 pr-6"}
        >
          <span
            className={
              "flex h-9 w-9 items-center justify-center rounded-full text-white"
            }
          >
            <svg
              viewBox={"0 0 24 24"}
              className={"h-4 w-4"}
              fill={"none"}
              stroke={"currentColor"}
              strokeWidth={2.5}
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              aria-hidden={true}
            >
              <path d={"M5 12h14M13 6l6 6-6 6"} />
            </svg>
          </span>
          <span
            ref={g}
            className={
              "text-[0.9375rem] font-semibold tracking-tight text-[#0a0a0a]"
            }
          >
            {e}
          </span>
        </span>
      </jsxRuntime.Fragment>
    ),
    N =
      `group relative inline-flex select-none items-center ${h} ring-2 ring-transparent transition-shadow duration-300 hover:ring-white/80 active:ring-white/80 ` +
      f,
    R = {
      backgroundColor: Motion.LIQUID.cream,
    };
  return o && c ? (
    <a
      ref={p}
      href={o}
      target={"_blank"}
      rel={"noopener noreferrer"}
      onClick={u}
      className={N}
      style={R}
      {...j}
      {...m}
    >
      {k}
    </a>
  ) : o ? (
    <Link.default
      ref={p}
      href={o}
      onClick={u}
      className={N}
      style={R}
      {...j}
      {...m}
    >
      {k}
    </Link.default>
  ) : (
    <button
      ref={p}
      type={"button"}
      onClick={u}
      className={N}
      style={R}
      {...j}
      {...m}
    >
      {k}
    </button>
  );
};

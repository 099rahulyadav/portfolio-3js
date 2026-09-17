"use client";

import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
let i = {
    boot: "power1.inOut",
    navIntro: "power3.out",
    crossfade: "power2.inOut",
    marquee: "power2.out",
    thumbIn: "power2.in",
    thumbOut: "power2.out",
    wipe: "power4.inOut",
    heroTitle: "power4.out",
    reveal: "power3.out",
    ghost: "sine.inOut",
    cardSwap: "power3.inOut",
    cardSwapBack: "back.out(1.3)",
    achievePixel: "steps(7)",
    modalPop: "back.out(1.6)",
    linear: "none",
  },
  s = {
    navIntro: 0.7,
    crossfade: 0.8,
    crossfadeHold: 5,
    indicatorLoop: 1.5,
    indicatorExit: 0.3,
    marqueeRow: 0.45,
    thumbSwap: 0.375,
    wipe: 0.75,
    heroTitle: 1,
    reveal: 0.65,
    photoStrip: 0.8,
    ghostHold: 3.5,
    ghostFade: 0.8,
    awardRow: 0.325,
    badgeFill: 0.275,
    cardSwap: 0.55,
    playgroundCell: 0.15,
    bgZoom: 0.9,
    achieveIntro: 0.5,
    achieveIdle: 3.2,
    modalPanel: 0.4,
    modalReveal: 0.6,
  },
  a = {
    panFactor: 1,
    panLerp: 0.12,
    edgeResist: 0.32,
    edgePad: 40,
    convergeScale: 0.0034,
    convergeMax: 0.2,
    idleAmp: 10,
    idleRotate: 2.6,
    idleScrollFrames: 90,
    idleScrollSpeed: 0.35,
    introSweep: 0.85,
    introJitter: 0.12,
    pixelBlockEach: 4e-4,
    tiltMax: 9,
  },
  o = {
    hold: 8,
    beat: 0.1,
  },
  l = {
    swayDeg: 3.2,
    cycle: 5.5,
    phaseOffset: 0.37,
  },
  u = {
    targetCell: 58,
    maxCols: 24,
    minCols: 8,
    rowStagger: 0.04,
    jitter: 0.05,
    cellDuration: 0.4,
    cellScale: 0.35,
    ease: "power2.in",
    initialDelay: 0.15,
    swapDelay: 0.08,
  },
  c = {
    cols: 36,
    band: 0.18,
    jitter: 0.14,
    cellScale: 0.4,
    coverScale: 1.06,
    runway: "+=60%",
  },
  h = {
    widths: [0.2, 0.2, 0.2, 0.2, 0.2],
    heights: [0.68, 1, 0.48, 0.9, 0.6],
    stagger: [0, 0.12, 0.035, 0.15, 0.065],
    bandVh: 0.42,
    litTo: 0.5,
    darkPeak: 0.85,
    runway: "+=115%",
  },
  f = {
    fill: 0.5,
    ease: "power3.inOut",
    labelFade: 0.32,
    textOff: "#0a0a0a",
    textOn: "#ffffff",
    cream: "#ece7df",
    ink: "#0a0a0a",
  },
  p = {
    duration: 1.2,
    ease: "power2.inOut",
    margin: 0.2,
    rimWidthFactor: 1.7,
    rimThickness: 0.035,
    rimOpacity: 0.6,
  },
  d = {
    duration: 0.6,
    sweep: 0.65,
    jitter: 0.22,
    glyphFps: 26,
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    digits: "0123456789",
  },
  g = {
    nav: 0.075,
    boot: 0.02,
    heroTitle: 0.175,
    reveal: 0.09,
    thumb: 0.05,
    badge: 0.05,
    achieveIntro: 0.035,
  },
  m = {
    marquee: 0.4,
    heroParallax: 0.5,
    playgroundParallax: 0.6,
  },
  v = {
    overview: "top 85%",
    photoStrip: "top 90%",
    awardsRow: "top 55%",
    gallery: "top 82%",
  },
  _ = {
    size: 14,
    ease: 0.4,
    idleDelay: 500,
    fadeOut: 0.06,
    fadeIn: 0.25,
  },
  y = {
    scrub: 0.6,
    gap: 10,
    stroke: 2,
    color: "#3b82f6",
    start: "top 72%",
    end: "bottom 60%",
    endAtCard: "center center",
    node: 3.5,
    nodeFlare: 6,
    tip: 5,
    branchWindow: 0.16,
    nodeWindow: 0.05,
  };
function x() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function w(t, r, n = 0) {
  t.forEach((t, i) => {
    Animation.gsap.delayedCall(n + i * r, () => {
      let e;
      return (
        (e = []),
        void (t.__scramblePlay && e.push(t),
        t.querySelectorAll?.("[data-scramble]").forEach((t) => e.push(t)),
        e.forEach((t) => t.__scramblePlay?.()))
      );
    });
  });
}
let b = {
    color: "#6b7280",
    opacity: 0.35,
  },
  T = {
    color: "#ffffff",
    opacity: 1,
  };
export { h as ABOUT_PANEL };
export { a as ACHIEVE };
export { l as ARM_BREATHE };
export const BG_SHAPE_OPACITY = 0.45;
export { y as CAREER };
export { _ as CURSOR };
export { s as DURATION };
export { i as EASE };
export { p as HEAD_SCAN };
export const INTRO = {
  reveal: 0.6,
  hold: 0.5,
  dock: 0.85,
  fade: 0.5,
  ease: "power4.inOut",
};
export { f as LIQUID };
export const NEXT_PROJECT = {
  runway: "60vh",
  countDuration: 3.4,
  ringSize: 96,
  ringStroke: 3,
  fadeIn: 0.12,
};
export { u as PIXEL_REVEAL };
export { c as PIXEL_SCRUB };
export { d as SCRAMBLE };
export { m as SCRUB };
export { g as STAGGER };
export { v as START };
export { o as STYLE_SHIFT };
export const SWARM_COUNT = 12e3;
export const aboutCurtainRise = function (t) {
  let { pinEl: e, curtain: n, panels: i, dimmer: s } = t;
  if (x()) return null;
  let { bandVh: a, stagger: o, darkPeak: l, runway: u } = h,
    c = (t) => {
      let e,
        r = window.innerHeight;
      n.style.transform = `translateY(${(1 - t) * (r + a * r)}px)`;
      let u = (e = t < 0 ? 0 : t > 1 ? 1 : t) * e * (3 - 2 * e);
      for (let t = 0; t < i.length; t++) {
        let e = (o[t] ?? 0) * r * (1 - u);
        i[t].style.transform = `translateY(${e}px)`;
      }
      s.style.opacity = String(u * l);
    };
  return (
    c(0),
    Animation.ScrollTrigger.create({
      trigger: e,
      start: "top top",
      end: u,
      pin: e,
      scrub: true,
      onUpdate: (t) => c(t.progress),
    })
  );
};
export const achievementCardTilt = function (t, r) {
  let n = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (x() || !n) return () => {};
  let i = Animation.gsap.quickTo(t, "rotationX", {
      duration: 0.4,
      ease: "power2.out",
    }),
    s = Animation.gsap.quickTo(t, "rotationY", {
      duration: 0.4,
      ease: "power2.out",
    }),
    o = (t) => Math.max(-1, Math.min(1, t)),
    l = (e) => {
      let r = t.getBoundingClientRect(),
        n = o((e.clientX - (r.left + r.width / 2)) / (r.width / 2)),
        l = o((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
      (s(n * a.tiltMax), i(-l * a.tiltMax));
    },
    u = () => {
      (i(0), s(0));
    };
  return (
    r.addEventListener("mousemove", l),
    r.addEventListener("mouseleave", u),
    () => {
      (r.removeEventListener("mousemove", l),
        r.removeEventListener("mouseleave", u));
    }
  );
};
export const achievementModalIn = function (t, r, n) {
  let o = Animation.gsap.utils.toArray(n);
  return x()
    ? (Animation.gsap.set(t, {
        opacity: 1,
      }),
      Animation.gsap.set(r, {
        opacity: 1,
        scale: 1,
      }),
      Animation.gsap.set(o, {
        opacity: 0,
      }),
      Animation.gsap.timeline())
    : Animation.gsap
        .timeline()
        .fromTo(
          t,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.22,
            ease: "power2.out",
          },
        )
        .fromTo(
          r,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: s.modalPanel,
            ease: i.modalPop,
          },
          0.04,
        )
        .to(
          o,
          {
            opacity: 0,
            duration: 0.25,
            ease: "steps(1)",
            stagger: {
              each: a.pixelBlockEach,
              from: "random",
            },
          },
          0.16,
        );
};
export const achievementModalOut = function (t, r, n) {
  if (x()) return n();
  Animation.gsap
    .timeline({
      onComplete: n,
    })
    .to(
      r,
      {
        opacity: 0,
        scale: 0.85,
        duration: 0.18,
        ease: "power2.in",
      },
      0,
    )
    .to(
      t,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      0,
    );
};
export const achievementsGridIntro = function (t) {
  let r = Animation.gsap.utils.toArray(t);
  if (!r.length) return Animation.gsap.timeline();
  if (x())
    return Animation.gsap.set(r, {
      opacity: 1,
      clipPath: "none",
    });
  let n = r.map((t) => t.offsetTop),
    o = Math.max(...n, 1);
  return Animation.gsap.fromTo(
    r,
    {
      opacity: 0,
      clipPath: "inset(0% 0% 100% 0%)",
    },
    {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: s.achieveIntro,
      ease: i.achievePixel,
      stagger: (t) => (n[t] / o) * a.introSweep + Math.random() * a.introJitter,
      onComplete: () =>
        Animation.gsap.set(r, {
          clipPath: "none",
        }),
    },
  );
};
export const achievementsIdleWarp = function (t) {
  return x()
    ? Animation.gsap.timeline()
    : Animation.gsap.to(t, {
        y: `+=${a.idleAmp}`,
        rotation: a.idleRotate,
        duration: s.achieveIdle,
        ease: i.ghost,
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.25,
          from: "random",
        },
      });
};
export const achievementsPanWarp = function (t, r, i) {
  let s = x(),
    o = i(),
    l = {
      px: o.maxX,
      py: o.maxY,
      tx: o.maxX,
      ty: o.maxY,
    };
  Animation.gsap.set(r, {
    x: l.px,
    y: l.py,
  });
  let u = (t, e) => Math.max(-e, Math.min(e, t)),
    c = (t, e) =>
      s
        ? u(t, e)
        : t > e
          ? e + (t - e) * a.edgeResist
          : t < -e
            ? -e + (t + e) * a.edgeResist
            : t,
    h = (t) => {
      let { maxX: e, maxY: r } = i();
      ((l.tx = t ? u(l.tx, e) : c(l.tx, e)),
        (l.ty = t ? u(l.ty, r) : c(l.ty, r)));
    },
    f = 0,
    p = -1,
    d = () => {
      f = 0;
    },
    g = Animation.Observer.create({
      target: t,
      type: "wheel,touch,pointer",
      dragMinimum: 2,
      tolerance: 4,
      preventDefault: true,
      onWheel: (t) => {
        (d(),
          (l.tx -= t.deltaX * a.panFactor),
          (l.ty -= t.deltaY * a.panFactor),
          h(false));
      },
      onDrag: (t) => {
        (d(),
          (l.tx += t.deltaX * a.panFactor),
          (l.ty += t.deltaY * a.panFactor),
          h(false));
      },
      onPress: d,
      onDragEnd: () => h(true),
      onStop: () => h(true),
    }),
    m = () => {
      if (!s && ++f > a.idleScrollFrames) {
        let { maxY: t } = i();
        ((l.ty += a.idleScrollSpeed * p),
          l.ty <= -t
            ? ((l.ty = -t), (p = 1))
            : l.ty >= t && ((l.ty = t), (p = -1)));
      }
      let t = s ? 1 : a.panLerp,
        n = l.px + (l.tx - l.px) * t,
        o = l.py + (l.ty - l.py) * t,
        u = n - l.px,
        c = o - l.py;
      if (((l.px = n), (l.py = o), s))
        Animation.gsap.set(r, {
          x: n,
          y: o,
        });
      else {
        let t = 1 - Math.min(Math.hypot(u, c) * a.convergeScale, a.convergeMax);
        Animation.gsap.set(r, {
          x: n,
          y: o,
          scale: t,
        });
      }
    };
  return (
    Animation.gsap.ticker.add(m),
    () => {
      (g.kill(), Animation.gsap.ticker.remove(m));
    }
  );
};
export const armBreathe = function (t) {
  return x()
    ? Animation.gsap.to(
        {},
        {
          duration: 0,
        },
      )
    : Animation.gsap.to(t, {
        phase: 1,
        duration: l.cycle,
        ease: "none",
        repeat: -1,
      });
};
export const careerLineDraw = function (t, r, n) {
  if (x()) return void r(1);
  r(0);
  let s = {
    p: 0,
  };
  return Animation.gsap.to(s, {
    p: 1,
    ease: i.linear,
    scrollTrigger: {
      trigger: t,
      start: y.start,
      ...(n
        ? {
            endTrigger: n,
            end: y.endAtCard,
          }
        : {
            end: y.end,
          }),
      scrub: y.scrub,
    },
    onUpdate: () => r(s.p),
  });
};
export const cursorChase = function (t, r = _.ease) {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
    return () => {};
  let n = x(),
    i = n ? 1 : r,
    s = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
    a = {
      x: s.x,
      y: s.y,
    },
    o = 0,
    l = false,
    u = 1,
    c = (t) => {
      ((s.x = t.clientX), (s.y = t.clientY), (l = true));
    },
    h = (e, r) => {
      if (((a.x += (s.x - a.x) * i), (a.y += (s.y - a.y) * i), n))
        return void t(a.x, a.y, 1);
      l ? ((o = 0), (l = false)) : (o += r);
      let c = o > _.idleDelay ? 0 : 1;
      ((u += (c - u) * (c > u ? _.fadeIn : _.fadeOut)), t(a.x, a.y, u));
    };
  return (
    window.addEventListener("mousemove", c),
    Animation.gsap.ticker.add(h),
    () => {
      (window.removeEventListener("mousemove", c),
        Animation.gsap.ticker.remove(h));
    }
  );
};
export const floatLoop = function (t, r = 8) {
  return x()
    ? Animation.gsap.timeline()
    : Animation.gsap.to(t, {
        y: `-=${r}`,
        duration: s.ghostHold,
        ease: i.ghost,
        yoyo: true,
        repeat: -1,
        stagger: 0.6,
      });
};
export const headPointerTilt = function (
  t,
  { maxDeg: r = 12, lerp: n = 0.08, onUpdate: i } = {},
) {
  let s = t ? Animation.gsap.quickSetter(t, "rotationX", "deg") : null,
    a = t ? Animation.gsap.quickSetter(t, "rotationY", "deg") : null,
    o = (t, e) => {
      (s?.(t), a?.(e), i?.(t, e));
    };
  (t &&
    Animation.gsap.set(t, {
      rotationX: 0,
      rotationY: 0,
      transformPerspective: 600,
    }),
    o(0, 0));
  let l = window.matchMedia("(pointer: fine)").matches;
  if (x() || !l) return () => {};
  let u = {
      x: 0,
      y: 0,
    },
    c = {
      x: 0,
      y: 0,
    },
    h = (t) => {
      let e = (t.clientX / window.innerWidth) * 2 - 1,
        n = (t.clientY / window.innerHeight) * 2 - 1;
      ((u.y = e * r), (u.x = n * r));
    },
    f = () => {
      ((c.x += (u.x - c.x) * n), (c.y += (u.y - c.y) * n), o(c.x, c.y));
    };
  return (
    window.addEventListener("mousemove", h),
    Animation.gsap.ticker.add(f),
    () => {
      (window.removeEventListener("mousemove", h),
        Animation.gsap.ticker.remove(f));
    }
  );
};
export const headScanIn = function (t) {
  return x()
    ? ((t.v = 1),
      Animation.gsap.to(
        {},
        {
          duration: 0,
        },
      ))
    : Animation.gsap.fromTo(
        t,
        {
          v: 0,
        },
        {
          v: 1,
          duration: p.duration,
          ease: p.ease,
        },
      );
};
export const headScanOut = function (t) {
  return (Animation.gsap.killTweensOf(t), x())
    ? ((t.v = 0),
      Animation.gsap.to(
        {},
        {
          duration: 0,
        },
      ))
    : Animation.gsap.to(t, {
        v: 0,
        duration: p.duration,
        ease: p.ease,
      });
};
export const idlePoseSwap = function (t, r) {
  let n = Animation.gsap.timeline({
    repeat: -1,
    repeatDelay: s.crossfadeHold,
  });
  return (
    x() ||
      n
        .to(
          t,
          {
            opacity: 0,
            duration: s.crossfade,
            ease: i.crossfade,
          },
          0,
        )
        .to(
          r,
          {
            opacity: 1,
            duration: s.crossfade,
            ease: i.crossfade,
          },
          0,
        )
        .to(
          t,
          {
            opacity: 1,
            duration: s.crossfade,
            ease: i.crossfade,
          },
          "+=" + s.crossfadeHold,
        )
        .to(
          r,
          {
            opacity: 0,
            duration: s.crossfade,
            ease: i.crossfade,
          },
          "<",
        ),
    n
  );
};
export const liquidFillTimeline = function (t) {
  let { fill: r, label: n, from: i, to: s } = t;
  Animation.gsap.set(r, i);
  let a = Animation.gsap.timeline({
    paused: true,
  });
  return (
    a
      .to(
        r,
        {
          ...s,
          duration: f.fill,
          ease: f.ease,
        },
        0,
      )
      .to(
        n,
        {
          color: f.textOn,
          duration: f.labelFade,
          ease: f.ease,
        },
        0,
      ),
    a
  );
};
export const marqueeLoop = function (t, r = 20) {
  return x()
    ? Animation.gsap.timeline()
    : Animation.gsap.to(t, {
        xPercent: -50,
        duration: r,
        ease: "none",
        repeat: -1,
      });
};
export const marqueeRowFocus = function (t, r) {
  if (x()) return Animation.gsap.set(t, T);
  let n = Animation.gsap.timeline({
    scrollTrigger: {
      trigger: r ?? t,
      start: "top 80%",
      end: "bottom 20%",
      scrub: m.marquee,
    },
  });
  return (
    n
      .fromTo(t, b, {
        ...T,
        duration: s.marqueeRow,
        ease: i.marquee,
        immediateRender: false,
      })
      .to(
        t,
        {
          ...b,
          duration: s.marqueeRow,
          ease: i.marquee,
        },
        `+=${1.33 * s.marqueeRow}`,
      ),
    n
  );
};
export const navIntro = function (t, r = 20, n = {}) {
  if (x())
    return Animation.gsap.set(t, {
      opacity: 1,
      y: 0,
    });
  let a = Animation.gsap.utils.toArray(t),
    o = Animation.gsap.fromTo(
      a,
      {
        opacity: 0,
        y: r,
      },
      {
        opacity: 1,
        y: 0,
        duration: s.navIntro,
        ease: i.navIntro,
        stagger: g.nav,
        ...n,
      },
    );
  return (w(a, g.nav, n.delay ?? 0), o);
};
export const pixelRevealCoverInstant = function (t) {
  Animation.gsap.set(t, {
    opacity: 1,
    scale: 1,
  });
};
export const pixelRevealOut = function (t, r, n) {
  let i = Animation.gsap.utils.toArray(t);
  return x()
    ? (Animation.gsap.set(i, {
        opacity: 0,
      }),
      n?.(),
      Animation.gsap.timeline())
    : Animation.gsap.to(i, {
        opacity: 0,
        scale: u.cellScale,
        duration: u.cellDuration,
        ease: u.ease,
        transformOrigin: "center center",
        stagger: (t) =>
          Math.floor(t / r) * u.rowStagger + Math.random() * u.jitter,
        onComplete: n,
      });
};
export const pixelScrubReveal = function (t) {
  let { windowEl: n, cells: i, cols: s, rows: a } = t;
  if (x())
    return (
      Animation.gsap.set(i, {
        opacity: 0,
      }),
      null
    );
  let { band: o, jitter: l, cellScale: u, coverScale: h } = c,
    f = i.map((t, e) => {
      let r =
        (a > 1 ? Math.floor(e / s) / (a - 1) : 0) + (Math.random() - 0.5) * l;
      return r < 0 ? 0 : r > 1 ? 1 : r;
    }),
    p = (t) => {
      for (let e = 0; e < i.length; e++) {
        let r = 1 - Math.abs(f[e] - t) / o;
        r = (r = r < 0 ? 0 : r > 1 ? 1 : r) * r * (3 - 2 * r);
        let n = i[e];
        ((n.style.opacity = String(1 - r)),
          (n.style.transform = `scale(${h - (h - u) * r})`));
      }
    },
    d = (t) => -o + t * (1 + 2 * o);
  return (
    p(d(0)),
    Animation.ScrollTrigger.create({
      trigger: n,
      start: "center center",
      end: c.runway,
      pin: n,
      scrub: true,
      onUpdate: (t) => p(d(t.progress)),
    })
  );
};
export { x as prefersReducedMotion };
export const scrambleText = function (t, r) {
  if (x())
    return (
      (t.textContent = r),
      Animation.gsap.to(
        {},
        {
          duration: 0,
        },
      )
    );
  let n = r.split(""),
    i = n.length,
    s = (t) => " " === t || " " === t,
    a = n.map((t, e) =>
      s(t)
        ? 0
        : Math.min(
            1,
            (e / Math.max(i - 1, 1)) * d.sweep + Math.random() * d.jitter,
          ),
    ),
    o = n.slice(),
    l = Math.max(1, Math.round(60 / d.glyphFps)),
    u = 0,
    c = (t) =>
      /[A-Z]/.test(t)
        ? d.upper[(26 * Math.random()) | 0]
        : /[a-z]/.test(t)
          ? d.lower[(26 * Math.random()) | 0]
          : /[0-9]/.test(t)
            ? d.digits[(10 * Math.random()) | 0]
            : t,
    h = {
      p: 0,
    };
  return Animation.gsap.to(h, {
    p: 1,
    duration: d.duration,
    ease: "none",
    onUpdate: () => {
      let e = u % l == 0;
      u++;
      let r = "";
      for (let t = 0; t < i; t++) {
        let i = n[t];
        s(i) || h.p >= a[t] ? (r += i) : (e && (o[t] = c(i)), (r += o[t]));
      }
      t.textContent = r;
    },
    onComplete: () => {
      t.textContent = r;
    },
  });
};
export const scrollReveal = function (
  t,
  r = {
    y: 24,
  },
  n = v.overview,
) {
  if (x())
    return Animation.gsap.set(t, {
      opacity: 1,
      x: 0,
      y: 0,
    });
  let a = Animation.gsap.utils.toArray(t);
  return Animation.gsap.fromTo(
    a,
    {
      opacity: 0,
      x: r.x ?? 0,
      y: r.y ?? 0,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: s.reveal,
      ease: i.reveal,
      stagger: g.reveal,
      scrollTrigger: {
        trigger: a[0] ?? t,
        start: n,
        toggleActions: "play none none none",
        onEnter: () => w(a, g.reveal),
      },
    },
  );
};
export const styleShift = function (t) {
  if (x()) return Animation.gsap.timeline();
  let r = Animation.gsap.timeline({
      repeat: -1,
    }),
    n = (e) =>
      e.forEach((n, i) =>
        r.to(t, {
          v: n,
          duration: o.beat,
          ease: i === e.length - 1 ? "power2.out" : "steps(1)",
        }),
      );
  return (
    n([0.55, 0.2, 0.8, 0.4, 1]),
    r.to(t, {
      v: 1,
      duration: o.hold,
    }),
    n([0.45, 0.8, 0.15, 0.6, 0]),
    r.to(t, {
      v: 0,
      duration: o.hold,
    }),
    r
  );
};
export const thumbRailSwap = function (t, r) {
  let n = Animation.gsap.timeline();
  return (
    n
      .to(
        t,
        {
          y: -20,
          opacity: 0,
          duration: s.thumbSwap,
          ease: i.thumbOut,
        },
        0,
      )
      .fromTo(
        r,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: s.thumbSwap,
          ease: i.thumbIn,
          stagger: g.thumb,
        },
        0,
      ),
    n
  );
};

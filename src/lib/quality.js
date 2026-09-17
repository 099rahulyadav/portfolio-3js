"use client";

let t = null;
export const FPS_FLOOR = 45;
export const QUALITY = {
  high: {
    maxDpr: 2,
    minDpr: 1,
    antialias: true,
    particleScale: 1,
    glow: true,
  },
  mid: {
    maxDpr: 1.5,
    minDpr: 0.85,
    antialias: true,
    particleScale: 0.65,
    glow: true,
  },
  low: {
    maxDpr: 1,
    minDpr: 0.6,
    antialias: false,
    particleScale: 0.4,
    glow: false,
  },
};
export const detectQualityTier = function () {
  let e;
  if (t) return t;
  if ("u" < typeof navigator) return "high";
  let r = navigator.hardwareConcurrency ?? 8,
    n = navigator.deviceMemory,
    i = (function () {
      try {
        let e = document.createElement("canvas"),
          t = e.getContext("webgl") || e.getContext("experimental-webgl");
        if (!t) return "";
        let r = t.getExtension("WEBGL_debug_renderer_info"),
          n = r
            ? t.getParameter(r.UNMASKED_RENDERER_WEBGL)
            : t.getParameter(t.RENDERER);
        return (
          t.getExtension("WEBGL_lose_context")?.loseContext(),
          (n || "").toLowerCase()
        );
      } catch {
        return "";
      }
    })(),
    a =
      /intel/.test(i) &&
      /(gma|hd graphics (2|3|4|5)0{2}|uhd graphics 6)/.test(i);
  return (
    (t = e =
      /swiftshader|llvmpipe|software|basic render|microsoft basic/.test(i) ||
      r <= 2 ||
      (void 0 !== n && n <= 2)
        ? "low"
        : r <= 4 || (void 0 !== n && n <= 4) || a
          ? "mid"
          : "high"),
    e
  );
};

"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as Motion from "@/lib/motion";
import * as Quality from "@/lib/quality";
export const SpaceTimeFabric = function () {
  let r = React.useRef(null),
    [o, l] = React.useState(null),
    h = React.useMemo(() => Motion.prefersReducedMotion(), []),
    [c, d] = React.useState(false);
  return (
    React.useEffect(() => {
      let e = window.matchMedia("(min-width: 1024px)"),
        t = () => d(e.matches);
      return (
        t(),
        e.addEventListener("change", t),
        () => e.removeEventListener("change", t)
      );
    }, []),
    React.useEffect(() => l(Quality.detectQualityTier()), []),
    React.useEffect(() => {
      if (null === o || "low" === o || !c) return;
      let t = r.current;
      if (!t) return;
      let a = false,
        s = () => {};
      return (
        (async () => {
          let r = await import("three"),
            { EffectComposer: l } =
              await import("three/addons/postprocessing/EffectComposer.js"),
            { RenderPass: c } =
              await import("three/addons/postprocessing/RenderPass.js"),
            { UnrealBloomPass: d } =
              await import("three/addons/postprocessing/UnrealBloomPass.js");
          if (a) return;
          let m =
              "high" === o
                ? Math.round(1.25 * Motion.SWARM_COUNT)
                : Math.round(0.8 * Motion.SWARM_COUNT),
            u = Math.min(
              window.devicePixelRatio || 1,
              Quality.QUALITY[o].maxDpr,
            ),
            p = () => ({
              w: Math.max(1, t.clientWidth),
              h: Math.max(1, t.clientHeight),
            }),
            { w: M, h: w } = p(),
            f = new r.Scene();
          f.fog = new r.FogExp2(0, 0.006);
          let x = new r.PerspectiveCamera(60, M / w, 0.1, 2e3);
          x.position.set(0, 0, 100);
          let b = new r.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          });
          (b.setPixelRatio(u),
            b.setSize(M, w),
            (b.domElement.style.width = "100%"),
            (b.domElement.style.height = "100%"),
            (b.domElement.style.display = "block"),
            t.appendChild(b.domElement));
          let v = new l(b);
          (v.setPixelRatio(u), v.setSize(M, w), v.addPass(new c(f, x)));
          let g = new d(new r.Vector2(M, w), 1.5, 0.4, 0.85);
          ((g.strength = 1.35),
            (g.radius = 0.32),
            (g.threshold = 0.05),
            v.addPass(g));
          let A = new r.Object3D(),
            y = new r.Color(),
            C = new r.Vector3(),
            P = new r.ConeGeometry(0.1, 0.5, 4).rotateX(Math.PI / 2),
            j = new r.MeshBasicMaterial({
              color: 0xffffff,
            }),
            E = new r.InstancedMesh(P, j, m);
          (E.instanceMatrix.setUsage(r.DynamicDrawUsage), f.add(E));
          let k = new Float32Array(m),
            S = new Float32Array(m),
            R = [];
          for (let e = 0; e < m; e++) {
            let t = (43758.5453 * Math.sin(12.9898 * e)) % 1,
              a = (12345.6789 * Math.sin(78.233 * e)) % 1;
            ((k[e] = (2 * t - 1) * 135),
              (S[e] = (2 * a - 1) * 135),
              R.push(
                new r.Vector3(
                  (Math.random() - 0.5) * 100,
                  (Math.random() - 0.5) * 100,
                  (Math.random() - 0.5) * 100,
                ),
              ),
              E.setColorAt(e, y.setHex(0xffffff)));
          }
          let T = new r.Clock(),
            U = !h,
            F = (e) => {
              let t = e ? 0 : T.getElapsedTime();
              E.rotation.y = 0.12 * t;
              let a = 0.85 * t,
                s = 135 * Math.sin(0.3 * a) * 0.4,
                n = 135 * Math.cos(0.2 * a) * 0.4,
                i = 135 * Math.sin(0.5 * a + 2) * 0.3,
                r = 135 * Math.cos(0.4 * a + 1) * 0.3;
              for (let t = 0; t < m; t++) {
                let o = k[t],
                  l = S[t],
                  h =
                    (Math.sin(0.02 * o * 2.2 + a) +
                      Math.sin(0.02 * l * 2.2 - 0.8 * a)) *
                    6,
                  c = o - s,
                  d = l - n,
                  m = o - i,
                  u = l - r,
                  p = -7 / Math.sqrt(c * c + d * d + 4),
                  M = -7 / Math.sqrt(m * m + u * u + 4);
                h += p + M;
                let w = 1.3 * (p - M),
                  f = Math.cos(w),
                  x = Math.sin(w),
                  b = o * f - l * x,
                  v = o * x + l * f;
                C.set(b, v, h);
                let g = Math.min(0.5 + 0.5 * Math.min(Math.abs(h) / 10, 1), 1);
                (y.setHSL(0.58, 0.14, g),
                  e ? R[t].copy(C) : R[t].lerp(C, 0.1),
                  A.position.copy(R[t]),
                  A.updateMatrix(),
                  E.setMatrixAt(t, A.matrix),
                  E.setColorAt(t, y));
              }
              ((E.instanceMatrix.needsUpdate = true),
                E.instanceColor && (E.instanceColor.needsUpdate = true),
                v.render());
            },
            O = new ResizeObserver(() => {
              let e = p();
              ((M = e.w),
                (w = e.h),
                (x.aspect = M / w),
                x.updateProjectionMatrix(),
                b.setSize(M, w),
                v.setSize(M, w),
                U || F(true));
            });
          O.observe(t);
          let L = 0,
            q = false,
            z = null;
          if (U) {
            let e = () => {
                (F(false), (L = requestAnimationFrame(e)));
              },
              a = () => {
                q || ((q = true), (L = requestAnimationFrame(e)));
              };
            ((z = new IntersectionObserver(
              ([e]) =>
                e.isIntersecting
                  ? a()
                  : void ((q = false), cancelAnimationFrame(L)),
              {
                threshold: 0,
              },
            )).observe(t),
              a());
          } else F(true);
          s = () => {
            (cancelAnimationFrame(L),
              z?.disconnect(),
              O.disconnect(),
              P.dispose(),
              j.dispose(),
              g.dispose(),
              v.dispose(),
              b.forceContextLoss(),
              b.dispose(),
              b.domElement.parentNode === t && t.removeChild(b.domElement));
          };
        })(),
        () => {
          ((a = true), s());
        }
      );
    }, [o, h, c]),
    (<div ref={r} aria-hidden={true} className={"h-full w-full"} />)
  );
};

"use client";

import {
  Canvas as Canvas,
  useFrame as useFrame,
  useThree as useThree,
} from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as THREE from "three";
import * as Motion from "@/lib/motion";
import * as IntroState from "@/lib/intro-state";
import * as HeadScanProvider from "@/components/layout/head-scan-provider";
import * as Quality from "@/lib/quality";
let t6 = `
  uniform float uArmPhase;       // 0..1 normalized breathe phase (right arm)
  uniform float uArmAmp;         // peak sway angle, radians (0 = disabled)
  uniform float uArmPhaseOffset; // left arm's phase lag (fraction of a cycle)
  const float ARM_X_INNER = 0.40; // torso edge — below this |x|, no sway
  const float ARM_X_OUTER = 0.52; // fully arm past this |x|
  const float ARM_Y_TOP   = 0.24; // shoulder line — above this y, no sway
  const float ARM_Y_BODY  = 0.05; // fully swung below this y
  const float ARM_PIVOT_X = 0.48; // shoulder-joint |x|
  const float ARM_PIVOT_Y = 0.22; // shoulder-joint y
  vec3 applyArmBreathe(vec3 p) {
    if (uArmAmp <= 0.0) return p;             // disabled: icosahedron / reduced motion
    float side = sign(p.x);                   // -1 left arm, +1 right arm
    float sideW  = smoothstep(ARM_X_INNER, ARM_X_OUTER, abs(p.x));
    float belowW = 1.0 - smoothstep(ARM_Y_BODY, ARM_Y_TOP, p.y);
    float w = sideW * belowW;                 // 0 on torso/head/legs, 1 on the lower arm
    if (w <= 0.0) return p;
    float ph = uArmPhase + (side < 0.0 ? uArmPhaseOffset : 0.0);
    float angle = uArmAmp * sin(ph * 6.2831853);
    vec2 pivot = vec2(ARM_PIVOT_X * side, ARM_PIVOT_Y);
    vec2 rel = p.xy - pivot;                   // pendulum swing in the XY plane
    float s = sin(angle), c = cos(angle);
    vec2 rotated = vec2(c * rel.x - s * rel.y, s * rel.x + c * rel.y);
    p.xy = mix(p.xy, pivot + rotated, w);      // shoulder stays put; hand swings most
    return p;
  }
`,
  t5 = THREE.MathUtils.degToRad(Motion.ARM_BREATHE.swayDeg),
  t7 = `
  uniform float uScan;    // 0 = nothing revealed → 1 = fully revealed
  varying float vReveal;  // 0..1 reveal alpha
  varying float vRim;     // bright leading-edge glow at the sweep line
  const float SCAN_TOP  =  1.08; // model-local y just above the head
  const float SCAN_BOT  = -1.08; // just below the feet
  const float SCAN_BAND =  0.12; // reveal softness at the line
  const float SCAN_RIM  =  0.05; // rim half-thickness
  void computeScan(vec3 p) {
    if (uScan >= 1.0) { vReveal = 1.0; vRim = 0.0; return; }
    // A top-anchored line; everything ABOVE it is revealed. Intro tweens uScan
    // 0→1 so the line descends and the model builds TOP→BOTTOM; the exit tweens
    // it 1→0 so the same line RISES and erases the model bottom→top — a mirror.
    float scanY = mix(SCAN_TOP, SCAN_BOT, uScan);
    vReveal = smoothstep(scanY, scanY + SCAN_BAND, p.y);
    vRim = 1.0 - smoothstep(0.0, SCAN_RIM, abs(p.y - scanY));
  }
`,
  ne = `
  ${t6}
  ${t7}
  void main() {
    computeScan(position); // reveal + rim from the original model y
    vec3 armPos = applyArmBreathe(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(armPos, 1.0);
  }
`,
  nt = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vReveal;
  varying float vRim;
  void main() {
    float a = uOpacity * clamp(vReveal + vRim, 0.0, 1.0); // hide below the sweep; rim lifts the edge
    if (a <= 0.001) discard;
    vec3 col = mix(uColor, vec3(1.0), vRim * 0.9); // bright white leading edge
    gl_FragColor = vec4(col, a);
  }
`;
function nn(e, t) {
  e &&
    (e instanceof THREE.ShaderMaterial
      ? (e.uniforms.uOpacity.value = t)
      : (e.opacity = t));
}
function nr(e, t, n) {
  if (!(e instanceof THREE.ShaderMaterial)) return;
  let { uArmAmp: r, uArmPhase: a } = e.uniforms;
  r && a && ((r.value = t), (a.value = n));
}
function na(e, t) {
  if (!(e instanceof THREE.ShaderMaterial)) return;
  let n = e.uniforms.uScan;
  n && (n.value = t);
}
let nl = `
  varying vec3 vViewNormal;
  varying vec3 vViewPos;
  ${t6}
  ${t7}
  void main() {
    // Same top→bottom (in) / bottom→top (out) reveal the crease lines use, so
    // the halftone style disappears on scan-out too rather than staying visible.
    computeScan(position);
    // Swing the lower-arm vertices from the shoulder before shading (robot only;
    // a no-op when uArmAmp is 0). Normals are left unrotated — the sway is a few
    // degrees, so the lighting shift is imperceptible.
    vec3 armPos = applyArmBreathe(position);
    vec4 mvPos = modelViewMatrix * vec4(armPos, 1.0);
    vViewPos = mvPos.xyz;
    vViewNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPos;
  }
`,
  ni = `
  uniform float uOpacity;
  uniform float uDotSize;
  uniform vec3 uLightDir;
  varying vec3 vViewNormal;
  varying vec3 vViewPos;
  varying float vReveal; // 0..1 scan reveal (hidden below the sweep line)
  varying float vRim;    // bright leading edge at the sweep line
  void main() {
    // Gate the whole style by the scan reveal so it hides on scan-out; discard
    // below the line (also skips depth-writing invisible fragments).
    float a = uOpacity * clamp(vReveal + vRim, 0.0, 1.0);
    if (a <= 0.001) discard;
    vec3 N = normalize(vViewNormal);
    vec3 L = normalize(uLightDir);
    vec3 V = normalize(-vViewPos);        // fragment → camera (view space)
    vec3 H = normalize(L + V);
    float diff = clamp(dot(N, L), 0.0, 1.0);
    float spec = pow(clamp(dot(N, H), 0.0, 1.0), 22.0); // tight highlight sweep
    float lum = diff * 0.95 + spec * 0.75;              // NO ambient — backs stay dark
    // Strong tonal remap, then a STEEP luminance→dot-size curve (lum^2): mid/low
    // luminance falls off fast toward dot size 0, so only genuinely lit surfaces
    // (highlights, the front sweep) show dots; shadow/back regions go sparse/black.
    lum = smoothstep(0.08, 0.9, lum);
    float radius = pow(lum, 2.0) * 1.4; // highlights → full, shadows → ~0
    vec2 cell = mod(gl_FragCoord.xy, uDotSize) / uDotSize - 0.5;
    float dist = length(cell) * 2.0;
    float coverage = 1.0 - smoothstep(radius - 0.08, radius + 0.08, dist);
    coverage *= smoothstep(0.03, 0.12, radius);
    // Opaque form: dots are white, gaps are flat BLACK (not discarded), so nothing
    // behind the front surface bleeds through the negative space between dots. The
    // whole mesh fades via uOpacity for the style crossfade; depthWrite (on the
    // material) makes the nearest front surface self-occlude everything deeper.
    // A bright white leading edge lifts the sweep line during scan in/out.
    vec3 col = mix(vec3(coverage), vec3(1.0), vRim * 0.85);
    gl_FragColor = vec4(col, a);
  }
`,
  no = `
  uniform float uTime;
  uniform vec2 uCursor;    // cursor mapped to world XY on the plane (far off when idle)
  uniform float uRepel;    // repulsion strength (world units)
  attribute float aSeed;
  attribute float aDepth;
  varying float vSeed;
  void main() {
    vSeed = aSeed;
    vec3 p = position;
    // slow ambient wave in loose rows
    p.y += sin(p.x * 0.6 + uTime * 0.55 + aSeed * 6.2831) * 0.13;
    p.x += cos(p.y * 0.5 + uTime * 0.4 + aSeed * 6.2831) * 0.07;
    // cursor repulsion — push away from the pointer with a local falloff, so it
    // reads as the cursor repelling the particles.
    vec2 away = p.xy - uCursor;
    float d = length(away);
    float f = max(0.0, 1.0 - d / 1.8);
    f = f * f;
    p.xy += normalize(away + 1e-3) * f * uRepel * (0.6 + aDepth * 0.4);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = 4.0 + aDepth * 6.0; // chunkier → more pixelated squares
  }
`,
  ns = `
  uniform float uOpacity;
  varying float vSeed;
  void main() {
    if (uOpacity <= 0.001) discard;
    float b = 0.6 + vSeed * 0.4;                          // grayscale, black & white
    gl_FragColor = vec4(vec3(b), uOpacity * (0.14 + vSeed * 0.26)); // subtle
  }
`,
  nu = [
    [-0.12, 0.4],
    [0.12, 0.4],
  ],
  nc = [0.2, 0.35, 0],
  nd = [0, 0, 0],
  nf = {
    colorA: "#d4d4d8",
    colorB: "#d4d4d8",
    additive: false,
    renderAs: "wireframe",
  },
  np = {
    colorA: "#dedede",
    colorB: "#dedede",
    additive: true,
    renderAs: "lines",
  };
function ScanParticles({ styleMix: e, scan: t, reduce: n, particleScale: r = 1 }) {
  let a = React.useRef(null),
    l = React.useRef(null),
    i = React.useMemo(
      () =>
        (function (e = 1) {
          let t = Math.max(2, Math.round(29 * e)),
            n = Math.max(2, Math.round(18 * e)),
            r = [],
            a = [],
            l = [];
          for (let e = 0; e < n; e++)
            for (let i = 0; i < t; i++)
              (r.push(
                (i / (t - 1) - 0.5) * 15 + (Math.random() - 0.5) * 0.18,
                (e / (n - 1) - 0.5) * 9 + (Math.random() - 0.5) * 0.14,
                -2.2 - 1.6 * Math.random(),
              ),
                a.push(Math.random()),
                l.push(Math.random()));
          let i = new THREE.BufferGeometry();
          return (
            i.setAttribute(
              "position",
              new THREE.BufferAttribute(new Float32Array(r), 3),
            ),
            i.setAttribute(
              "aSeed",
              new THREE.BufferAttribute(new Float32Array(a), 1),
            ),
            i.setAttribute(
              "aDepth",
              new THREE.BufferAttribute(new Float32Array(l), 1),
            ),
            i
          );
        })(r),
      [r],
    );
  React.useEffect(() => () => i.dispose(), [i]);
  let o = React.useMemo(
      () => ({
        uTime: {
          value: 0,
        },
        uOpacity: {
          value: 0,
        },
        uCursor: {
          value: new THREE.Vector2(1e4, 1e4),
        },
        uRepel: {
          value: 0.95,
        },
      }),
      [],
    ),
    s = React.useRef({
      x: 1e4,
      y: 1e4,
    });
  return (
    React.useEffect(() => {
      let e = (e) => {
        ((s.current.x = e.clientX), (s.current.y = e.clientY));
      };
      return (
        window.addEventListener("pointermove", e),
        () => window.removeEventListener("pointermove", e)
      );
    }, []),
    useFrame((r, l) => {
      let i = a.current;
      if (!i || ((i.uniforms.uOpacity.value = e.current.v * t.current.v), n))
        return;
      i.uniforms.uTime.value += l;
      let o = r.gl.domElement.getBoundingClientRect();
      if (o.width && s.current.x < 1e4) {
        let e = ((s.current.x - o.left) / o.width) * 2 - 1,
          t = -(((s.current.y - o.top) / o.height) * 2 - 1),
          n = 5.9 / 2.9;
        i.uniforms.uCursor.value.set(
          e * r.viewport.width * 0.5 * n,
          t * r.viewport.height * 0.5 * n,
        );
      } else i.uniforms.uCursor.value.set(1e4, 1e4);
    }),
    (
      <points ref={l} geometry={i} renderOrder={-10}>
        <shaderMaterial
          ref={a}
          transparent={true}
          depthWrite={false}
          depthTest={false}
          uniforms={o}
          vertexShader={no}
          fragmentShader={ns}
        />
      </points>
    )
  );
}
function ScanModel({
  geometry: e,
  solidGeometry: t,
  scale: n = 1,
  poseA: r = nc,
  poseB: a = nc,
  style: l = nf,
  tilt: i,
  spin: o = 0,
  zoom: s = 1,
  arms: u = false,
  scanEnabled: c = false,
  scanOnReveal: d = false,
  bindExit: f,
  draggable: p = false,
  drag: h,
  onActivate: m,
  particleScale: A = 1,
}) {
  let C = React.useRef(null),
    b = React.useRef(null),
    y = React.useRef(null),
    E = React.useRef(0),
    S = React.useMemo(() => Motion.prefersReducedMotion(), []),
    { gl: M } = useThree(),
    F = React.useRef(false),
    R = React.useRef({
      x: 0,
      y: 0,
    }),
    I = React.useRef(null);
  React.useEffect(() => {
    if (!p || !h) return;
    let e = (e) => {
        if (!F.current) return;
        let t = e.clientX - R.current.x,
          n = e.clientY - R.current.y;
        ((h.current.y += 0.01 * t),
          (h.current.x = THREE.MathUtils.clamp(
            h.current.x + 0.01 * n,
            -1.2,
            1.2,
          )),
          (R.current = {
            x: e.clientX,
            y: e.clientY,
          }));
      },
      t = () => {
        ((I.current = null),
          F.current &&
            ((F.current = false), (M.domElement.style.cursor = "grab")));
      };
    return (
      window.addEventListener("pointermove", e),
      window.addEventListener("pointerup", t),
      () => {
        (window.removeEventListener("pointermove", e),
          window.removeEventListener("pointerup", t));
      }
    );
  }, [p, h, M]);
  let x = React.useCallback(
      (e) => {
        (e.stopPropagation(),
          (I.current = {
            x: e.clientX,
            y: e.clientY,
          }),
          p &&
            ((F.current = true),
            (R.current = {
              x: e.clientX,
              y: e.clientY,
            }),
            (M.domElement.style.cursor = "grabbing")));
      },
      [p, M],
    ),
    w = React.useCallback(
      (e) => {
        let t = I.current;
        ((I.current = null),
          m && t && 6 > Math.hypot(e.clientX - t.x, e.clientY - t.y) && m());
      },
      [m],
    ),
    T = React.useCallback(() => {
      p && !F.current && (M.domElement.style.cursor = "grab");
    }, [p, M]),
    G = React.useCallback(() => {
      p && !F.current && (M.domElement.style.cursor = "");
    }, [p, M]),
    D = React.useRef({
      phase: 0,
    }),
    H = React.useMemo(
      () => ({
        uArmPhase: {
          value: 0,
        },
        uArmAmp: {
          value: 0,
        },
        uArmPhaseOffset: {
          value: Motion.ARM_BREATHE.phaseOffset,
        },
      }),
      [],
    ),
    P = React.useRef({
      v: c && !S ? 0 : 1,
    }),
    k = React.useMemo(
      () => ({
        uScan: {
          value: c && !S ? 0 : 1,
        },
      }),
      [c, S],
    ),
    L = React.useRef({
      opacity: 1,
    }),
    O = React.useRef({
      opacity: 0,
    }),
    N = React.useRef({
      v: u && !S ? 1 : 0,
    }),
    J = React.useRef(null),
    _ = React.useMemo(
      () => ({
        uOpacity: {
          value: 0,
        },
        uDotSize: {
          value: 8,
        },
        uLightDir: {
          value: new THREE.Vector3(0.2, 0.85, 0.45),
        },
        ...H,
        ...k,
      }),
      [H, k],
    ),
    U = React.useMemo(
      () => ({
        uColor: {
          value: new THREE.Color(l.colorA),
        },
        uOpacity: {
          value: 1,
        },
        ...H,
        ...k,
      }),
      [H, k, l.colorA],
    ),
    j = React.useMemo(
      () => ({
        uColor: {
          value: new THREE.Color(l.colorB),
        },
        uOpacity: {
          value: 0,
        },
        ...H,
        ...k,
      }),
      [H, k, l.colorB],
    );
  (React.useEffect(() => {
    let e = Motion.idlePoseSwap(L.current, O.current),
      t = Motion.styleShift(N.current);
    return (
      c && !S && t.delay(Motion.HEAD_SCAN.duration),
      () => {
        (e.kill(), t.kill());
      }
    );
  }, [c, S]),
    React.useEffect(() => {
      if (!u || S) return;
      let e = Motion.armBreathe(D.current);
      return () => {
        e.kill();
      };
    }, [u, S]),
    React.useEffect(() => {
      if (!c || S) return;
      let e = null;
      if (d) {
        let t = IntroState.onReveal(() => {
          e = Motion.headScanIn(P.current);
        });
        return () => {
          (t(), e?.kill());
        };
      }
      return (
        (e = Motion.headScanIn(P.current)),
        () => {
          e?.kill();
        }
      );
    }, [c, S, d]),
    React.useEffect(() => {
      if (c && !S && f)
        return (
          f(
            () =>
              new Promise((e) => {
                Motion.headScanOut(P.current).eventCallback("onComplete", e);
              }),
          ),
          () => f(null)
        );
    }, [c, S, f]),
    useFrame((e, t) => {
      if (!C.current) return;
      (S || (E.current += o * t),
        h &&
          !F.current &&
          ((h.current.x -= 0.06 * h.current.x),
          (h.current.y -= 0.06 * h.current.y)));
      let n = h?.current.x ?? 0,
        r = h?.current.y ?? 0;
      ((C.current.rotation.x = THREE.MathUtils.degToRad(i.current.x) + n),
        (C.current.rotation.y =
          THREE.MathUtils.degToRad(i.current.y) + E.current + r));
      let a = N.current.v,
        l = 1 - a;
      (nn(b.current, L.current.opacity * l),
        nn(y.current, O.current.opacity * l),
        J.current && (J.current.uniforms.uOpacity.value = a));
      let s = u && !S ? t5 : 0,
        d = D.current.phase;
      if ((nr(b.current, s, d), nr(y.current, s, d), nr(J.current, s, d), c)) {
        let e = P.current.v;
        (na(b.current, e), na(y.current, e), na(J.current, e));
      }
    }));
  let K = l.additive ? THREE.AdditiveBlending : THREE.NormalBlending;
  return (
    <jsxRuntime.Fragment>
      <ScanParticles styleMix={N} scan={P} reduce={S} particleScale={A} />
      <group ref={C}>
        <Center scale={n * s}>
          <mesh
            geometry={t}
            rotation={r}
            renderOrder={2}
            onPointerDown={p || m ? x : void 0}
            onPointerUp={m ? w : void 0}
            onPointerOver={p ? T : void 0}
            onPointerOut={p ? G : void 0}
          >
            <shaderMaterial
              ref={J}
              transparent={true}
              depthWrite={true}
              depthTest={true}
              side={THREE.FrontSide}
              uniforms={_}
              vertexShader={nl}
              fragmentShader={ni}
            />
          </mesh>
          {"lines" === l.renderAs ? (
            <jsxRuntime.Fragment>
              <lineSegments geometry={e} rotation={r}>
                <shaderMaterial
                  ref={b}
                  transparent={true}
                  depthWrite={false}
                  blending={K}
                  uniforms={U}
                  vertexShader={ne}
                  fragmentShader={nt}
                />
              </lineSegments>
              <lineSegments geometry={e} rotation={a}>
                <shaderMaterial
                  ref={y}
                  transparent={true}
                  depthWrite={false}
                  blending={K}
                  uniforms={j}
                  vertexShader={ne}
                  fragmentShader={nt}
                />
              </lineSegments>
            </jsxRuntime.Fragment>
          ) : (
            <jsxRuntime.Fragment>
              <mesh geometry={e} rotation={r}>
                <shaderMaterial
                  ref={b}
                  wireframe={true}
                  transparent={true}
                  depthWrite={false}
                  blending={K}
                  uniforms={U}
                  vertexShader={ne}
                  fragmentShader={nt}
                />
              </mesh>
              <mesh geometry={e} rotation={a}>
                <shaderMaterial
                  ref={y}
                  wireframe={true}
                  transparent={true}
                  depthWrite={false}
                  blending={K}
                  uniforms={j}
                  vertexShader={ne}
                  fragmentShader={nt}
                />
              </mesh>
            </jsxRuntime.Fragment>
          )}
        </Center>
      </group>
    </jsxRuntime.Fragment>
  );
}
function IcosahedronModel({
  tilt: e,
  spin: t = 0,
  zoom: n = 1,
  scanEnabled: r = false,
  bindExit: a,
  particleScale: l = 1,
}) {
  let i = React.useMemo(() => new THREE.IcosahedronGeometry(1.1, 0), []),
    o = React.useMemo(() => {
      let e = i.toNonIndexed();
      return (e.computeVertexNormals(), e);
    }, [i]);
  return (
    React.useEffect(
      () => () => {
        (i.dispose(), o.dispose());
      },
      [i, o],
    ),
    (
      <ScanModel
        geometry={i}
        solidGeometry={o}
        tilt={e}
        spin={t}
        zoom={n}
        scanEnabled={r}
        bindExit={a}
        particleScale={l}
      />
    )
  );
}
function RobotModel({
  tilt: e,
  spin: t = 0,
  zoom: n = 1,
  scanEnabled: r = false,
  scanOnReveal: a = false,
  bindExit: l,
  draggable: i = false,
  drag: o,
  onActivate: s,
  particleScale: u = 1,
}) {
  let { scene: c } = useGLTF("/robot.glb"),
    {
      geometry: d,
      solidGeometry: f,
      scale: p,
    } = React.useMemo(() => {
      let e = null;
      if (
        (c.traverse((t) => {
          !e && t instanceof THREE.Mesh && (e = t);
        }),
        !e)
      )
        return {
          geometry: new THREE.BufferGeometry(),
          solidGeometry: new THREE.BufferGeometry(),
          scale: 1,
        };
      let t = e,
        n = t.geometry,
        r = new THREE.BufferGeometry();
      (r.setAttribute("position", n.getAttribute("position").clone()),
        n.index && r.setIndex(n.index.clone()),
        t.updateWorldMatrix(true, false),
        r.applyMatrix4(t.matrixWorld));
      let a = new THREE.EdgesGeometry(r, 15),
        l = (function (e) {
          let t = e.getAttribute("position").array,
            n = [];
          for (let e = 0; e < t.length; e += 6) {
            let r = (t[e] + t[e + 3]) / 2,
              a = (t[e + 1] + t[e + 4]) / 2,
              l = (t[e + 2] + t[e + 5]) / 2;
            if (
              !nu.some(([e, t]) => 0.09 > Math.hypot(r - e, a - t)) ||
              !(l < 0)
            )
              for (let r = 0; r < 6; r++) n.push(t[e + r]);
          }
          let r = new THREE.BufferGeometry();
          return (
            r.setAttribute(
              "position",
              new THREE.BufferAttribute(new Float32Array(n), 3),
            ),
            r
          );
        })(a);
      a.dispose();
      let i = r.toNonIndexed();
      (i.computeVertexNormals(), r.dispose(), l.computeBoundingSphere());
      let o = l.boundingSphere?.radius ?? 1;
      return {
        geometry: l,
        solidGeometry: i,
        scale: 1.1 / o,
      };
    }, [c]);
  return (
    React.useEffect(
      () => () => {
        (d.dispose(), f.dispose());
      },
      [d, f],
    ),
    (
      <ScanModel
        geometry={d}
        solidGeometry={f}
        scale={p}
        poseA={nd}
        poseB={nd}
        style={np}
        tilt={e}
        spin={t}
        zoom={n}
        arms={true}
        scanEnabled={r}
        scanOnReveal={a}
        bindExit={l}
        draggable={i}
        drag={o}
        onActivate={s}
        particleScale={u}
      />
    )
  );
}
function AdaptiveResolution({ maxDpr: e, minDpr: t }) {
  let n = useThree((e) => e.setDpr),
    r = React.useRef({
      dpr: e,
      warmup: 1.5,
      elapsed: 0,
      frames: 0,
      bad: 0,
    });
  return (
    useFrame((e, a) => {
      let l = r.current;
      if (l.warmup > 0) {
        l.warmup -= a;
        return;
      }
      if (((l.elapsed += a), (l.frames += 1), l.elapsed < 1)) return;
      let i = l.frames / l.elapsed;
      ((l.elapsed = 0),
        (l.frames = 0),
        i < Quality.FPS_FLOOR
          ? ((l.bad += 1),
            l.bad >= 2 &&
              l.dpr > t &&
              ((l.dpr = Math.max(t, l.dpr - 0.5)), n(l.dpr), (l.bad = 0)))
          : (l.bad = 0));
    }),
    null
  );
}
export const HeroHead = function ({
  shape: e = "icosahedron",
  spin: t = 0,
  zoom: n = 1,
  scan: r = false,
  draggable: a = false,
  scanOnReveal: l = false,
  onActivate: i,
}) {
  let o = React.useRef(null),
    [s, u] = React.useState(true),
    [c, d] = React.useState(null);
  React.useEffect(() => {
    d(Quality.detectQualityTier());
  }, []);
  let f = Quality.QUALITY[c ?? "high"],
    p = "robot" === e && (null === c || f.glow),
    h = "robot" === e || r,
    m = React.useRef({
      x: 0,
      y: 0,
    }),
    A = React.useRef({
      x: 0,
      y: 0,
    }),
    C = HeadScanProvider.useHeadScan(),
    b = React.useRef(null),
    v = React.useCallback((e) => {
      b.current = e;
    }, []);
  (React.useEffect(() => {
    if (!h || Motion.prefersReducedMotion()) return;
    let e = () => b.current?.() ?? Promise.resolve();
    return (C.register(e), () => C.unregister(e));
  }, [h, C]),
    React.useEffect(() => {
      let e = Motion.headPointerTilt(null, {
        onUpdate: (e, t) => {
          ((m.current.x = e), (m.current.y = t));
        },
      });
      return () => e();
    }, []));
  let y = React.useRef(null);
  return (
    React.useEffect(
      () => () => {
        let e = y.current;
        ((y.current = null),
          e &&
            setTimeout(() => {
              if (!e.domElement.isConnected) {
                try {
                  e.forceContextLoss();
                } catch {}
                e.dispose();
              }
            }, 0));
      },
      [],
    ),
    React.useEffect(() => {
      let e = o.current;
      if (!e) return;
      let t = new IntersectionObserver(([e]) => u(e.isIntersecting), {
        threshold: 0,
      });
      return (t.observe(e), () => t.disconnect());
    }, []),
    (
      <div
        ref={o}
        className={`h-full w-full ${a || i ? "pointer-events-auto" : ""} ${p ? "[filter:drop-shadow(0_0_6px_rgba(255,255,255,0.30))]" : ""}`}
      >
        {null !== c && (
          <Canvas
            frameloop={s ? "always" : "never"}
            dpr={[f.minDpr, f.maxDpr]}
            camera={{
              position: [0, 0, 2.9],
              fov: 45,
            }}
            gl={{
              antialias: f.antialias,
              alpha: true,
              powerPreference: "high-performance",
            }}
            onCreated={({ gl: e }) => {
              y.current = e;
            }}
          >
            <AdaptiveResolution maxDpr={f.maxDpr} minDpr={f.minDpr} />
            <React.Suspense fallback={null}>
              {"robot" === e ? (
                <RobotModel
                  tilt={m}
                  spin={t}
                  zoom={n}
                  scanEnabled={h}
                  scanOnReveal={l}
                  bindExit={v}
                  draggable={a}
                  drag={A}
                  onActivate={i}
                  particleScale={f.particleScale}
                />
              ) : (
                <IcosahedronModel
                  tilt={m}
                  spin={t}
                  zoom={n}
                  scanEnabled={h}
                  bindExit={v}
                  particleScale={f.particleScale}
                />
              )}
            </React.Suspense>
          </Canvas>
        )}
      </div>
    )
  );
};

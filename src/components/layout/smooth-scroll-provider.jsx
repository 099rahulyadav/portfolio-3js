"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
const SmoothScrollContext = createContext(null);
export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      autoRaf: false,
    });
    setLenis(instance);
    window.__lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      if (window.__lenis === instance) window.__lenis = null;
    };
  }, []);
  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
export const useSmoothScroll = () => useContext(SmoothScrollContext);
export const getLenis = () =>
  typeof window === "undefined" ? null : (window.__lenis ?? null);

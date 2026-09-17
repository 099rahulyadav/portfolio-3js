"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, Flip } from "@/lib/gsap";
import { INTRO, prefersReducedMotion } from "@/lib/motion";
import { claimIntro, reveal } from "@/lib/intro-state";

export function IntroPreloader() {
  const pathname = usePathname();
  const overlay = useRef(null);
  const logo = useRef(null);

  useEffect(() => {
    const animations = [];
    let started = false;
    // Schedule after Strict Mode's setup/cleanup rehearsal so a killed intro cannot block the page.
    const frame = requestAnimationFrame(() => {
      const panel = overlay.current;
      const mark = logo.current;
      if (!panel || !mark) return;
      if (!claimIntro(pathname)) {
        panel.style.display = "none";
        reveal();
        return;
      }
      started = true;
      const target = document.querySelector("[data-nav-logo]");
      if (prefersReducedMotion() || !target) {
        reveal();
        panel.style.display = "none";
        return;
      }
      animations.push(gsap.fromTo(mark,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: INTRO.reveal, ease: "power2.out" }
      ));
      animations.push(gsap.delayedCall(INTRO.reveal + INTRO.hold, () => {
        animations.push(Flip.fit(mark, target, { duration: INTRO.dock, ease: INTRO.ease, scale: true }));
        animations.push(gsap.to(panel, {
          backgroundColor: "rgba(0,0,0,0)", duration: INTRO.fade,
          ease: "power2.inOut", delay: INTRO.dock * 0.45, onStart: reveal,
        }));
        animations.push(gsap.to(mark, {
          autoAlpha: 0, duration: 0.25, delay: INTRO.dock - 0.05,
          onComplete: () => { panel.style.display = "none"; },
        }));
      }));
    });
    return () => {
      cancelAnimationFrame(frame);
      animations.forEach((animation) => animation?.kill());
      if (started) reveal();
    };
  }, [pathname]);

  return <div ref={overlay} aria-hidden="true" className="fixed inset-0 z-[120] grid place-items-center bg-black">
    <img ref={logo} src="/rahul-logo.svg" alt="" className="h-[min(64vmin,36rem)] w-[min(64vmin,36rem)] object-contain" style={{ clipPath: "inset(0 0 100% 0)", willChange: "clip-path, transform" }} />
  </div>;
}

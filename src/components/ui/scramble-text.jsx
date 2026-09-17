"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { prefersReducedMotion, scrambleText } from "@/lib/motion";

export const ScrambleText = forwardRef(function ScrambleText(
  { children, as: Tag = "span", className, entrance = "manual", ...props }, ref,
) {
  const container = useRef(null);
  const label = useRef(null);
  const animation = useRef(null);
  const hasPlayed = useRef(false);
  const clearHeight = useCallback(() => {
    if (container.current) container.current.style.height = "";
  }, []);
  const animate = useCallback(() => {
    if (!label.current) return;
    if (prefersReducedMotion()) {
      label.current.textContent = children;
      return;
    }
    animation.current?.kill();
    const element = container.current;
    if (element) {
      element.style.height = "";
      const height = element.getBoundingClientRect().height;
      if (height) element.style.height = `${height}px`;
    }
    animation.current = scrambleText(label.current, children);
    animation.current.then(clearHeight).catch(() => {});
  }, [children, clearHeight]);
  const play = useCallback(() => {
    if (hasPlayed.current) return;
    hasPlayed.current = true;
    animate();
  }, [animate]);

  useImperativeHandle(ref, () => ({ play }), [play]);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    element.__scramblePlay = play;
    let observer;
    if (entrance === "observer" && !prefersReducedMotion()) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { play(); observer.disconnect(); }
      }, { rootMargin: "0px 0px -10% 0px" });
      observer.observe(element);
    }
    return () => {
      observer?.disconnect();
      animation.current?.kill();
      clearHeight();
      delete element.__scramblePlay;
    };
  }, [entrance, play, clearHeight]);

  return <Tag ref={container} data-scramble aria-label={children} className={className}
    onPointerEnter={() => { if (hasPlayed.current) animate(); }} {...props}>
    <span ref={label} aria-hidden="true">{children}</span>
  </Tag>;
});

"use client";

import { Suspense } from "react";
import { Navbar } from "./navbar";
import { HeadScanProvider } from "./head-scan-provider";
import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { PixelReveal } from "./pixel-reveal";
import { CursorDot } from "./cursor-dot";
import { QualityTierMarker } from "./quality-tier-marker";
import navigation from "@/content/navigation.json";
export function SiteShell({ children }) {
  return (
    <>
      <div data-site-scale hidden />
      <QualityTierMarker />
      <HeadScanProvider>
        <SmoothScrollProvider>
          <Suspense fallback={null}>
            <Navbar {...navigation} />
          </Suspense>
          {children}
        </SmoothScrollProvider>
      </HeadScanProvider>
      <Suspense fallback={null}>
        <PixelReveal />
        <CursorDot />
      </Suspense>
    </>
  );
}

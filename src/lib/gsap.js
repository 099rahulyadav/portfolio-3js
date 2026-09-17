"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, Observer, Flip, useGSAP);
export { gsap, ScrollTrigger, Observer, Flip, useGSAP };

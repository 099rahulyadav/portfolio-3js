"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import * as Image from "next/image";
import * as Link from "next/link";
import * as Navigation from "next/navigation";
import "@/lib/gsap";
import * as Animation from "@/lib/gsap";
import * as Motion from "@/lib/motion";
import * as IntroState from "@/lib/intro-state";
import * as ScrambleText from "@/components/ui/scramble-text";
import * as HeadScanProvider from "@/components/layout/head-scan-provider";
import * as SmoothScrollProvider from "@/components/layout/smooth-scroll-provider";
export const Navbar = function ({ nav: e }) {
  let p = React.useRef(null),
    m = Navigation.useRouter(),
    h = Navigation.usePathname(),
    g = HeadScanProvider.useHeadScan(),
    v = e.links.filter((e) => "left" === e.side),
    y = e.links.filter((e) => "right" === e.side),
    x = (e) => e.href.includes("#"),
    b = [...e.links.filter((e) => !x(e)), ...e.links.filter(x)],
    [E, w] = React.useState(false);
  React.useEffect(() => {
    if (!E) return;
    let e = (e) => {
      "Escape" === e.key && w(false);
    };
    window.addEventListener("keydown", e);
    let t = document.body.style.overflow;
    return (
      (document.body.style.overflow = "hidden"),
      () => {
        (window.removeEventListener("keydown", e),
          (document.body.style.overflow = t));
      }
    );
  }, [E]);
  let R = (e, t) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || 0 !== e.button)
      return;
    let r = t.indexOf("#"),
      n = r >= 0 ? t.slice(0, r) : t,
      i = r >= 0 ? t.slice(r) : "";
    if (n === h) {
      (e.preventDefault(),
        m.push(t, {
          scroll: false,
        }));
      let r = i ? document.querySelector(i) : null,
        n = r
          ? Math.max(0, r.getBoundingClientRect().top + window.scrollY - 96)
          : 0,
        a = SmoothScrollProvider.getLenis();
      a
        ? a.scrollTo(n)
        : window.scrollTo({
            top: n,
            behavior: "smooth",
          });
      return;
    }
    g.hasMounted() &&
      (e.preventDefault(),
      g.playExitAll().then(() =>
        m.push(
          t,
          i
            ? {
                scroll: false,
              }
            : void 0,
        ),
      ));
  };
  Animation.useGSAP(
    () => {
      Motion.navIntro("[data-nav-item]", -8);
    },
    {
      scope: p,
    },
  );
  let [P, S] = React.useState(false);
  return (
    React.useEffect(() => {
      let e = () => S(true);
      if (IntroState.isRevealed()) return void e();
      let t = 0,
        r = IntroState.onReveal(() => {
          t = window.setTimeout(e, 1e3 * Motion.INTRO.dock);
        }),
        n =
          (Motion.INTRO.reveal +
            Motion.INTRO.hold +
            Motion.INTRO.dock +
            Motion.INTRO.fade) *
          1e3,
        i = window.setTimeout(e, n);
      return () => {
        (r(), window.clearTimeout(t), window.clearTimeout(i));
      };
    }, []),
    (
      <jsxRuntime.Fragment>
        <header
          ref={p}
          className={
            "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 pb-5 pt-[calc(1.25rem+env(safe-area-inset-top))] sm:px-10"
          }
        >
          <nav className={"hidden items-center gap-6 sm:flex sm:gap-8"}>
            {v.map((e) => (
              <Link.default
                data-nav-item={true}
                href={e.href}
                onClick={(t) => R(t, e.href)}
                className={
                  "text-xs font-medium uppercase tracking-[0.15em] text-white sm:text-sm"
                }
                key={e.href}
              >
                <ScrambleText.ScrambleText>{e.label}</ScrambleText.ScrambleText>
              </Link.default>
            ))}
            <a
              data-nav-item={true}
              href={e.resume.href}
              download={e.resume.filename}
              aria-label="Download resume (PDF)"
              className="text-xs font-medium uppercase tracking-[0.15em] text-white sm:text-sm"
            >
              <ScrambleText.ScrambleText>{e.resume.label}</ScrambleText.ScrambleText>
            </a>
          </nav>
          <Link.default
            data-nav-item={true}
            href={"/"}
            aria-label={e.wordmark.homeAriaLabel}
            onClick={(e) => R(e, "/")}
            className={"absolute left-1/2 -translate-x-1/2"}
          >
            <Image.default
              data-nav-logo={true}
              src={e.wordmark.logo}
              alt={e.wordmark.alt}
              width={56}
              height={56}
              priority={true}
              className={`h-11 w-11 object-contain ${P ? "nav-mark-float" : ""}`}
            />
          </Link.default>
          <nav className={"hidden items-center gap-6 sm:flex sm:gap-8"}>
            {y.map((e) => (
              <Link.default
                data-nav-item={true}
                href={e.href}
                onClick={(t) => R(t, e.href)}
                className={
                  "text-xs font-medium uppercase tracking-[0.15em] text-white sm:text-sm"
                }
                key={e.href}
              >
                <ScrambleText.ScrambleText>{e.label}</ScrambleText.ScrambleText>
              </Link.default>
            ))}
          </nav>
          <button
            data-nav-item={true}
            type={"button"}
            aria-label={E ? "Close menu" : "Open menu"}
            aria-expanded={E}
            onClick={() => w((e) => !e)}
            className={
              "ml-auto flex h-9 w-9 items-center justify-center text-zinc-300 transition-colors hover:text-white sm:hidden"
            }
          >
            <span className={"relative block h-3 w-5"}>
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${E ? "top-1/2 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-px w-5 bg-current transition-transform duration-300 ${E ? "bottom-1/2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </header>
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/90 backdrop-blur-md transition-opacity duration-300 sm:hidden ${E ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={!E}
        >
          {b.map((e) => (
            <Link.default
              href={e.href}
              tabIndex={E ? 0 : -1}
              onClick={(t) => {
                (w(false), R(t, e.href));
              }}
              className={
                "text-2xl font-medium uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
              }
              key={e.href}
            >
              {e.label}
            </Link.default>
          ))}
          <a
            href={e.resume.href}
            download={e.resume.filename}
            aria-label="Download resume (PDF)"
            tabIndex={E ? 0 : -1}
            onClick={() => w(false)}
            className="text-2xl font-medium uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white"
          >
            {e.resume.label}
          </a>
        </div>
      </jsxRuntime.Fragment>
    )
  );
};

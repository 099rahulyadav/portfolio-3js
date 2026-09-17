"use client";

import * as React from "react";
function r() {
  if ("u" < typeof document) return 1;
  let e = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return Number.isFinite(e) && e > 0 ? e / 16 : 1;
}
export { r as uiScale };
export const useUiScale = function () {
  let [e, n] = React.useState(1);
  return (
    React.useEffect(() => {
      let e = () => n(r());
      return (
        e(),
        window.addEventListener("resize", e),
        () => window.removeEventListener("resize", e)
      );
    }, []),
    e
  );
};

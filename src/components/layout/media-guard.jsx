"use client";

import * as React from "react";
export const MediaGuard = function () {
  return (
    React.useEffect(() => {
      let e = (e) => {
        let t;
        (t = e.target) instanceof Element &&
          ("IMG" === t.tagName || "CANVAS" === t.tagName) &&
          e.preventDefault();
      };
      return (
        document.addEventListener("dragstart", e, {
          capture: true,
        }),
        document.addEventListener("contextmenu", e, {
          capture: true,
        }),
        () => {
          (document.removeEventListener("dragstart", e, {
            capture: true,
          }),
            document.removeEventListener("contextmenu", e, {
              capture: true,
            }));
        }
      );
    }, []),
    null
  );
};

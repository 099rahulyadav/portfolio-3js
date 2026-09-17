"use client";

import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
let n = React.createContext({
  register: () => {},
  unregister: () => {},
  hasMounted: () => false,
  playExitAll: () => Promise.resolve(),
});
export const HeadScanProvider = function ({ children: e }) {
  let i = React.useRef(new Set()),
    a = React.useRef({
      register: (e) => i.current.add(e),
      unregister: (e) => i.current.delete(e),
      hasMounted: () => i.current.size > 0,
      playExitAll: () =>
        Promise.all([...i.current].map((e) => e())).then(() => void 0),
    }).current;
  return <n.Provider value={a}>{e}</n.Provider>;
};
export const useHeadScan = function () {
  return React.useContext(n);
};

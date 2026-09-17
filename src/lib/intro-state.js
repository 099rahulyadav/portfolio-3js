"use client";

let t = true,
  r = false,
  n = new Set();
function i() {
  r || ((r = true), n.forEach((e) => e()), n.clear());
}
export const claimIntro = function (e) {
  let r = t && "/" === e;
  return ((t = false), r || i(), r);
};
export const isRevealed = function () {
  return r;
};
export const onReveal = function (e) {
  return r
    ? (e(), () => {})
    : (n.add(e),
      () => {
        n.delete(e);
      });
};
export { i as reveal };

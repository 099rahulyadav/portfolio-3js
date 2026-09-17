"use client";

let t = false;
export const consumePixelRevealSkip = function () {
  let e = t;
  return ((t = false), e);
};
export const suppressNextPixelReveal = function () {
  t = true;
};

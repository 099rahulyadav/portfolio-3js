"use client";

export const externalHref = function (e) {
  let t = (e ?? "").trim();
  return t
    ? /^([a-z][a-z0-9+.-]*:|\/\/|[#/])/i.test(t)
      ? t
      : `https://${t}`
    : "#";
};

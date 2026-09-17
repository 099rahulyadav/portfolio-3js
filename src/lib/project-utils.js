"use client";

export const flattenStack = function (e) {
  let t = e.stackGroups,
    r = [
      ...(t?.frontend ?? []),
      ...(t?.backend ?? []),
      ...(t?.database ?? []),
    ].filter((e) => e.trim());
  return r.length ? r : (e.stack ?? []).filter((e) => e.trim());
};
export const overviewRows = function (e, t) {
  let r = e.stackGroups,
    n = (e, t, r) => {
      let n = (e ?? []).filter((e) => e.trim());
      return n.length
        ? {
            label: t ?? r,
            value: n.join("   ·   "),
          }
        : null;
    },
    a = [
      n(r?.frontend, t.frontend, "Frontend"),
      n(r?.backend, t.backend, "Backend"),
      n(r?.database, t.database, "Database"),
    ].filter(Boolean),
    l = (e.stack ?? []).filter((e) => e.trim()),
    s = a.length
      ? {
          kind: "group",
          label: t.stack,
          rows: a,
        }
      : l.length
        ? {
            kind: "row",
            label: t.stack,
            value: l.join("   ·   "),
          }
        : null;
  return [
    {
      kind: "row",
      label: t.note,
      value: e.description,
    },
    ...(s ? [s] : []),
    ...(e.year
      ? [
          {
            kind: "row",
            label: t.year,
            value: e.year,
          },
        ]
      : []),
  ];
};

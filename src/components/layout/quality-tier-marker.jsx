"use client";

import * as React from "react";
import * as Quality from "@/lib/quality";
export const QualityTierMarker = function () {
  return (
    React.useEffect(() => {
      document.documentElement.dataset.qualityTier =
        Quality.detectQualityTier();
    }, []),
    null
  );
};

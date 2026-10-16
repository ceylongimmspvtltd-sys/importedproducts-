"use client";

import { useEffect, useState } from "react";

/** Renders the current year on the client to avoid prerender-time `Date` errors. */
export default function Year() {
  const [year, setYear] = useState<string>("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return <>{year}</>;
}

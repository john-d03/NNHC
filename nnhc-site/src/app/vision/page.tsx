"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function VisionRedirectPage() {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.location.replace("/model/");
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className="mx-auto flex min-h-[40vh] max-w-3xl flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-2xl font-semibold">Redirecting…</h1>
      <p>
        This page has moved to{" "}
        <Link className="underline" href="/model/">
          /model
        </Link>
        .
      </p>
    </main>
  );
}

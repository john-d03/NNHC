"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const REDIRECT_DELAY_MS = 10000;

export default function VisionRedirectPage() {
  const [autoRedirect, setAutoRedirect] = useState(true);

  useEffect(() => {
    if (!autoRedirect) return;

    const timeout = window.setTimeout(() => {
      window.location.replace("/model/");
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [autoRedirect]);

  return (
    <main
      aria-label="Vision page redirect notice"
      className="mx-auto flex min-h-[40vh] max-w-3xl flex-col items-center justify-center gap-3 px-6 text-center"
    >
      <h1 className="text-2xl font-semibold">Redirecting…</h1>
      <p>
        This page has moved to{" "}
        <Link className="underline" href="/model/">
          /model
        </Link>
        .
      </p>
      {autoRedirect ? (
        <p aria-live="polite">
          You will be redirected automatically to /model in 10 seconds.{" "}
          <button
            className="cursor-pointer underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => setAutoRedirect(false)}
            type="button"
          >
            Cancel auto-redirect
          </button>
        </p>
      ) : null}
      <p>
        <Link className="underline" href="/model/">
          Go now
        </Link>
      </p>
    </main>
  );
}

"use client";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  // you can log to your monitoring service here
  useEffect(() => console.error(error), [error]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Something went wrong!</h1>
      <pre>{error.message}</pre>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}

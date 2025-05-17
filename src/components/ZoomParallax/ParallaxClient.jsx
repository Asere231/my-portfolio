"use client";

import dynamic from "next/dynamic";

// import your ZoomParallax, but only on the client
const ZoomParallax = dynamic(
  () => import("@/components/ZoomParallax/index.jsx"),
  { ssr: false }
);

export default function ParallaxClient() {
  return <ZoomParallax />;
}

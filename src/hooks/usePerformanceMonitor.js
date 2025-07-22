import { useEffect } from "react";
import { trackWebVitals } from "@/lib/analytics";

export function usePerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    import("web-vitals").then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(trackWebVitals);
      onFID(trackWebVitals);
      onFCP(trackWebVitals);
      onLCP(trackWebVitals);
      onTTFB(trackWebVitals);
    });
  }, []);
}

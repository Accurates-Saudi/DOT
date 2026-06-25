import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

export function useScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);
}

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollHandler = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);
    const scroll = params.get("scroll");
    if (location.pathname === "/" && scroll && scroll !== "top") {
      setTimeout(() => {
        const el = document.getElementById(scroll) || document.querySelector(`#${scroll}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
        // fallback to top if not found
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 0);
    } else {
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.search]);

  return null;
};

export default ScrollHandler;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scroll = params.get("scroll");
    if (scroll) {
      if (scroll === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTimeout(() => {
          const el = document.getElementById(scroll) || document.querySelector(`#${scroll}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [location]);

  return null;
};

export default ScrollHandler;

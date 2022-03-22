import React, { useState, useEffect, useRef } from "react";
import "./scroll.scss";
import IconButton from "@material-ui/core/IconButton";
import { ExpandLess } from "@material-ui/icons";

const Scroll = ({ showBelow, scrollAnchor }) => {
  const [show, setShow] = useState(showBelow ? false : true);
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
  }, []);

  const handleScroll = () => {
    if (isMounted) {
      if (window.pageYOffset > showBelow) {
        if (!show) setShow(true);
      } else {
        if (show) setShow(false);
      }
    }
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  }, []);

  const handleClick = () => {
    if (scrollAnchor) {
      let aim = document.getElementById(scrollAnchor).offsetHeight;
      document
        .getElementById(scrollAnchor)
        .scrollIntoView({ behavior: "smooth" });
    } else {
      window[`scrollTo`]({ top: 0, behavior: `smooth` });
    }
  };

  return (
    <div>
      {show && (
        <IconButton onClick={handleClick} className="toTop">
          <ExpandLess />
        </IconButton>
      )}
    </div>
  );
};
export default Scroll;

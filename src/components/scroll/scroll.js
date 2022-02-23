import { useState, useEffect } from "react";
import "./scroll.scss";
import IconButton from "@material-ui/core/IconButton";
import { ExpandLess } from "@material-ui/icons";

const Scroll = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll());
    }
  });

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
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

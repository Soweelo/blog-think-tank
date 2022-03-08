import "./popupmessage.scss";
import Close from "@material-ui/icons/Close";
import { useSpring, animated } from "react-spring";
import { useRef } from "react";
export default function PopupMessage({ content, setIsOpen, isOpen }) {
  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 400,
    },
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `translateY(45px)` : "translateY(-110vh)",
  });
  return (
    <animated.div
      style={animation}
      ref={modalRef}
      className="animated-div-popup"
    >
      <div id="popup-message">
        {content}
        {/*<a className="close" onClick={() => setIsOpen(false)}>*/}
        {/*  <Close />*/}
        {/*</a>*/}
      </div>
    </animated.div>
  );
}

import "./loader.scss";
import { GTranslate } from "@material-ui/icons";
import { useEffect, useState } from "react";

export default function Loader({ loading }) {
  const [fadeState, setFadeState] = useState(false);
  useEffect(() => {
    if (loading) {
      setFadeState(true);
    } else {
      setFadeState(false);
    }
  }, [loading]);
  return (
    <div className={"loader-wrapper " + (fadeState && " not-transparent")}>
      <GTranslate className="loader__icon" />
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

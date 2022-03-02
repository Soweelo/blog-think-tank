import "./privacy.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import { useEffect, useState } from "react";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";

export default function Privacy({ allOptions, setHomeContent }) {
  const [option_privacy, setOption_privacy] = useState("");

  useEffect(() => {
    setOption_privacy(getOptionByKey("05_privacy", allOptions));
  }, [allOptions]);

  return (
    <div id="privacy">
      <BackHomeButton setHomeContent={setHomeContent} />
      <h1 dangerouslySetInnerHTML={{ __html: option_privacy }}></h1>
      {/*<div dangerouslySetInnerHTML={{ __html: option_privacy_text }} className="privacy__para-container">*/}
      {/*    <p>*/}

      {/*    </p>*/}
      {/*</div>*/}
    </div>
  );
}

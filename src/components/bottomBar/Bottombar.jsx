import "./bottombar.scss";

import { useEffect, useState } from "react";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";

export default function Bottombar({
  mainMenuOpen,
  setMainMenuOpen,
  homeContent,
  setHomeContent,
  allOptions,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [option_moreabout, setOption_moreabout] = useState("");
  const [option_privacy, setOption_privacy] = useState("");
  const [option_faq, setOption_faq] = useState("");
  const [option_join, setOption_join] = useState("");
  const [option_header, setOption_header] = useState("");

  useEffect(() => {
    setOption_moreabout(getOptionByKey("05_more_about", allOptions));
    setOption_faq(getOptionByKey("05_faq", allOptions));
    setOption_privacy(getOptionByKey("05_privacy", allOptions));
    setOption_join(getOptionByKey("05_join_the_project", allOptions));
  }, [allOptions]);
  const changeContent = (e) => {
    setHomeContent(e.target.id);
  };
  return (
    <div className={"bottombar " + (mainMenuOpen && " active")}>
      <div
        className="bottombar__item"
        onClick={(e) => changeContent(e)}
        id="1"
        dangerouslySetInnerHTML={{ __html: option_moreabout }}
      ></div>
      <div
        className="bottombar__item"
        onClick={(e) => changeContent(e)}
        id="2"
        dangerouslySetInnerHTML={{ __html: option_privacy }}
      ></div>
      <div
        className="bottombar__item"
        onClick={(e) => changeContent(e)}
        id="3"
        dangerouslySetInnerHTML={{ __html: option_faq }}
      ></div>
      <div
        className="bottombar__item"
        onClick={(e) => changeContent(e)}
        id="4"
        dangerouslySetInnerHTML={{ __html: option_join }}
      ></div>

      <div className="hamburger" onClick={() => setMainMenuOpen(!mainMenuOpen)}>
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
      </div>
    </div>
  );
}

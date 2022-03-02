import "./mainmenu.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Favorite, Person, Search, Home } from "@material-ui/icons";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";

export default function MainMenu({
  mainMenuOpen,
  setMainMenuOpen,
  homeContent,
  setHomeContent,

  showLogin,
  setShowLogin,
  allOptions,
}) {
  const changeContent = (e) => {
    setHomeContent(e.target.id);
    // console.log(e.target.parentNode.id);
    setMainMenuOpen(false);
  };
  function openLoginInterface() {
    setShowLogin(!showLogin);
    setMainMenuOpen(false);
  }
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
  return (
    <div className={"menu " + (mainMenuOpen && "active")}>
      <div className="menu__icon-wrapper">
        <div className="menu__icon">
          <Favorite />
        </div>
        <div className="menu__icon" onClick={(e) => changeContent(e)} id="0">
          <Home />
        </div>
        <div className="menu__icon" onClick={() => openLoginInterface()}>
          <Person />
        </div>
      </div>
      <ul>
        <li>
          <div
            onClick={(e) => changeContent(e)}
            id="1"
            dangerouslySetInnerHTML={{ __html: option_moreabout }}
          ></div>
        </li>
        <li>
          <div
            onClick={(e) => changeContent(e)}
            id="2"
            dangerouslySetInnerHTML={{ __html: option_privacy }}
          ></div>
        </li>
        <li>
          <div
            onClick={(e) => changeContent(e)}
            id="3"
            dangerouslySetInnerHTML={{ __html: option_faq }}
          ></div>
        </li>
        <li>
          <div
            onClick={(e) => changeContent(e)}
            id="4"
            dangerouslySetInnerHTML={{ __html: option_join }}
          ></div>
        </li>
      </ul>
    </div>
  );
}

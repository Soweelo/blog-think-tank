import "./mainmenu.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Favorite, Person, Search } from "@material-ui/icons";
export default function MainMenu({
  mainMenuOpen,
  setMainMenuOpen,
  homeContent,
  setHomeContent,
  lang,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [option_moreabout, setOption_moreabout] = useState("");
  const [option_privacy, setOption_privacy] = useState("");
  const [option_faq, setOption_faq] = useState("");
  const [option_join, setOption_join] = useState("");
  useEffect(() => {
    const getOptions = async (key) => {
      const moreabout = await axios.get(
        PF + "/api/options/getByKey?lang=" + lang + "&key=05_more_about"
      );
      const privacy = await axios.get(
        PF + "/api/options/getByKey?lang=" + lang + "&key=05_privacy"
      );
      const faq = await axios.get(
        PF + "/api/options/getByKey?lang=" + lang + "&key=05_faq"
      );
      const join = await axios.get(
        PF + "/api/options/getByKey?lang=" + lang + "&key=05_join_the_project"
      );
      setOption_moreabout(moreabout.data.data.value);
      setOption_privacy(privacy.data.data.value);
      setOption_faq(faq.data.data.value);
      setOption_join(join.data.data.value);
    };
    if (lang.length !== 0) {
      getOptions();
    }
    // console.log("useffect  de topbar", "lang", lang,"bottomContent",bottomBarContent,"topbar:",topBarContent )
  }, [lang]);

  const changeContent = (e) => {
    setHomeContent(e.target.id);
    console.log(e.target);
    setMainMenuOpen(false);
  };
  return (
    <div className={"menu " + (mainMenuOpen && "active")}>
      <div className="menu__icon-wrapper">
        <div className="menu__icon">
          <Favorite />
        </div>
        <div className="menu__icon">
          <Search />
        </div>
        <div className="menu__icon">
          <Person />
        </div>
      </div>
      <ul>
        <li>
          <p onClick={(e) => changeContent(e)} id="1">
            {" "}
            {option_moreabout}
          </p>
        </li>
        <li>
          <p onClick={(e) => changeContent(e)} id="2">
            {" "}
            {option_privacy}
          </p>
        </li>
        <li>
          <p onClick={(e) => changeContent(e)} id="3">
            {" "}
            {option_faq}
          </p>
        </li>
        <li>
          <p onClick={(e) => changeContent(e)} id="4">
            {option_join}
          </p>
        </li>
      </ul>
    </div>
  );
}

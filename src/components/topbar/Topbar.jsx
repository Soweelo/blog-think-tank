import "./topbar.scss";
import { Person, Favorite, Search, GTranslate } from "@material-ui/icons";
import { useEffect, useState, memo, useContext } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useFetch } from "../../hooks/useFetch";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
import { UserContext } from "../../context/UserContext";
import { langSetter } from "../../context functions/langCall";
export default memo(function Topbar({
  setHomeContent,
  setShowAuth,
  allOptions,
  setRegisterContent,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [allLang, setAllLang] = useState([]);
  const { user, lang, dispatch } = useContext(UserContext);
  // const { lang, dispatch } = useContext(LangContext);
  const fetch = useFetch();
  const [option_header, setOption_header] = useState("");
  const options = dataLangToArray(allLang);
  function dataLangToArray(data) {
    const result = [];

    data.map((l) => {
      result.push({ value: l.code, label: l.original_name });
      return result;
    });
    return result;
  }

  function setLang(option) {
    langSetter(option, dispatch);
  }

  function getFullname(all, code) {
    let result = "";
    all.map((l) => {
      if (l.code === code) {
        result = l.original_name;
        return result;
      }
      return result;
    });
    return result;
  }
  const getLangs = async () => {
    try {
      const response = await fetch(PF + "/api/langs").then((r) => r.json());
      setAllLang(response.data);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    getLangs();
  }, [PF]);

  useEffect(() => {
    let result = getOptionByKey("01_header", allOptions);
    setOption_header(result);
  }, [allOptions]);
  function setName() {
    // console.log(lang, allLang)
    if (lang.length !== 0 && allLang.length !== 0) {
      document.getElementsByClassName("Dropdown-placeholder")[0].innerHTML =
        getFullname(allLang, lang);
    }
  }
  setName();

  function openLoginInterface() {
    // console.log("user", user);
    if (user) {
      setHomeContent("5");
    } else {
      setRegisterContent(false);
      setShowAuth(true);
    }
  }
  return (
    <div className="topbar">
      <div className="wrapper">
        <div className="heading-left">
          <p
            onClick={() => {
              setHomeContent(0);
            }}
            className="heading-left__item"
          >
            {/*Your world 3.0*/}
          </p>
        </div>
        <div
          className="heading-center__item foster"
          dangerouslySetInnerHTML={{ __html: option_header }}
        ></div>
        <div className="nav">
          <div className="nav__link">
            <Favorite />
          </div>
          <div className="nav__link">
            <Search />
          </div>
          <div className="nav__link" onClick={() => openLoginInterface()}>
            <Person />
          </div>
          <div className="nav__link nav__link-GT-icon">
            <GTranslate />
          </div>
          <Dropdown
            options={options}
            value={lang}
            onChange={(e) => setLang(e.value)}
            className="nav__link-GT-input"
          />
        </div>
      </div>
    </div>
  );
});

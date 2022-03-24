import "./topbar.scss";
import { Person, Favorite, Search, GTranslate } from "@material-ui/icons";
import { useEffect, useState, memo, useContext } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useFetch } from "../../hooks/useFetch";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
import { AuthContext } from "../../context/Auth/AuthContext";
import { LangContext } from "../../context/Lang/LangContext";
import { langSetter } from "../../langCall";
export default memo(function Topbar({
  setHomeContent,
  setShowAuth,
  allOptions,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [allLang, setAllLang] = useState([]);
  const { user } = useContext(AuthContext);
  const { lang, dispatch } = useContext(LangContext);
  const fetch = useFetch();
  const [option_header, setOption_header] = useState("");
  function dataLangToArray(data) {
    const result = [];

    data.map((l) => {
      result.push({ value: l.code, label: l.original_name });
      return result;
    });
    return result;
  }

  function setLangAndCookieLang(option) {
    console.log(option);
    langSetter(option, dispatch);
    //  cookies setting
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

  useEffect(() => {
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

    getLangs();
  }, [PF]);

  useEffect(() => {
    let result = getOptionByKey("01_header", allOptions);
    // console.log(result);
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
  const options = dataLangToArray(allLang);

  function openLoginInterface() {
    console.log("user", user);
    if (user) {
      setHomeContent("5");
    } else {
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
            Your world 3.0
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
            onChange={(e) => setLangAndCookieLang(e.value)}
            className="nav__link-GT-input"
          />
        </div>
      </div>
    </div>
  );
});

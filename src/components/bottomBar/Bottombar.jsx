import "./bottombar.scss";

import { useContext, useEffect, useState } from "react";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
import {Favorite, Home, Person, Search} from "@material-ui/icons";
import { UserContext } from "../../context/UserContext";

export default function Bottombar({
  mainMenuOpen,
    homeContent,
  setMainMenuOpen,
  setHomeContent,
  allOptions,
  setShowAuth,
  setRegisterContent,
}) {
  const { user } = useContext(UserContext);
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

  function openLoginInterface() {
    // console.log("user", user);
    if (user) {
      setHomeContent("5");
    } else {
      setRegisterContent(false);
      setShowAuth(true);
    }
  }
    const handleClickHome = (e) => {
        if(homeContent === "0"){
            window[`scrollTo`]({ top: 0, behavior: `smooth` });
        }else{
            changeContent(e)
        }
    }
    const handleClickFavorites = (e) => {
        if(homeContent !== "0"){
            let target = document.getElementById("menu-read")
            setHomeContent("0")
            if (target){
                target.scrollIntoView({ behavior: "smooth",block: "center" });
            }
        }
        let target = document.getElementById("menu-read")
        if (target){
            target.scrollIntoView({ behavior: "smooth",block: "center" });
        }
    }
    const handleClickReadByTag = ()=>{
      if(homeContent !== "0"){
          let target = document.getElementById("menu-read")
          setHomeContent("0")
          if (target){
              target.scrollIntoView({ behavior: "smooth",block: "center" });
          }
      }
      let target = document.getElementById("menu-read")
        if (target){
        target.scrollIntoView({ behavior: "smooth",block: "center" });
        }
    }
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
      <div className="home" onClick={(e) => handleClickHome(e)} id="0">
        <Home />
      </div>
        {/*<div className="search" onClick={handleClickReadByTag}>*/}
        {/*    <Search />*/}
        {/*</div>*/}
      <div className="hamburger" onClick={ () =>setMainMenuOpen(!mainMenuOpen)}>
        <span className="line1"></span>
        <span className="line2"></span>
        <span className="line3"></span>
      </div>
      <div className="account" onClick={() => openLoginInterface()}>
        <Person />
      </div>
        {/*<div className="account" onClick={() => handleClickFavorites()}>*/}
        {/*    <Favorite />*/}
        {/*</div>*/}
    </div>
  );
}

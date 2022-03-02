import Intro from "./components/intro/Intro";
import Topbar from "./components/topbar/Topbar";
import "./app.scss";
import Bottombar from "./components/bottomBar/Bottombar";
import MoreAbout from "./components/moreAbout/MoreAbout";
import Privacy from "./components/privacy/Privacy";
import Faq from "./components/faq/Faq";

import BePart from "./components/bePart/BePart";
import { useState, useEffect, memo } from "react";
import MainMenu from "./components/mainMenu/MainMenu";

import styled from "styled-components";

import MemberLoginandRegister from "./components/login/MemberLoginandRegister";

import { useFetch } from "./hooks/useFetch";

function App() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [homeContent, setHomeContent] = useState("0");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [lang, setLang] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const SectionMain = styled.div`
    background-image: url("${PF}/storage/app/public/4.jpg");
  `;
  const fetch = useFetch();

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    if (getCookie("lang").length === 0) {
      setLang(navigator.language.substr(0, 2));
    } else {
      setLang(getCookie("lang"));
    }
  }, []);
  useEffect(() => {
    const fetchAllOptions = async () => {
      try {
        const response = await fetch(PF + "/api/options?lang=" + lang, {
          enabled: !!lang,
        });
        const data = await response.json();
        // console.log(data.data);
        setAllOptions(data.data);
      } catch (e) {
        if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
          console.error(e);
        }
      }
    };
    // console.log(allOptions);
    if (lang) {
      fetchAllOptions();
    }

    // console.log(allOptions);
  }, [lang]);
  return (
    <>
      <div className="app">
        <Topbar
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          setLang={setLang}
          lang={lang}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          allOptions={allOptions}
        />

        <SectionMain className={`sections${showLogin ? " filter" : ""}`}>
          {/*<OnePageContent omeContent={homeContent} setHomeContent={setHomeContent}/>*/}
          {(() => {
            switch (homeContent) {
              case "1":
                return (
                  <MoreAbout
                    lang={lang}
                    setHomeContent={setHomeContent}
                    allOptions={allOptions}
                  />
                );
              case "2":
                return (
                  <Privacy
                    lang={lang}
                    setHomeContent={setHomeContent}
                    allOptions={allOptions}
                  />
                );

              case "3":
                return (
                  <Faq
                    lang={lang}
                    setHomeContent={setHomeContent}
                    allOptions={allOptions}
                  />
                );
              case "4":
                return (
                  <BePart
                    lang={lang}
                    setHomeContent={setHomeContent}
                    allOptions={allOptions}
                  />
                );

              default:
                return <Intro lang={lang} allOptions={allOptions} />;
            }
          })()}
        </SectionMain>

        <MainMenu
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          lang={lang}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          allOptions={allOptions}
        />
        <Bottombar
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          lang={lang}
          allOptions={allOptions}
        />
        <MemberLoginandRegister
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />
      </div>
    </>
  );
}

export default App;

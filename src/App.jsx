import Intro from "./components/intro/Intro";
import Topbar from "./components/topbar/Topbar";
import "./app.scss";
import Bottombar from "./components/bottomBar/Bottombar";
import MoreAbout from "./components/moreAbout/MoreAbout";
import Privacy from "./components/privacy/Privacy";
import Faq from "./components/faq/Faq";
import Account from "./components/account/Account";
import BePart from "./components/bePart/BePart";
import { useState, useEffect, useContext } from "react";
import MainMenu from "./components/mainMenu/MainMenu";
import PopupMessage from "./components/popup/PopupMessage";
import styled from "styled-components";
import Auth from "./components/auth/Auth";
import { useFetch } from "./hooks/useFetch";
import { AuthContext } from "./context/AuthContext";
import getCookie from "./functions/cookiesController/getCookie";

function App() {
  const { user } = useContext(AuthContext);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [homeContent, setHomeContent] = useState("0");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [lang, setLang] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const [popupContent, setPopupContent] = useState("");
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);

  const SectionMain = styled.div`
    background-image: url("${PF}/storage/app/public/4.jpg");
  `;
  const fetch = useFetch();
  // const [session, setSession] = useState([]);
  getCookie("YW-session-token");

  useEffect(() => {
    if (getCookie("YW-lang").length === 0) {
      setLang(navigator.language.substr(0, 2));
    } else {
      setLang(getCookie("YW-lang"));
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
  }, [lang]);
  useEffect(() => {
    if (homeContent === "5") {
      setHomeContent("0");
    }
  }, [user]);
  return (
    <>
      <div className="app">
        <Topbar
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          setLang={setLang}
          lang={lang}
          showAuth={showAuth}
          setShowAuth={setShowAuth}
          allOptions={allOptions}
        />

        <SectionMain className={`sections${showAuth ? " filter" : ""}`}>
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
              case "5":
                return (
                  <>
                    <Account
                      allOptions={allOptions}
                      setHomeContent={setHomeContent}
                      lang={lang}
                    />
                  </>
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
          showAuth={showAuth}
          setShowAuth={setShowAuth}
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

        <Auth
          showAuth={showAuth}
          setShowAuth={setShowAuth}
          setHomeContent={setHomeContent}
        />

        <PopupMessage
          content={popupContent}
          isOpen={isOpenedPopup}
          setIsOpen={setIsOpenedPopup}
        />
      </div>
    </>
  );
}

export default App;

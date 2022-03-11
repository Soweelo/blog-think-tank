import Intro from "./components/intro/Intro";
import Topbar from "./components/topbar/Topbar";
import "./app.scss";
import Bottombar from "./components/bottomBar/Bottombar";
import MoreAbout from "./components/moreAbout/MoreAbout";
import Privacy from "./components/privacy/Privacy";
import Faq from "./components/faq/Faq";
import Account from "./components/account/Account";
import BePart from "./components/bePart/BePart";
import { useState, useEffect, memo } from "react";
import MainMenu from "./components/mainMenu/MainMenu";
import PopupMessage from "./components/popup/PopupMessage";
import styled from "styled-components";
import outDateCookieSession from "./functions/cookiesController/outDateCookieSession";
import MemberLoginandRegister from "./components/login/MemberLoginandRegister";
// import checkValidToken from "./functions/sessionController/checkValidToken";
import { useFetch } from "./hooks/useFetch";
// import { useCheckValidToken } from "./functions/sessionController/useCheckValidToken";

function App() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [homeContent, setHomeContent] = useState("0");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [lang, setLang] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const [popupContent, setPopupContent] = useState("");
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const SectionMain = styled.div`
    background-image: url("${PF}/storage/app/public/4.jpg");
  `;
  const fetch = useFetch();
  const [session, setSession] = useState([]);

  function getCookie(cname) {
    let name = cname + "=";

    let decodedCookie = decodeURIComponent(document.cookie);
    // console.log(decodedCookie);
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
  getCookie("YW-session-token");
  function endSession() {
    if (session.length !== 0) {
      outDateCookieSession(session[0], session[1]);
      // alert("disconnected", session[0], session[1]);
      setSession([]);

      setHomeContent("0");
      // setPopupContent("Disconnected");
      // callBackPopUp();
    } else {
      // alert("your Session expired!");
      setHomeContent("0");
      setSession([]);
    }
  }
  useEffect(() => {
    const token = getCookie("YW-session-token");
    const pseudo = getCookie("YW-session-pseudo");
    // console.log(getCookie("YW-session-token"));
    if (token.length !== 0) {
      const checkToken = async () => {
        // console.log(token);
        try {
          setLoading(true);

          const response = await fetch(
            PF + "/api/members/session?token=" + token
          );
          const data = await response.json();
          // console.log(data);
          if (data.success) {
            setSession([token, pseudo]);
            setIsValidToken(true);
          } else {
            setSession([]);
            if (token && pseudo) {
              outDateCookieSession(token, pseudo);
            }
          }
          setLoading(false);
          // return isValidToken;
        } catch (e) {
          console.log(e);
        }
        // console.log(session);
        // console.log("isValid", isValidToken);
      };
      if (!loading) {
        checkToken();
      }
    }
  }, [isValidToken, session]);

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

    // console.log(allOptions);
  }, [lang]);
  // console.log(isOpenedPopup);

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
          session={session}
          isValidToken={isValidToken}
          setSession={setSession}
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
              case "5":
                return (
                  <>
                    {/*<button*/}
                    {/*  className="btn small"*/}
                    {/*  onClick={() => {*/}
                    {/*    callBackPopUp();*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  here*/}
                    {/*</button>*/}
                    {session.length !== 0 ? (
                      <Account
                        allOptions={allOptions}
                        session={session}
                        setSession={setSession}
                        setHomeContent={setHomeContent}
                        isValidToken={isValidToken}
                        setIsValidToken={setIsValidToken}
                        // setPopupContent={setPopupContent}
                        // setIsOpenPopup={setIsOpenedPopup}
                      />
                    ) : (
                      setHomeContent(0)
                    )}
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
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          allOptions={allOptions}
          isValidToken={isValidToken}
          setSession={setSession}
          session={session}
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
          session={session}
          setSession={setSession}
          setHomeContent={setHomeContent}
          setIsValidToken={setIsValidToken}
          isValidToken={isValidToken}
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

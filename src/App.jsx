import Intro from "./components/intro/Intro";
import Topbar from "./components/topbar/Topbar";
import "./app.scss";
import Bottombar from "./components/bottomBar/Bottombar";
import MainMenu from "./components/mainMenu/MainMenu";
import MoreAbout from "./components/moreAbout/MoreAbout";
import Privacy from "./components/privacy/Privacy";
import Faq from "./components/faq/Faq";
import Account from "./components/account/Account";
import BePart from "./components/bePart/BePart";
import { useState, useEffect, useContext } from "react";
import PopupMessage from "./components/popup/PopupMessage";
import styled from "styled-components";
import Auth from "./components/auth/Auth";
import { useFetch } from "./hooks/useFetch";
import { UserContext } from "./context/UserContext";
import getCookie from "./functions/cookiesController/getCookie";
import CookieBanner from "./components/cookieBanner/CookieBanner";
import getOptionByKey from "./functions/getOptionByKey/GetOptionByKey";
import ResetPassword from "./components/resetPassword/resetPassword";
function App() {
  const { user, lang } = useContext(UserContext);
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [homeContent, setHomeContent] = useState("0");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showAuth, setShowAuth] = useState(false);
  const [registerContent, setRegisterContent] = useState(false);
  const [allOptions, setAllOptions] = useState([]);
  const [popupContent, setPopupContent] = useState("");
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [cookiesBanner, setCookiesBanner] = useState(true);
  const [accountContent, setAccountContent] = useState(0);
  const [showResetPassword, setShowResetPassword] = useState(false)
  const SectionMain = styled.div`
    background-image: url("${PF}/storage/app/public/4.jpg");
    @media (max-width: 768px) {
      background-image: none;
      background-color: ${getOptionByKey("01_bgcolor", allOptions)} !important;
    }
  `;
  const fetch = useFetch();
  useEffect(() => {
    const consentCookie = getCookie("YWORLD3-cookies-consent");
    // console.log(consentCookie);
    if (consentCookie) {
      setCookiesBanner(false);
    }
  }, []);

  const fetchAllOptions = async () => {
    try {
      const response = await fetch(PF + "/api/options?lang=" + lang);
      const data = await response.json();
      // console.log(data.data);
      setAllOptions(data.data);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    fetchAllOptions();
  }, [lang]);
  // console.log(lang);
  useEffect(() => {
    if (homeContent === "5") {
      setHomeContent("0");
    }
  }, [user]);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (reg) {
        // console.log("Successfully registered service worker", reg);
      })
      .catch(function (err) {
        // console.warn("Error whilst registering service worker", err);
      });
  }
 useEffect(()=>{
   let url = window.location.href
  if( url.includes("yworld3.com/?token=")){
setShowResetPassword(true)
  }
 },[])

  return (
    <>
      <div className="app">
        <Topbar
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          showAuth={showAuth}
          setShowAuth={setShowAuth}
          setRegisterContent={setRegisterContent}
          allOptions={allOptions}
        />

        <SectionMain className={`sections${showAuth ? " filter" : ""}`}>
          {(() => {
            switch (homeContent) {
              case "1":
                return (
                  <MoreAbout
                    setHomeContent={setHomeContent}
                    allOptions={allOptions}
                  />
                );
              case "2":
                return (
                  <Privacy
                    setHomeContent={setHomeContent}
                    allOptions={allOptions}
                  />
                );

              case "3":
                return (
                  <Faq
                    setHomeContent={setHomeContent}
                    allOptions={allOptions}
                  />
                );
              case "4":
                return (
                  <BePart
                    setHomeContent={setHomeContent}
                    allOptions={allOptions}
                  />
                );
              case "5":
                return (
                  <>
                    {user && (
                      <Account
                        allOptions={allOptions}
                        setHomeContent={setHomeContent}
                        accountContent={accountContent}
                        setAccountContent={setAccountContent}
                      />
                    )}
                  </>
                );
              default:
                return (
                  <Intro
                    allOptions={allOptions}
                    setHomeContent={setHomeContent}
                    setShowAuth={setShowAuth}
                    showAuth={showAuth}
                    setRegisterContent={setRegisterContent}
                    setAccountContent={setAccountContent}
                  />
                );
            }
          })()}
        </SectionMain>

        <MainMenu
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          showAuth={showAuth}
          setShowAuth={setShowAuth}
          setRegisterContent={setRegisterContent}
          allOptions={allOptions}
        />
        <Bottombar
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          allOptions={allOptions}
          setShowAuth={setShowAuth}
          setRegisterContent={setRegisterContent}
        />

        <Auth
          showAuth={showAuth}
          setShowAuth={setShowAuth}
          setHomeContent={setHomeContent}
          registerContent={registerContent}
          setRegisterContent={setRegisterContent}
        />

        {showResetPassword &&
        <ResetPassword showResetPassword={showResetPassword} setShowResetPassword={setShowResetPassword}/>
        }

        <PopupMessage
          content={popupContent}
          isOpen={isOpenedPopup}
          setIsOpen={setIsOpenedPopup}
        />
        {cookiesBanner && (
          <CookieBanner
            setCookieBanner={setCookiesBanner}
            allOptions={allOptions}
          />
        )}
      </div>
    </>
  );
}

export default App;

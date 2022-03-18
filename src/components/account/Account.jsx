import "./account.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import AccountContent from "./accountContent/AccountContent";
import { useState, useEffect } from "react";
import { Person, Create, LocalOffer, Home } from "@material-ui/icons";
import outDateCookieSession from "../../functions/cookiesController/outDateCookieSession";
// import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
export default function Account({
  allOptions,
  setHomeContent,
  session,
  setSession,
  setPopupContent,
  setIsOpenPopup,
  isValidToken,
  setIsValidToken,
  lang,
}) {
  const [accountContent, setAccountContent] = useState(0);

  const [mobileView, setMobileView] = useState("menu");
  const callBackPopUp = () => {
    setIsOpenPopup(true);
    setTimeout(function () {
      setIsOpenPopup(false);
    }, 7000);
  };
  function endSession() {
    // logoutCall;
    if (session.length !== 0) {
      outDateCookieSession(session[0], session[1]);
      // alert("disconnected", session[0], session[1]);
      setSession([]);
      // setIsValidToken(false);

      setHomeContent("0");
      // setPopupContent("Disconnected");
      // callBackPopUp();
    } else {
      // alert("your Session expired!");
      setHomeContent("0");
      setSession([]);
      setIsValidToken(false);
    }
  }
  const changeContent = (e) => {
    setHomeContent(e.target.id);
    // console.log("click" + e.target.id);
  };
  // console.log(accountContent);
  return (
    <div id="account">
      <BackHomeButton setHomeContent={setHomeContent} />

      <div className="account__para-container">
        <div
          className={
            "account__menu-bar" + (mobileView === "menu" ? " mobileView" : "")
          }
        >
          {/*<BackHomeButton className="account__menu-bar-home" />*/}
          <div
            className="account__menu-bar-home"
            onClick={(e) => changeContent(e)}
          >
            {" "}
            <Home />
          </div>
          <div className="account__menubar-avatar-wrapper">
            <Person />
            <div className="account__pseudo">
              Welcome <span>{session[1]}</span>!
            </div>
          </div>{" "}
          <button className="btn" onClick={endSession}>
            Log out
          </button>
          <div className="account__menubar-menulist">
            <ul>
              <li
                onClick={() => {
                  setAccountContent(0);
                  setMobileView("content");
                }}
              >
                <Person /> My Account
              </li>
              <li
                onClick={() => {
                  setAccountContent(1);
                  setMobileView("content");
                }}
              >
                <Create /> My Posts
              </li>
              <li
                onClick={() => {
                  setAccountContent(2);
                  setMobileView("content");
                }}
              >
                <LocalOffer /> My Brands
              </li>
            </ul>
          </div>
        </div>
        <div
          className={
            "account__content-display " +
            (mobileView === "content" ? " mobileView" : null)
          }
        >
          <AccountContent
            accountContent={accountContent}
            session={session}
            setAccountContent={setAccountContent}
            mobileView={mobileView}
            setMobileView={setMobileView}
            lang={lang}
            setHomeContent={setHomeContent}
            isValidToken={isValidToken}
          />
        </div>
      </div>
    </div>
  );
}

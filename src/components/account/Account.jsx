import "./account.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import AccountContent from "./accountContent/AccountContent";
import { useState, useEffect, useContext } from "react";
import { Person, Create, LocalOffer, Home } from "@material-ui/icons";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../context functions/apiCalls";
export default function Account({ setHomeContent, setIsOpenPopup, lang }) {
  const { user, dispatch } = useContext(UserContext);
  const [accountContent, setAccountContent] = useState(0);

  const [mobileView, setMobileView] = useState("menu");
  const callBackPopUp = () => {
    setIsOpenPopup(true);
    setTimeout(function () {
      setIsOpenPopup(false);
    }, 7000);
  };
  function endSession() {
    logout(dispatch);
  }
  const changeContent = (e) => {
    setHomeContent(e.target.id);
  };

  return (
    <div id="account">
      <BackHomeButton setHomeContent={setHomeContent} />

      <div className="account__para-container">
        <div
          className={
            "account__menu-bar" + (mobileView === "menu" ? " mobileView" : "")
          }
        >
          <div
            className="account__menu-bar-home"
            onClick={(e) => changeContent(e)}
          >
            <Home />
          </div>
          <div className="account__menubar-avatar-wrapper">
            <Person />
            <div className="account__pseudo">
              Welcome <span>{user.pseudo}</span>!
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
            setAccountContent={setAccountContent}
            mobileView={mobileView}
            setMobileView={setMobileView}
            lang={lang}
            setHomeContent={setHomeContent}
          />
        </div>
      </div>
    </div>
  );
}

import "./account.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import AccountContent from "./AccountContent";
import { useState, useEffect } from "react";
import { Person, Create, LocalOffer } from "@material-ui/icons";
// import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
export default function Account({
  allOptions,
  setHomeContent,
  session,
  setSession,
  setPopupContent,
  setIsOpenPopup,
}) {
  const [accountContent, setAccountContent] = useState(0);
  const callBackPopUp = () => {
    setIsOpenPopup(true);
    setTimeout(function () {
      setIsOpenPopup(false);
    }, 7000);
  };
  function endSession() {
    if (session.length !== 0) {
      setSession([]);
      setHomeContent("0");
      // alert("disconnected");
      // setPopupContent("Disconnected");

      // callBackPopUp();
    } else {
      // alert("your Session expired!");
      setHomeContent("0");
      setSession([]);
    }
  }
  // console.log(accountContent);
  return (
    <div id="account">
      <BackHomeButton setHomeContent={setHomeContent} />

      <div className="account__para-container">
        <div className="account__menu-bar">
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
                }}
              >
                <Person /> My Account
              </li>
              <li
                onClick={() => {
                  setAccountContent(1);
                }}
              >
                <Create /> My Posts
              </li>
              <li
                onClick={() => {
                  setAccountContent(2);
                }}
              >
                <LocalOffer /> My Brands
              </li>
            </ul>
          </div>
        </div>
        <div className="account__content-display">
          <AccountContent
            accountContent={accountContent}
            session={session}
            setAccountContent={setAccountContent}
          />
        </div>
      </div>
    </div>
  );
}

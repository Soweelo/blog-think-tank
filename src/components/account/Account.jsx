import "./account.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import AccountContent from "./accountContent/AccountContent";
import { useState, useEffect, useContext } from "react";
import { Person, Home } from "@material-ui/icons";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../context functions/apiCalls";
import useTrait from "../../hooks/useTrait";
import AccountContentMenuItem from "./accountContentMenuItem";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";

export default function Account({
  setHomeContent,
  accountContent,
  setAccountContent,
  lang,
  mobileView,
  setMobileView,
  setAccountBrandForm,
  accountBrandForm,
  brandContent,
  setBrandContent,
  setIsOpenedPopup,
  setPopupContent,
  allOptions,
}) {
  const { user, dispatch } = useContext(UserContext);
  const [option_welcome, setOption_welcome] = useState("");
  const [option_logout, setOption_logout] = useState("");
  const [option_myposts, setOption_myposts] = useState("");
  const [option_myaccount, setOption_myaccount] = useState("");
  const [option_mylinks, setOption_mylinks] = useState("");
  // const changeMobileViewContent = useTrait(false)
  let menuItems = [
    {
      id: 0,
      name: option_myaccount,
    },
    {
      id: 1,
      name: option_myposts,
    },
    {
      id: 2,
      name: option_mylinks,
    },
  ];
  function endSession() {
    logout(dispatch);
  }
  const goBackHome = (e) => {
    setHomeContent(e.target.id);
  };

  useEffect(() => {
    setOption_welcome(getOptionByKey("06_welcome", allOptions));
    setOption_logout(getOptionByKey("06_logout", allOptions));
    setOption_myposts(getOptionByKey("06_myposts", allOptions));
    setOption_myaccount(getOptionByKey("06_myaccount", allOptions));
    setOption_mylinks(getOptionByKey("06_mylinks", allOptions));
  }, [allOptions]);
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
            onClick={(e) => goBackHome(e)}
          >
            <Home />
          </div>
          <div className="account__menubar-avatar-wrapper">
            <Person />
            <div className="account__pseudo">
              <span dangerouslySetInnerHTML={{ __html: option_welcome }}></span>
              <span>{" " + user.pseudo}</span>!
            </div>
          </div>
          <button
            className="btn"
            onClick={endSession}
            dangerouslySetInnerHTML={{ __html: option_logout }}
          ></button>
          <div className="account__menubar-menulist">
            <ul>
              {menuItems.map((menuItem) => {
                return (
                  <AccountContentMenuItem
                    key={menuItem.id}
                    id={menuItem.id}
                    name={menuItem.name}
                    setAccountContent={setAccountContent}
                    setMobileView={setMobileView}
                    mobileView={mobileView}
                  />
                );
              })}
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
            setMobileView={setMobileView}
            lang={lang}
            setHomeContent={setHomeContent}
            accountBrandForm={accountBrandForm}
            setAccountBrandForm={setAccountBrandForm}
            brandContent={brandContent}
            setBrandContent={setBrandContent}
            setPopupContent={setPopupContent}
            setIsOpenedPopup={setIsOpenedPopup}
            allOptions={allOptions}
          />
        </div>
      </div>
    </div>
  );
}

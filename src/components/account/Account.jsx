import "./account.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import AccountContent from "./accountContent/AccountContent";
import { useState, useEffect, useContext } from "react";
import { Person, Home } from "@material-ui/icons";
import { UserContext } from "../../context/UserContext";
import { logout } from "../../context functions/apiCalls";
import useTrait from "../../hooks/useTrait";
import AccountContentMenuItem from "./accountContentMenuItem";
export default function Account({ setHomeContent, accountContent, setAccountContent, lang, mobileView, setMobileView }) {
  const { user, dispatch } = useContext(UserContext);
 // const changeMobileViewContent = useTrait(false)
  let menuItems = [
    {
      id:0,
      name:"My Account",

  },
    {
      id:1,
      name:"My Posts"
    },
    {
      id:2,
      name:"My Brands"
    },
]
  function endSession() {
    logout(dispatch);
  }
  const goBackHome = (e) => {
    setHomeContent(e.target.id);
  };

  // useEffect(()=>{
  //   console.log("in change mobile view useeffest")
  //   if(changeMobileViewContent){
  //     if(changeMobileViewContent === "menu"){
  //       mobileView.set("content")
  //       console.log(mobileView.get())
  //     }
  //    changeMobileViewContent.set(false)
  //   }
  // },[changeMobileViewContent])
console.log(mobileView)
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
              Welcome <span>{user.pseudo}</span>!
            </div>
          </div>
          <button className="btn" onClick={endSession}>
            Log out
          </button>
          <div className="account__menubar-menulist">
            <ul>
              {menuItems.map((menuItem)=>{
               return(
                       <AccountContentMenuItem key={menuItem.id} id={menuItem.id} name={menuItem.name} setAccountContent={setAccountContent} setMobileView={setMobileView}  mobileView={mobileView}/>
                   )

              })}
              {/*<li*/}
              {/*  onClick={()=> {*/}
              {/*    handleClickMenuItem(0)*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <Person /> My Account*/}
              {/*</li>*/}
              {/*<li*/}
              {/*  onClick={()=>handleClickMenuItem(1)}*/}
              {/*>*/}
              {/*  <Create /> My Posts*/}
              {/*</li>*/}
              {/*<li*/}
              {/*  onClick={()=>handleClickMenuItem(2)}*/}
              {/*>*/}
              {/*  <LocalOffer /> My Links*/}
              {/*</li>*/}
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
          />
        </div>
      </div>
    </div>
  );
}

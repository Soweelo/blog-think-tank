import "./account.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import AccountContent from "./accountContent/AccountContent";
import {useState, useEffect, useContext} from "react";
import {Person, Home} from "@material-ui/icons";
import {UserContext} from "../../context/UserContext";
import {logout} from "../../context functions/apiCalls";
import useTrait from "../../hooks/useTrait";
import AccountContentMenuItem from "./accountContentMenuItem";

export default function Account({setHomeContent, accountContent, setAccountContent, lang, mobileView, setMobileView, setAccountBrandForm, accountBrandForm, brandContent, setBrandContent}) {
    const {user, dispatch} = useContext(UserContext);

    // const changeMobileViewContent = useTrait(false)
    let menuItems = [
        {
            id: 0,
            name: "My Account",
        },
        {
            id: 1,
            name: "My Posts"
        },
        {
            id: 2,
            name: "My Brands"
        },
    ]
    function endSession() {
        logout(dispatch);
    }
    const goBackHome = (e) => {
        setHomeContent(e.target.id);
    };
    return (
        <div id="account">
            <BackHomeButton setHomeContent={setHomeContent}/>
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
                        <Home/>
                    </div>
                    <div className="account__menubar-avatar-wrapper">
                        <Person/>
                        <div className="account__pseudo">
                            Welcome <span>{user.pseudo}</span>!
                        </div>
                    </div>
                    <button className="btn" onClick={endSession}>
                        Log out
                    </button>
                    <div className="account__menubar-menulist">
                        <ul>
                            {menuItems.map((menuItem) => {
                                return (
                                    <AccountContentMenuItem key={menuItem.id}
                                                            id={menuItem.id}
                                                            name={menuItem.name}
                                                            setAccountContent={setAccountContent}
                                                            setMobileView={setMobileView}
                                                            mobileView={mobileView}/>
                                )
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

                    />
                </div>
            </div>
        </div>
    );
}

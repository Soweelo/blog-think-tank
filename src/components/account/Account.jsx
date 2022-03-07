import "./account.scss";
import BackHomeButton from "../backHomeButton/BackHomeButton";
import AccountContent from "./AccountContent"
import { useState, useEffect } from "react";
import {Person} from "@material-ui/icons";
// import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
export default function Account({ allOptions, setHomeContent }) {
const [accountContent, setAccountContent] = useState(1)
    return (
        <div id="account">
            <BackHomeButton setHomeContent={setHomeContent} />
            {/*<h1 dangerouslySetInnerHTML={{ __html: option_faq }}></h1>*/}
            <h1>Welcome on your Account Pseudo!</h1>
            {/*<h2>Ready to post?</h2>*/}
            <div className="account__para-container">
<div className="account__menu-bar">
    <div className="account__menubar-avatar-wrapper">
        <Person/>
        <div>Pseudo</div>
        <button className="btn">Log out</button>
    </div>
    <div className="account__menubar-menulist">
        <ul>
            <li>My Account</li>
            <li>My Posts</li>
            <li>My tags</li>
        </ul>
    </div>

</div>
                <div className="account__content-display">
<AccountContent accountContent={accountContent}/>
                </div>
            </div>
        </div>
    );
}

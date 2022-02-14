import "./topbar.scss";
import { Person, Favorite, Search, EmojiObjects, GTranslate  } from "@material-ui/icons";
import {useState} from 'react';

export default function Topbar({homeContent, setHomeContent}) {
    const [isOpenedGT, setIsOpenedGT]= useState(false);



    return (
        <div className="topbar">
            <div className="wrapper">
                <div className="heading-left">
                    <p onClick={()=>{setHomeContent(0)}} className="heading-left__item">Your world 3.0</p>
                    {/*<div className=" heading__item siteName">BLOG</div>*/}
                </div>
                <div className="heading-center__item foster"> Read your favorite think tanks / <span>Create yours</span> </div>
                <div className="nav">
                    <div className="nav__link"><Favorite/></div>
                    <div className="nav__link"><Search/></div>
                    <div className="nav__link"><Person/></div>
                    <div className={"nav__link "+ (isOpenedGT && "active")} onClick={() => setIsOpenedGT(!isOpenedGT)}><GTranslate/>

                        <input className="nav__link-GT-input"   type="text"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
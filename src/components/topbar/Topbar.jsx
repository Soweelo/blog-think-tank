import "./topbar.scss";
import { Person, Favorite, Search, EmojiObjects  } from "@material-ui/icons";
export default function Topbar() {
    return (
        <div className="topbar">
            <div className="wrapper">
                <div className="heading-left">
                    <a href="#intro" className="heading-left__item">Your world 2.0</a>
                    {/*<div className=" heading__item siteName">BLOG</div>*/}
                </div>
                <div className="heading-center__item foster"> Read your favorite think tanks...<span>Create yours</span> </div>
                <div className="nav">
                    <div className="nav__link"><Favorite/></div>
                    <div className="nav__link"><Search/></div>
                    <div className="nav__link"><Person/></div>
                </div>
            </div>
        </div>
    );
}
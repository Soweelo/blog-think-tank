import "./topbar.scss";
import { Person, Favorite, Search, EmojiObjects  } from "@material-ui/icons";
export default function Topbar() {
    return (
        <div className="topbar">
            <div className="wrapper">
                <div className="heading">
                    <a href="#intro" className="heading__item"><EmojiObjects className="icon"/></a>
                    <div className=" heading__item siteName">BLOG</div>
                    <div className="heading__item foster"> Read your favorite think tanks  <span>Create yours</span> </div>
                </div>
                <div className="nav">
                    <div className="nav__link"><Favorite/></div>
                    <div className="nav__link"><Search/></div>
                    <div className="nav__link"><Person/></div>
                </div>
            </div>
        </div>
    );
}
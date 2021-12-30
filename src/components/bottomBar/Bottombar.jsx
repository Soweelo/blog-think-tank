import "./bottombar.scss";
import { Person } from "@material-ui/icons";
export default function Bottombar({mainMenuOpen, setMainMenuOpen}) {
    return (
        <div className={"bottombar " + (mainMenuOpen && " active")}>
            <div className="bottombar__item">
                <a href="#moreabout">more about us</a>
            </div>
            <div className="bottombar__item">
                <a href="#privacy">Privacy</a>
            </div>
            <div className="bottombar__item">
                <a href="#faq">faq</a>
            </div>
            <div className="bottombar__item">
                <a href="#bepart">Join the project</a>
            </div>
            <div className="bottombar__item">
                <a href="#"><Person/></a>
            </div>
            <div className="hamburger" onClick={()=>setMainMenuOpen(!mainMenuOpen)}>
                <span className="line1"></span>
                <span className="line2"></span>
                <span className="line3"></span>
            </div>
        </div>
    )
}
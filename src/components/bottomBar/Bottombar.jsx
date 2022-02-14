import "./bottombar.scss";
import { Person } from "@material-ui/icons";
export default function Bottombar({mainMenuOpen, setMainMenuOpen, homeContent, setHomeContent}) {
    const changeContent = (e) => {
        setHomeContent(e.target.id)
     }
    return (
        <div className={"bottombar " + (mainMenuOpen && " active")}>
            <div  className="bottombar__item" >
                <p  onClick={ (e) => changeContent(e)} id="1" >More about us</p>
            </div>
            <div className="bottombar__item">
                <p  onClick={ (e) => changeContent(e)} id="2" >Privacy</p>
            </div>
            <div className="bottombar__item">
                <p  onClick={ (e) => changeContent(e)} id="3" >FAQ</p>
            </div>
            <div className="bottombar__item">
                <p  onClick={ (e) => changeContent(e)} id="4" >Join the project</p>
            </div>
            <div className="bottombar__item">
                <p href="#"><Person/></p>
            </div>
            <div className="hamburger" onClick={()=>setMainMenuOpen(!mainMenuOpen)}>
                <span className="line1"></span>
                <span className="line2"></span>
                <span className="line3"></span>
            </div>
        </div>
    )
}
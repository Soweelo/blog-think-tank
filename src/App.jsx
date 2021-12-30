import Intro from "./components/intro/Intro"
import Topbar from "./components/topbar/Topbar"
import './app.scss';
import Bottombar from "./components/bottomBar/Bottombar";
import MoreAbout from "./components/moreAbout/MoreAbout";
import Privacy from "./components/privacy/Privacy";
import Faq from "./components/faq/Faq";
import BePart from "./components/bePart/BePart";
import {useState} from "react";
import MainMenu from "./components/mainMenu/MainMenu"
function App() {
    const[mainMenuOpen, setMainMenuOpen] = useState(false)

  return (
    <div className="app">
        <Topbar />
        <div className="sections">
            <Intro/>
            <MoreAbout/>
            <Privacy/>
            <Faq/>
            <BePart/>
        </div>

        <MainMenu mainMenuOpen={mainMenuOpen} setMainMenuOpen={setMainMenuOpen} />
        <Bottombar mainMenuOpen={mainMenuOpen} setMainMenuOpen={setMainMenuOpen} />
    </div>
  );
}

export default App;

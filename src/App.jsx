import Intro from "./components/intro/Intro";
import Topbar from "./components/topbar/Topbar";
import "./app.scss";
import Bottombar from "./components/bottomBar/Bottombar";
import MoreAbout from "./components/moreAbout/MoreAbout";
import Privacy from "./components/privacy/Privacy";
import Faq from "./components/faq/Faq";

import BePart from "./components/bePart/BePart";
import { useState, useEffect, memo } from "react";
import MainMenu from "./components/mainMenu/MainMenu";

import styled from "styled-components";
import axios from "axios";

function App() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [homeContent, setHomeContent] = useState("0");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [lang, setLang] = useState("");
  const SectionMain = styled.div`
    background-image: url("${PF}/storage/app/public/4.jpg");
  `;

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //     useEffect(() =>{
  //
  //     },[mainMenuOpen,homeContent, setHomeContent]
  // )

  //useEffect get options according to lang parameter
  // const [topBarContent, setTopbarContent] = useState([])
  // const [introContent, setIntroContent] = useState([])
  // const [bottomBarContent, setBottomBarContent] = useState([])
  // const [faqContent, setFaqContent] = useState([])
  // const [moreAboutContent, setMoreAboutContent] = useState([])
  // const [joinContent, setJoinContent] = useState([])

  useEffect(() => {
    if (getCookie("lang").length === 0) {
      setLang(navigator.language.substr(0, 2));

      // console.log("nocookie")
    } else {
      setLang(getCookie("lang"));
      // console.log("there is a cookie, now lang is updates to", lang)
    }

    // console.log("lang: ",lang,"navigator:", navigator.language,"getCookielang",getCookie(lang).length)
  }, []);

  // useEffect(() =>{
  //     setTopbarContent([])
  //     setBottomBarContent([])
  //     setIntroContent([])
  //     setFaqContent([])
  //     setMoreAboutContent([])
  //     setJoinContent([])
  //     const getOptions = async () => {
  //         const rep = await axios.get(PF +"/api/options?lang=" + lang)
  //
  //         rep.data.data.map((option) => {
  //             // console.log(option)
  //             if(option.key.substr(0,2) === "01"){
  //                 let arrayone = topBarContent
  //                 let  newContent = arrayone.push(option)
  //                 // console.log("each time arrayone",arrayone)
  //                 setTopbarContent(arrayone)
  //                 arrayone = []
  //                 newContent=""
  //             }else if(option.key.substr(0,2) === "05"){
  //                 let arrayfive = bottomBarContent
  //                 let  newContentfive = arrayfive.push(option)
  //                 // console.log("each time arrayfive",arrayfive)
  //                 setBottomBarContent(arrayfive)
  //                 arrayfive = []
  //                 newContentfive =""
  //             }else{
  //
  //             }
  //         })
  //     }
  //
  //     if( lang.length !== 0){
  //         getOptions()
  //     }
  //     console.log("useffect  de getlang se declenche", "lang", lang,"bottomContent",bottomBarContent,"topbar:",topBarContent )
  // },[lang])

  return (
    <>
      <div className="app">
        <Topbar
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          setLang={setLang}
          lang={lang}
        />
        <SectionMain className="sections">
          {/*<OnePageContent omeContent={homeContent} setHomeContent={setHomeContent}/>*/}
          {(() => {
            switch (homeContent) {
              case "1":
                return <MoreAbout lang={lang} />;
              case "2":
                return <Privacy lang={lang} />;

              case "3":
                return <Faq lang={lang} />;
              case "4":
                return <BePart lang={lang} />;

              default:
                return <Intro lang={lang} />;
            }
          })()}
        </SectionMain>

        <MainMenu
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          lang={lang}
        />
        <Bottombar
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
          homeContent={homeContent}
          setHomeContent={setHomeContent}
          lang={lang}
        />
      </div>
    </>
  );
}

export default App;

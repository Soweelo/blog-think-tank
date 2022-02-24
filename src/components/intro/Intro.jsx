import "./intro.scss";
import Menu from "../menu/Menu";
import ThinkTankList from "../thinktankList/ThinkTankList";
import { init } from "ityped";
import React, { useRef, useEffect, useState, memo } from "react";
// import { useScrollPosition, useScrollXPosition, useScrollYPosition } from 'react-use-scroll-position';
import { userFav } from "../../dummy";
// import {thinkTanks} from "../../dummy"
// import Scroll from"../scroll/scroll"
import axios from "axios";
import Scroll from "../scroll/scroll";
import { useFetch } from "../../hooks/useFetch";

export default memo(function Intro({ lang }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const fetch = useFetch();
  const [selectedTags, setSelectedTags] = useState([]);
  const textRef = useRef();
  const scrollRef = useRef();
  const [favorites, setFavorites] = useState(userFav);
  const [option_welcome_title, setOption_welcome_title] = useState("");
  const [allTags, setAllTags] = useState([]);

  // console.log(userFav)
  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      loop: false,
      backDelay: 1500,
      backSpeed: 60,
      strings: ["WORLD 1.0", "WORLD 2.0", "WORLD 3.0"],
    });
  }, []);

  useEffect(() => {
    // console.log("INTRO"," début chargementtags chargés dans l intro")
    const getTags = async () => {
      try {
        const response = await fetch(PF + "/api/tags").then((r) => r.json());
        // console.log(response.data);
        setAllTags(response.data);
        // console.log("INTRO","tags chargés dans l intro",answ.data.data)
      } catch (e) {
        if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
          console.error(e);
        }
      }
    };

    getTags();
  }, []);
  useEffect(() => {
    const getOptions = async (key) => {
      const welcome_title = await fetch(
        PF + "/api/options/getByKey?lang=" + lang + "&key=01_welcome"
      ).then((r) => r.json());
      if (welcome_title.data.value) {
        setOption_welcome_title(welcome_title.data.value);
      }
    };

    if (lang.length !== 0) {
      getOptions();
    }
    // console.log("useffect  de topbar", "lang", lsang,"bottomCcontecnt",bottomBarContent,"topbar:",topBarContent )
  }, [lang]);

  return (
    <div ref={scrollRef} className="intro" id="intro">
      {/*<Scroll showBelow="250"/>*/}

      <div className="intro__welcome" id="topIntro">
        <div className="intro__welcome-h2-wrapper">
          <h2>{option_welcome_title}</h2>
        </div>
        <h1>
          YOUR <span ref={textRef}></span>
        </h1>
        <Menu
          favorites={favorites}
          setFavorites={setFavorites}
          allTags={allTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          lang={lang}
        />
      </div>

      <ThinkTankList
        favorites={favorites}
        selectedTags={selectedTags}
        allTags={allTags}
        lang={lang}
      />
      <Scroll showBelow={400} />
    </div>
  );
});

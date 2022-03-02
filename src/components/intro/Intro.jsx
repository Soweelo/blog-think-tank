import "./intro.scss";
import Menu from "../menu/Menu";
import ThinkTankList from "../thinktankList/ThinkTankList";
import { init } from "ityped";
import React, { useRef, useEffect, useState, memo } from "react";

import { userFav } from "../../dummy";

import Scroll from "../scroll/scroll";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";

export default memo(function Intro({ lang, allOptions }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [selectedTags, setSelectedTags] = useState([]);
  const textRef = useRef();
  const scrollRef = useRef();
  const [favorites, setFavorites] = useState(userFav);
  const [option_welcome, setOption_welcome] = useState("");
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
        const response = await fetch(PF + "/api/tags", {
          enabled: !!lang,
        }).then((r) => r.json());
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
    setOption_welcome(getOptionByKey("01_welcome", allOptions));
  }, [allOptions]);
  return (
    <div ref={scrollRef} className="intro" id="intro">
      {/*<Scroll showBelow="250"/>*/}

      <div className="intro__welcome" id="topIntro">
        <div className="intro__welcome-h2-wrapper">
          <h2 dangerouslySetInnerHTML={{ __html: option_welcome }}></h2>
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
          allOptions={allOptions}
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

import "./intro.scss";
import Menu from "../menu/Menu";
import ThinkTankList from "../thinktankList/ThinkTankList";
import {init} from "ityped";
import React, {useRef, useEffect, useState, memo, useContext} from "react";
// import { userFav } from "../../dummy";
import Scroll from "../scroll/scroll";
import getOptionByKey from "../../functions/getOptionByKey/GetOptionByKey";
import {useFetch} from "../../hooks/useFetch";

import {UserContext} from "../../context/UserContext";
import WritePostBtn from "../writePostBtn/WritePostBtn";

export default memo(function Intro({
                                       allOptions,
                                       setHomeContent,
                                       setShowAuth,
                                       setRegisterContent,
                                       setAccountContent,
                                   }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {lang} = useContext(UserContext);
    const fetch = useFetch();
    const [selectedTags, setSelectedTags] = useState([]);
    // const textRef = useRef();
    const scrollRef = useRef();
    const [favorites, setFavorites] = useState([]);
    const [option_welcome, setOption_welcome] = useState("");
    const [allTags, setAllTags] = useState([]);

    // useEffect(() => {
    //     init(textRef.current, {
    //         showCursor: true,
    //         loop: false,
    //         backDelay: 1500,
    //         backSpeed: 60,
    //         strings: ["WORLD 1.0", "WORLD 2.0", "WORLD 3.0"],
    //     });
    // }, []);
    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await fetch(PF + "/api/tags?lang=" + lang).then((r) =>
                    r.json()
                );
                setAllTags(response.data);
            } catch (e) {
                if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
                    console.error(e);
                }
            }
        };
        getTags();
    }, [lang]);
    useEffect(() => {
        setOption_welcome(getOptionByKey("01_welcome", allOptions));
    }, [allOptions]);


    return (
        <div ref={scrollRef} className="intro" id="intro">
            <div className="intro__welcome" id="topIntro">
                {/*<div className="intro__welcome-h2-wrapper">*/}
                    {/*<h2 dangerouslySetInnerHTML={{__html: option_welcome}}></h2>*/}
                {/*</div>*/}
                {/*<h1>*/}
                {/*    YOUR <span ref={textRef}></span>*/}
                {/*</h1>*/}
                <Menu
                    favorites={favorites}
                    setFavorites={setFavorites}
                    allTags={allTags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    allOptions={allOptions}
                    setHomeContent={setHomeContent}
                    setShowAuth={setShowAuth}
                    setRegisterContent={setRegisterContent}
                />
            </div>

            <ThinkTankList
                favorites={favorites}
                selectedTags={selectedTags}
                allTags={allTags}
                setSelectedTags={setSelectedTags}
                setAccountContent={setAccountContent}
                setHomeContent={setHomeContent}
                setShowAuth={setShowAuth}
            />
            <Scroll showBelow={400}/>
            <div className="intro__writePostBtnWrapper">
                <WritePostBtn  setAccountContent={setAccountContent}
                               setHomeContent={setHomeContent} setShowAuth={setShowAuth} modal={false}/>
            </div>

        </div>
    );
});

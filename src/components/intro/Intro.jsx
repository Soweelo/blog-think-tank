import "./intro.scss"
import Menu from "../menu/Menu";
import ThinkTankList from "../thinktankList/ThinkTankList";
import { init } from 'ityped';
import React, { useRef, useEffect,useState, Component, useMemo } from 'react'
import ScrollBar from "../scrollBar/Scrollbar";
import { useScrollPosition, useScrollXPosition, useScrollYPosition } from 'react-use-scroll-position';
import {userFav} from "../../dummy"
import {thinkTanks} from "../../dummy"

export default function Intro(){
    const[selectedTags, setSelectedTags] = useState([])
    const textRef = useRef();
    const scrollRef = useRef();
    const [favorites, setFavorites] =useState(userFav);
    // console.log(userFav)
    useEffect(()=>{
        init(textRef.current, {
            showCursor: true,
            loop:       false,
            backDelay: 1500,
            backSpeed:60,
            strings: ['WORLD 1.0', 'WORLD 1.7','WORLD 2.0' ]
        })    },[])


    //function return all existing tags
    function allTags(datas){
        let allTags = [];
        let dataLength = datas.length;
        // console.log(datas)
        while(dataLength > 0){
            let curThinktankTagLength = datas[dataLength-1][1]["tags"].length;
            // console.log(curThinktankTagLength );
            while(curThinktankTagLength > 0){
                // console.log("le tag courant est " );
             let curThinktankTag = allTags.find((tag) => datas[dataLength-1][1]["tags"][curThinktankTagLength -1].name === tag)
            if(!curThinktankTag){
               allTags.push(datas[dataLength-1][1]["tags"][curThinktankTagLength -1].name )
            }
                curThinktankTagLength -= 1;
            }
            dataLength -= 1;
        }
    return allTags
    }


const  resultAllTags = useMemo(() => allTags(Object.entries(thinkTanks)),[thinkTanks]);

 
    return(
        <div  ref={scrollRef} className = "intro" id="intro" >
            <div className="intro__welcome">
                <h1>YOUR <span ref={textRef}></span></h1>
                <Menu favorites={favorites} setFavorites={setFavorites} allTags={resultAllTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
            </div>

            <ThinkTankList props={false} favorites={favorites} selectedTags={selectedTags}  allTags={resultAllTags}/>
            <ScrollBar scrollRef={scrollRef}></ScrollBar>

        </div>
    )
}
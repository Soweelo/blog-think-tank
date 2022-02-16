import "./intro.scss"
import Menu from "../menu/Menu";
import ThinkTankList from "../thinktankList/ThinkTankList";
import { init } from 'ityped';
import React, { useRef, useEffect,useState, Component, useMemo } from 'react'
import { useScrollPosition, useScrollXPosition, useScrollYPosition } from 'react-use-scroll-position';
import {userFav} from "../../dummy"
// import {thinkTanks} from "../../dummy"
// import Scroll from"../scroll/scroll"
import axios from "axios"


export default function Intro(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
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
            strings: ['WORLD 1.0', 'WORLD 2.0','WORLD 3.0' ]
        })    },[])
    

    const  [allTags, setAllTags] = useState([])
    useEffect(() => {
        const getTags = async () =>{
                const answ = await axios
                    .get(PF +"/api/tags")
                    setAllTags(answ.data.data)
                    console.log(answ.data.data)
        }
        getTags()
    },[])
    
    return(

        <div  ref={scrollRef} className = "intro" id="intro" >
            {/*<Scroll showBelow="250"/>*/}

            <div className="intro__welcome" id="topIntro">
                <h2>Hi welcome to</h2>
                <h1>YOUR <span ref={textRef}></span></h1>
                <Menu favorites={favorites} setFavorites={setFavorites} allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
                {/*<Menu favorites={favorites} setFavorites={setFavorites} allTags={resultAllTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>*/}
                {/*{console.log(allTags)}*/}
            </div>

            <ThinkTankList props={false} favorites={favorites} selectedTags={selectedTags}  allTags={allTags}/>
            {/*<ThinkTankList props={false} favorites={favorites} selectedTags={selectedTags}  allTags={resultAllTags}/>*/}


        </div>
    )
}

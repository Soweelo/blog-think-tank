import "./intro.scss"
import Menu from "../menu/Menu";
import ThinkTankList from "../thinktankList/ThinkTankList";
import { init } from 'ityped';
import React, { useRef, useEffect,useState, Component } from 'react'
import ScrollBar from "../scrollBar/Scrollbar";
import { useScrollPosition, useScrollXPosition, useScrollYPosition } from 'react-use-scroll-position';


export default function Intro(){
    const textRef = useRef();
    const scrollRef = useRef();
    useEffect(()=>{
        init(textRef.current, {
            showCursor: true,
            loop:       false,
            backDelay: 1500,
            backSpeed:60,
            strings: ['WORLD 1.0', 'WORLD 1.7','WORLD 2.0' ]
        })    },[])


 
    return(
        <div  ref={scrollRef} className = "intro" id="intro" >
            <div className="intro__welcome">
                <h1>YOUR <span ref={textRef}></span></h1>
                <Menu/>
            </div>

            <ThinkTankList props={false} />
            <ScrollBar scrollRef={scrollRef}></ScrollBar>

        </div>
    )
}
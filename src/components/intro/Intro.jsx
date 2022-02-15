import "./intro.scss"
import Menu from "../menu/Menu";
import ThinkTankList from "../thinktankList/ThinkTankList";
import { init } from 'ityped';
import React, { useRef, useEffect,useState, Component, useMemo } from 'react'
import { useScrollPosition, useScrollXPosition, useScrollYPosition } from 'react-use-scroll-position';
import {userFav} from "../../dummy"
import {thinkTanks} from "../../dummy"
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

    //backup localhost dummies

        // function return all existing tags
       // function allTags(datas){
       //      let allTags = [];
       //      let dataLength = datas.length;
       //      // console.log(datas)
       //      while(dataLength > 0){
       //          let curThinktankTagLength = datas[dataLength-1][1]["tags"].length;
       //          // console.log(curThinktankTagLength );
       //          while(curThinktankTagLength > 0){
       //              // console.log("le tag courant est " );
       //           let curThinktankTag = allTags.find((tag) => datas[dataLength-1][1]["tags"][curThinktankTagLength -1].name === tag)
       //          if(!curThinktankTag){
       //             allTags.push(datas[dataLength-1][1]["tags"][curThinktankTagLength -1].name )
       //          }
       //              curThinktankTagLength -= 1;
       //          }
       //          dataLength -= 1;
       //      }
       //  return allTags
       //  }

    //get tags with get request on api




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



    // end backup localhost dummies

    // // // // 1 1 1 test api acess:
    // const [allTags, setAllTags] = useState([])
    // useEffect(()=>{
    //     const fetchTags = async () =>  {
    //         const res = await axios.get("tags")
    //         setAllTags(res)
    //         console.log(res)
    //
    //     }
    //     fetchTags()
    //
    // },[])
    //
    //
    // //
    // //
    // //
    // // console.log(allTags)
    // //
    // //
    // // //function return all existing tags
    // // function getAllTags(datas){
    // //     let allTags = [];
    // //     let dataLength = datas.length;
    // //     // console.log(datas)
    // //     while(dataLength > 0){
    // //         let curThinktankTagLength = datas[dataLength-1][1]["tags"].length;
    // //         // console.log(curThinktankTagLength );
    // //         while(curThinktankTagLength > 0){
    // //             // console.log("le tag courant est " );
    // //          let curThinktankTag = allTags.find((tag) => datas[dataLength-1][1]["tags"][curThinktankTagLength -1].name === tag)
    // //         if(!curThinktankTag){
    // //            allTags.push(datas[dataLength-1][1]["tags"][curThinktankTagLength -1].name )
    // //         }
    // //             curThinktankTagLength -= 1;
    // //         }
    // //         dataLength -= 1;
    // //     }
    // // return allTags
    // // }
    // //
    // const assignValue = (array) => {
    //     let allTags = array
    //     return allTags
    // }
    // const  resultAllTags = useMemo(() => assignValue(allTags),[allTags]);
    // // // // 1 1 1 end test api acess
    //




    return(

        <div  ref={scrollRef} className = "intro" id="intro" >
            {/*<Scroll showBelow="250"/>*/}

            <div className="intro__welcome" id="topIntro">
                <h2>Hi welcome to</h2>
                <h1>YOUR <span ref={textRef}></span></h1>
                <Menu favorites={favorites} setFavorites={setFavorites} allTags={allTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
                {/*<Menu favorites={favorites} setFavorites={setFavorites} allTags={resultAllTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>*/}
                {console.log(allTags)}
            </div>

            <ThinkTankList props={false} favorites={favorites} selectedTags={selectedTags}  allTags={allTags}/>
            {/*<ThinkTankList props={false} favorites={favorites} selectedTags={selectedTags}  allTags={resultAllTags}/>*/}


        </div>
    )
}

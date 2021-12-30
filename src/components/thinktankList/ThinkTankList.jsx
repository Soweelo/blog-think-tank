import "./thinktanklist.scss"
import {thinkTanks} from "../../dummy"
import ThinkTankItem from "../thinkTankItem/ThinkTankItem"
import {useEffect, useState, memo} from "react"

  export default memo(function ThinkTankList({props}){
    function shuffleArray(array) {
        let curId = array.length;
        // There remain elements to shuffle
        while (0 !== curId) {
            // Pick a remaining element
            let randId = Math.floor(Math.random() * curId);
            curId -= 1;
            // Swap it with the current element.
            let tmp = array[curId];
            array[curId] = array[randId];
            array[randId] = tmp;
        }
        return array;
    }


    // let's convert object to array
    let newarray = Object.entries(thinkTanks);
// Usage of shuffle
     let randomthinkTanks = shuffleArray(newarray);
    let randomized = []
    {randomthinkTanks.map((p) => (
        randomized.push(p[1])))
    }
    // console.log(randomized)

    //now let's create a fonction to slice randomized in array of numGroup
    let randomizedPacks = [];
    let remainToSplice = randomized
    while(remainToSplice.length > 10){
        let b = remainToSplice.splice(0,10)
        // console.log(b)
        randomizedPacks.push(b)
    }
    randomizedPacks.push(remainToSplice)
    // console.log(randomizedPacks)


    return(
        <div className="big_container">
            {randomizedPacks.map((randomized) => (
                <div className="thinktanklist__container container">
                    {randomized.map((p,index) => (

                        <div className={`areas area${index + 1}`}>
                            <ThinkTankItem
                                id={p.id}
                                message={p.message}
                                url={p.url}
                                image={p.image}
                                tags ={p.tags}/>
                        </div>
                    ))}
                </div>
            ))}
        </div>


    )

})

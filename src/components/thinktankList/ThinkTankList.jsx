
import "./thinktanklist.scss"
import {thinkTanks} from "../../dummy"
import axios from 'axios';

import ThinkTankItem from "../thinkTankItem/ThinkTankItem"
import {useEffect, useState, memo, useMemo} from "react"
import Modal from "../modal/Modal";

export default memo(function ThinkTankList({props, favorites, selectedTags ,allTags}) {

    let tagsToDisplay = (selectedTags.length === 0) ? allTags : selectedTags;
// const [tagsToDisplay,setTagsToDisplay]
    //fonction shuffle
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

    //fonction isFav, return true or false, prends un parametre un tableau de thinktankdata (correspond à un thinktank avec ses caracteristiques) et un tableau de selection
    function isSelected(data, selection=[]) {
        let result = false
        let curDataTagsLength = data[1]["tags"].length;

        while(curDataTagsLength >0){
            const curThinktankTag = selection.find((tag) => data[1]["tags"][curDataTagsLength -1].name === tag)
            if(curThinktankTag){
                result = true
                return result
            }
            curDataTagsLength -= 1;
        }
        return result
    }



    //set modal vars and set open modal
    const [modalVar, setModalVar] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }
    // console.log(modalVar)




    function pickAndShuffle(datas,selected=[]){
        let datasLength = datas.length
        let selectedDatas = []

        //select the favorites thinkTanks
        while(datasLength > 0){
            if( isSelected(datas[datasLength - 1],selected)){
                selectedDatas.push(datas[datasLength - 1])
            }
            // console.log(datas[datasLength - 1])
            datasLength -= 1
        }
        // console.log(selectedDatas)

        //shuffle and pack the favorites thinkTanks
        let randomthinkTanks = shuffleArray(selectedDatas);
        let randomized = []
        {
            randomthinkTanks.map((p) => (
                randomized.push(p[1])))
        }
        // console.log(randomized)

        //now let's create a fonction to slice randomized in array of numGroup
        let pickedAndShuffledPacks = [];
        let remainToSplice = randomized
        while (remainToSplice.length > 12) {
            let b = remainToSplice.splice(0, 12)
            // console.log(b)
            pickedAndShuffledPacks.push(b)
        }
        pickedAndShuffledPacks.push(remainToSplice)
        // console.log(pickedAndShuffledPacks)
        return pickedAndShuffledPacks

    }
// pickAndShuffle(Object.entries(thinkTanks),favorites)
//
//     const finalData = useMemo( () =>
//         pickAndShuffle(Object.entries(thinkTanks), tagsToDisplay),[tagsToDisplay])
    // FIN ESSAI ESSAI ESSAI ESSAI







    //get data with post request on api

        const  [thinkTanks, setThinkTanks] = useState({})
        useEffect(() => {
            const getData = async () =>{
                const request = {
                    limit : 10,
                    offset: 0,
                    tags:["fashion", "IA"],
                    lang: "fr",
                }
                try {
                    const res = await axios.post("posts/find", request)
                    setThinkTanks(res.data)
                }
                catch (e) {

                }
            }
            getData()
        },[tagsToDisplay])
    //
        const finalData = useMemo( () =>
            pickAndShuffle(Object.entries(thinkTanks), tagsToDisplay),[tagsToDisplay])



    //end get data with post request on api






    return(
        <div className="big_container">
            {finalData.map((randomized, index) => (
                <div key={index} className={`thinktanklist__container container and${index}`}>

                    {randomized.map((p,index) => (

                        <div key={index} className={`areas area${index + 1}`} >
                            <ThinkTankItem
                                id={p.id}
                                message={p.message}
                                url={p.url}
                                image={p.image}
                                tags ={p.tags}
                                text={p.text}
                                date={p.date}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                modalVar={modalVar}
                                setModalVar={setModalVar}
                                onClick={openModal}
                            />

                        </div>
                    ))}
                </div>
            ))}
            <Modal showModal={showModal}  setShowModal={setShowModal} image={modalVar[0]} message={modalVar[1]} url={modalVar[3]} tags={modalVar[2]} text={modalVar[4]} date={modalVar[5]}></Modal>
            {console.log(modalVar)}
        </div>



    )

})
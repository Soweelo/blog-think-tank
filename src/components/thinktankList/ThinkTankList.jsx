
import "./thinktanklist.scss"
// import {thinkTanks} from "../../dummy"
import axios from 'axios';
import ThinkTankItem from "../thinkTankItem/ThinkTankItem"
import {useEffect, useState, memo, useMemo, useCallback} from "react"
import Modal from "../modal/Modal";

export default memo(function ThinkTankList({props, favorites, tagsToDisplay ,allTags, lang}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    //set modal vars and set open modal
    const [modalVar, setModalVar] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }
    // console.log(modalVar)


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

    function pickAndShuffle(datas){
        //shuffle and pack the thinktanks
        let randomthinkTanks = shuffleArray(datas);
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

    //get data with post request on api
     
        const  [thinkTanks, setThinkTanks] = useState({})
    // console.log("THINKTANKLIST","before useffect","alltags: ", allTags ,"  tags to display : ", tagsToDisplay)
        useEffect(() => {

            const getData = async () =>{
                // setTagsToDisplay(selectedTags.length !== 0 ? selectedTags : allTags)
                // console.log("THINKTANKLIST","boucle de useffect commune: getData. vérifier TagstoDisplay ",tagsToDisplay)
                const request = {
                    limit :30,
                    offset: 1,
                    tags: tagsToDisplay,
                    lang: lang,
                }
                   try {
                    await axios
                        .post(PF +"/api/posts/find", request)
                        .then((response) => {
                            setThinkTanks(response.data.data)
                        })
                }
                catch (e) {
                }
            }

            getData()
// console.log("THINKTANKLIST","think tank avant formattage, une boucle de useeffect", thinkTanks)
        },[allTags, tagsToDisplay])

    //


    // const finalData = useMemo( () =>
    //     pickAndShuffle(Object.entries(thinkTanks), allTags),[allTags,tagsToDisplay,setTagsToDisplay,selectedTags])

const allData = useMemo(function (){
    // console.log("*THINKTANKS USE MEMO ALLDATA, VALEUR tags to display:",tagsToDisplay ,"thinkktank", thinkTanks)
        return(

            pickAndShuffle(Object.entries(thinkTanks))
        )

    },[thinkTanks,tagsToDisplay])

    //end get data with post request on api

// console.log("THINKTANKLIST","data formatté en dehors du useeffect",allData)//




    return(
        <div className="big_container">
            {/*{console.log('le component re render')}*/}
            {allData.map((randomized, index) => (
                <div key={index} className={`thinktanklist__container container and${index}`}>

                    {randomized.map((p,index) => (

                        <div key={index} className={`areas area${index + 1}`} >
                            {/*{console.log(p.brand)}*/}
                            <ThinkTankItem
                                id={p.id}
                                title={p.member.pseudo}
                                brand = {p.brand !== null ? p.brand.name : 0}
                                url={p.brand !== null ? p.brand.link : 0}
                                images={p.images}
                                tags ={p.tags}
                                text={p.content}
                                date={p.updated_at}
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
            <Modal showModal={showModal}  setShowModal={setShowModal} images={modalVar[0]} title={modalVar[1]} url={modalVar[3]} tags={modalVar[2]} text={modalVar[4]} date={modalVar[5]}></Modal>
            {/*{console.log(modalVar)}*/}
        </div>



    )

})

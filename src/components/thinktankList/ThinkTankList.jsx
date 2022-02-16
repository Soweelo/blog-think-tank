
import "./thinktanklist.scss"
// import {thinkTanks} from "../../dummy"
import axios from 'axios';
import ThinkTankItem from "../thinkTankItem/ThinkTankItem"
import {useEffect, useState, memo, useMemo} from "react"
import Modal from "../modal/Modal";

export default memo(function ThinkTankList({props, favorites, selectedTags ,allTags}) {

    //
    // useEffect(() => {
    //     const updateTags = async () => {
    //         (selectedTags.length == 0) ? setTagsToDisplay(allTags) : setTagsToDisplay(selectedTags)
    //         console.log("boucle de useffect updatetags")
    //     }
    //     updateTags()
    //     }, [ allTags, selectedTags, favorites]
    // )
    const PF = process.env.REACT_APP_PUBLIC_FOLDER



    // let tagsToDisplay = (selectedTags.length === 0) ? allTags : selectedTags;
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

    //fonction isFav, return true or false, prends en parametre un tableau de thinktankdata (correspond à un thinktank avec ses caracteristiques) et un tableau de selection
    function isSelected(data, selection=[]) {
        let result = false
// console.log(data)
        let curDataTagsLength = data[1]["tags"].length;

        while(curDataTagsLength >0){

            const curThinktankTag = selection.find((tag) => data[1]["tags"][curDataTagsLength -1] === tag)

            if(curThinktankTag){
                result = true
                return result
            }
            curDataTagsLength -= 1;
        }
        // console.log(result)
        // return result resultat à retourner pour controller les selected tags
        return result
    }



    //set modal vars and set open modal
    const [modalVar, setModalVar] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }
    // console.log(modalVar)




    function pickAndShuffle(datas,selected=[allTags]){
        // let datasLength = datas.length


        //shuffle and pack the favorites thinkTanks
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
        const [tagsToDisplay, setTagsToDisplay]=  useState(allTags)
        const  [thinkTanks, setThinkTanks] = useState({})
    console.log("before useffect","alltags: ", allTags ,"  tags to display : ", tagsToDisplay,"  selected tags : ", selectedTags,"les favoris ",favorites)
        useEffect(() => {
            const updateTags = async () => {
                (selectedTags.length == 0) ? setTagsToDisplay(allTags) : setTagsToDisplay(selectedTags)
                console.log("boucle de useffect commune: updattags")
            }
            updateTags()
            const getData = async () =>{
                // setTagsToDisplay(selectedTags.length !== 0 ? selectedTags : allTags)
                console.log("boucle de useffect commune: getData. vérifier TagstoDisplay ",tagsToDisplay)
                const request = {
                    limit :30,
                    offset: 1,
                    tags:tagsToDisplay,
                    lang: "fr",
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
console.log("think tank avant formattage, une boucle de useeffect", thinkTanks)
        },[allTags, selectedTags,favorites])

    //


    // const finalData = useMemo( () =>
    //     pickAndShuffle(Object.entries(thinkTanks), allTags),[allTags,tagsToDisplay,setTagsToDisplay,selectedTags])

const allData = pickAndShuffle(Object.entries(thinkTanks), tagsToDisplay)
    //end get data with post request on api

console.log("data formatté en dehors du useeffect",allData)//




    return(
        <div className="big_container">
            {console.log('le component re render')}
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

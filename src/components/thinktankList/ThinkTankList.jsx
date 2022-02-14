import "./thinktanklist.scss"
// import {thinkTanks} from "../../dummy"
import axios from "axios"
import ThinkTankItem from "../thinkTankItem/ThinkTankItem"
import {useEffect, useState, memo, useMemo} from "react"
import Modal from "../modal/Modal"
import Scroll from"../scroll/scroll"



  export default memo(function ThinkTankList({props, favorites, selectedTags  ,allTags}) {

      const PF = process.env.REACT_APP_PUBLIC_FOLDER
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
          // let curDataTagsLength = data[1]["tags"].length; version pour les dummies
console.log('data')
          // let curDataTagsLength = data.data["tags"].length;

          // while(curDataTagsLength >0){
          //     const curThinktankTag = selection.find((tag) => data[1]["tags"][curDataTagsLength -1].name === tag)
          //     if(curThinktankTag){
          //         result = true
          //         return result
          //     }
          //     curDataTagsLength -= 1;
          // }
          // return result
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


      // 0 0 0 backup dummy access:
      //     const finalData = useMemo( () =>
      //
      //         pickAndShuffle(Object.entries(thinkTanks), tagsToDisplay),[tagsToDisplay]
      //     )
      // 0 0 0 end backup dummy access



      // // 1 1 1 test api acess:
      //   const [thinkTanks, setThinkTanks] = useState([])
      //   useEffect(()=>{
      //       const fetchPosts = async () =>  {
      //           const res = await axios.get("posts")
      //           setThinkTanks(res.data.data)
      //           console.log(res.data.data)
      //       }
      //       fetchPosts()
      //
      //   },[])
      //
      // const finalData = useMemo( () =>
      //    // pickAndShuffle(Object.entries(thinkTanks), tagsToDisplay),[tagsToDisplay] une fois la gestion des tags activées il faudra utiliser selected tags
      //    pickAndShuffle(Object.entries(thinkTanks), allTags)
      // )
      // console.log(finalData)
      // //
      // // 1 1 1 end test api acess
      // // 2 2 2 test api acess:
      const [thinkTanks, setThinkTanks] = useState([])

      useEffect(()=>{
          const fetchPosts =  async () =>  {
              const request = {
                  limit : 10,
                  offset :0,
                  tags: ["recyclage"],
                  lang : "fr"

              }
              try{
                  const res = await axios.post("posts/find", request)
                  console.log(res.status);
                  console.log(res.data);
                  setThinkTanks(res.data);
              }catch(err){
                    console.log("une erreur de requête est survenue")
              }
          }

      },[])

      const finalData = useMemo( () =>
         // pickAndShuffle(Object.entries(thinkTanks), tagsToDisplay),[tagsToDisplay] une fois la gestion des tags activées il faudra utiliser selected tags
         pickAndShuffle(Object.entries(thinkTanks), allTags)
      )
      console.log(finalData)
      //
      // // 2 2 2 end test api acess
    return(
        <div className="big_container">
            {finalData.map((randomized, index) => (
                <div key={index} className={`thinktanklist__container container and${index}`}>

                    {randomized.map((p,index) => (
                        <div key={index} className={`areas area${index + 1}`} >
                    {console.log(p)}

                        <ThinkTankItem
                                id={p.id}
                                message={p.member.pseudo}
                                url={p.url}
                                image={p.images ? p.images :  "11.jpg"}
                                tags ={p.tags}
                                text={p.content}
                                date={p.date ? p.date :  p.member.created_at}
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
            <Scroll showBelow={250}/>

            <Modal showModal={showModal}  setShowModal={setShowModal} image={modalVar[0]} message={modalVar[1]} url={modalVar[3]} tags={modalVar[2]} text={modalVar[4]} date={modalVar[5]}></Modal>
            {/*{console.log(modalVar)}*/}
        </div>



    )

})

import "./thinktanklist.scss"
import {thinkTanks} from "../../dummy"
import ThinkTankItem from "../thinkTankItem/ThinkTankItem"
import {useEffect, useState, memo, useMemo} from "react"
import Modal from "../modal/Modal";

  export default memo(function ThinkTankList({props}) {

      let favorites = ["new","others","fashion"];

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

      //fonction isFav, return true or false, prends un parametre un tableau de thinktankdata (correspond à un thinktank avec ses caracteristiques) et un tableau de favoris
      function isFav(data, favs=[]) {
          let result = false
          let curDataTagsLength = data[1]["tags"].length;

          while(curDataTagsLength >0){
              const curThinktankTag = favs.find((tag) => data[1]["tags"][curDataTagsLength -1].name === tag)
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


//ESSAI ESSAI ESSAI ESSAI

function pickAndShuffle(datas,favs=[]){
    let datasLength = datas.length
    let selectedDatas = []

    //select the favorites thinkTanks
        while(datasLength > 0){
            if( isFav(datas[datasLength - 1],favs)){
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
    console.log(pickedAndShuffledPacks)
    return pickedAndShuffledPacks

}
// pickAndShuffle(Object.entries(thinkTanks),favorites)

      const randomizedPacks = useMemo( () =>
          pickAndShuffle(Object.entries(thinkTanks), favorites),[Object.entries(thinkTanks), favorites])
  // FIN ESSAI ESSAI ESSAI ESSAI

    return(
        <div className="big_container">
            {randomizedPacks.map((randomized, index) => (
                <div key={index} className={`thinktanklist__container container and${index}`}>

                    {randomized.map((p,index) => (

                        <div key={index} className={`areas area${index + 1}`} >
                            <ThinkTankItem
                                id={p.id}
                                message={p.message}
                                url={p.url}
                                image={p.image}
                                tags ={p.tags}
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
            <Modal showModal={showModal}  setShowModal={setShowModal} image={modalVar[0]} message={modalVar[1]} url={modalVar[3]} tags={modalVar[2]}></Modal>
            {/*{console.log(modalVar[2])}*/}
        </div>



    )

})

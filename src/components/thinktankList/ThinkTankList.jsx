import "./thinktanklist.scss";
// import {thinkTanks} from "../../dummy"
// import axios from "axios";
import ThinkTankItem from "../thinkTankItem/ThinkTankItem";
import { useEffect, useState, memo, useMemo } from "react";
import Modal from "../modal/Modal";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../loader/Loader";
export default memo(function ThinkTankList({
  favorites,
  selectedTags,
  allTags,
  lang,
}) {
  const fetch = useFetch();
  const [loading, setLoading] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //set modal vars and set open modal
  const [modalId, setModalId] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tagsToDisplay, setTagsToDisplay] = useState([]);
  const openModal = () => {
    setShowModal(true);
  };
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

  function pickAndShuffle(datas) {
    //shuffle and pack the thinktanks
    let randomthinkTanks = shuffleArray(datas);
    let randomized = [];
    randomthinkTanks.map((p) => randomized.push(p[1]));
    // console.log(randomized)

    //now let's create a fonction to slice randomized in array of numGroup
    let pickedAndShuffledPacks = [];
    let remainToSplice = randomized;
    while (remainToSplice.length > 12) {
      let b = remainToSplice.splice(0, 12);
      // console.log(b)
      pickedAndShuffledPacks.push(b);
    }
    pickedAndShuffledPacks.push(remainToSplice);
    // console.log(pickedAndShuffledPacks)
    return pickedAndShuffledPacks;
  }

  useEffect(() => {
    selectedTags.length !== 0
      ? setTagsToDisplay(selectedTags)
      : setTagsToDisplay(allTags);
    // console.log("INTRO","nouveau tags to display recupéré dans l intro",tagsToDisplay)
  }, [allTags, selectedTags]);

  //get data with post request on api

  const [thinkTanks, setThinkTanks] = useState({});
  // console.log("THINKTANKLIST","before useffect","alltags: ", allTags ,"  tags to display : ", tagsToDisplay)
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      // setTagsToDisplay(selectedTags.length !== 0 ? selectedTags : allTags)
      // console.log("THINKTANKLIST","boucle de useffect commune: getData. vérifier TagstoDisplay ",tagsToDisplay)
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: 1000,
          offset: 0,
          tags: selectedTags,
          lang: lang,
        }),
      };
      try {
        const response = await fetch(PF + "/api/posts/find", requestOptions);
        const data = await response.json();
        // console.log(data.data);
        setThinkTanks(data.data);

        setLoading(false);
      } catch (e) {
        if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
          console.error(e);
        }
      }
    };
    if (lang.length !== 0) {
      getData();
      // console.log(thinkTanks);
    }

    // console.log("THINKTANKLIST","think tank avant formattage, une boucle de useeffect", thinkTanks)
  }, [selectedTags]);

  //

  // const finalData = useMemo( () =>
  //     pickAndShuffle(Object.entries(thinkTanks), allTags),[allTags,tagsToDisplay,setTagsToDisplay,selectedTags])

  const allData = useMemo(
    function () {
      // console.log(thinkTanks);
      // console.log("*THINKTANKS USE MEMO ALLDATA, VALEUR tags to display:",tagsToDisplay ,"thinkktank", thinkTanks)
      // alert("thinktank list re shuffles");
      return pickAndShuffle(Object.entries(thinkTanks));
    },
    [thinkTanks, tagsToDisplay]
  );

  //end get data with post request on api

  // console.log("THINKTANKLIST","data formatté en dehors du useeffect",allData)//

  return (
    <div className="big_container">
      {<Loader loading={loading} />}

      {/*{console.log('le component re render')}*/}
      {allData.map((randomized, index) => (
        <div
          key={index}
          className={`thinktanklist__container container and${index}`}
        >
          {randomized.map((p, index) => (
            <div key={index} className={`areas area${index + 1}`}>
              {/*{console.log(p.brand)}*/}
              <ThinkTankItem
                id={p.id}
                title={p.member.pseudo}
                brand={p.brand !== null ? p.brand.name : 0}
                url={p.brand !== null ? p.brand.link : 0}
                images={p.images}
                tags={p.tags}
                text={p.content}
                date={p.updated_at}
                showModal={showModal}
                setShowModal={setShowModal}
                modalId={modalId}
                setModalId={setModalId}
                onClick={openModal}
              />
            </div>
          ))}
        </div>
      ))}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        id={modalId}
        lang={lang}
      ></Modal>
      {/*{console.log(modalVar)}*/}
    </div>
  );
});

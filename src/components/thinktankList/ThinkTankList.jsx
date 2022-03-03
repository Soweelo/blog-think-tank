import "./thinktanklist.scss";
// import {thinkTanks} from "../../dummy"
// import axios from "axios";
import ThinkTankItem from "../thinkTankItem/ThinkTankItem";
import { useEffect, useState, memo, useMemo, useRef } from "react";
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
  const [loadingModal, setLoadingModal] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //set modal vars and set open modal
  const [text, setText] = useState("");
  const [modalVar, setModalVar] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tagsToDisplay, setTagsToDisplay] = useState([]);
  const openModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    const getModalContent = async () => {
      setLoadingModal(true);
      // console.log(modalVar[7]);
      try {
        // console.log(id);
        const response = await fetch(
          PF + "/api/posts/" + modalVar[7] + "/getById?lang=" + lang,
          {
            enabled: !!modalVar[7] && !!lang,
          }
        );
        const data = await response.json();
        // console.log(data.data);

        // console.log(data.data.content);
        // console.log(data.data.content.content);
        setText(
          data.data.content.content
            ? data.data.content.content
            : data.data.content
        );
        setLoadingModal(false);
      } catch (e) {
        if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
          console.error(e);
        }
      }
    };
    if (showModal) {
      // console.log("ok");
      getModalContent();
    }
  }, [showModal]);
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

  // const [loading, setLoading] = useState(true);
  const [allThinkTanks, setallThinkTanks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [lastElement, setLastElement] = useState(null);
  // const [lastgroup, setLastGroup] = useState([]);
  const groupLimit = 12;
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [stopRequest, setStopRequest] = useState(false);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setOffset((no) => no + groupLimit);
      }
    })
  );

  const callThinktank = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        limit: groupLimit,
        offset: offset,
        tags: [],
        lang: "en",
      }),
    };
    try {
      let response = await fetch(
        "https://api.yworld3.com/api/posts/find",
        requestOptions
      );
      let data = await response.json();
      let all = new Set([...allThinkTanks, ...data.data]);
      console.log(data.data.length);
      if (data.data.length === 0 || data.data.length < groupLimit) {
        setStopRequest(true);
        console.log("limit so set stop request to", stopRequest);
      }

      // console.log("lastgroup set with new data",lastgroup)
      // console.log("new data",data.data)
      setallThinkTanks([...all]);
      setLoading(false);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (!stopRequest) {
      callThinktank();
    }
  }, [offset]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const allData = useMemo(
    function () {
      // console.log(thinkTanks);
      // console.log("*THINKTANKS USE MEMO ALLDATA, VALEUR tags to display:",tagsToDisplay ,"thinktank", thinkTanks)
      // alert("thinktank list re shuffles");
      return pickAndShuffle(Object.entries(allThinkTanks));
    },
    [allThinkTanks, tagsToDisplay, lang]
  );

  //end get data with post request on api

  // console.log("THINKTANKLIST","data formatté en dehors du useeffect",allData)//

  return (
    <div className="big_container">
      {<Loader loading={loading} />}
      {console.log("alldata", allData)}
      {/*{console.log('le component re render')}*/}
      {allData.map((randomized, index) => (
        <div
          key={index}
          className={`thinktanklist__container container and${index}`}
        >
          {console.log("one data called randomized", randomized)}
          {allThinkTanks.length > 0 &&
            allThinkTanks.map((p, i) => {
              return i === allThinkTanks.length - 1 &&
                !loading &&
                !stopRequest ? (
                <div
                  key={`${p.id}-${i}`}
                  ref={setLastElement}
                  className={`areas area${(i % 12) + 1}`}
                >
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
                    modalVar={modalVar}
                    setModalVar={setModalVar}
                    onClick={openModal}
                  />
                </div>
              ) : (
                <div key={index} className={`areas area${(i % 12) + 1}`}>
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
                    modalVar={modalVar}
                    setModalVar={setModalVar}
                    onClick={openModal}
                  />
                </div>
              );
            })}
        </div>
      ))}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        images={modalVar[0]}
        title={modalVar[1]}
        url={modalVar[3]}
        tags={modalVar[2]}
        text={text}
        date={modalVar[5]}
        loadingModal={loadingModal}
      ></Modal>
      {/*{console.log(modalVar)}*/}
    </div>
  );
});

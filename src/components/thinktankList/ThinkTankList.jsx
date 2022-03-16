import "./thinktanklist.scss";
// import {thinkTanks} from "../../dummy"
// import axios from "axios";
import ThinkTankItem from "../thinkTankItem/ThinkTankItem";
import { useEffect, useState, memo, useMemo, useRef } from "react";
import Modal from "../modal/Modal";
import { useFetch } from "../../hooks/useFetch";
import Loader from "../loader/Loader";
import useTrait from "../../hooks/useTrait";
import { format } from "timeago.js";
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
  const [text, setText] = useState("");
  const [modalVar, setModalVar] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const tagsToDisplay = useTrait([]);
  const bigArray = useTrait([]);
  const [allThinkTanks, setallThinkTanks] = useState([]);
  const offset = useTrait(0);
  const [lastElement, setLastElement] = useState(null);
  const groupLimit = 12;
  const [stopRequest, setStopRequest] = useState(false);
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        offset.set((no) => no + groupLimit);
        // alert("new request");
      }
    })
  );
  const openModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    const getModalContent = async () => {
      setLoadingModal(true);
      try {
        const response = await fetch(
          PF + "/api/posts/" + modalVar[7] + "/getById?lang=" + lang,
          {
            enabled: !!modalVar[7] && !!lang,
          }
        );
        const data = await response.json(); // console.log(data.data.content);
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

  const callThinktank = async () => {
    setLoading(true);
    // console.log("in request. selected tags", selectedTags);
    // console.log("in request. tagsToDisplay", tagsToDisplay.get());
    // console.log("in request. offset", offset);
    // console.log("bigarray au debut de la requete", bigArray.get());
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        limit: groupLimit,
        offset: offset.get(),
        tags: tagsToDisplay.get(),
        lang: lang,
      }),
    };
    try {
      let response = await fetch(
        "https://api.yworld3.com/api/posts/find",
        requestOptions
      );
      let data = await response.json();
      let all = new Set([...allThinkTanks, ...data.data]);

      let newPack = {
        firstProperty: containerCount,
        secondProperty: shuffleArray(data.data),
      };
      let newarray = [...bigArray.get()];
      // console.log("newpack", newPack);
      newarray.push(newPack);
      bigArray.set(newarray);
      if (data.data.length === 0 || data.data.length < groupLimit) {
        setStopRequest(true);
      }

      setLoading(false);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    selectedTags.length !== 0
      ? tagsToDisplay.set(selectedTags)
      : tagsToDisplay.set([]);
    bigArray.set([]);
    // console.log(bigArray);
    offset.set(0);
    // console.log(offset.get());
    setContainerCount(0);
    setStopRequest(false);
    // console.log("ok set");
    callThinktank();
  }, [selectedTags, allTags]);
  // console.log("selected Tags", selectedTags, "tags to display", tagsToDisplay);

  useEffect(() => {
    // console.log(stopRequest);
    if (!stopRequest && !loading) {
      callThinktank();
      setContainerCount(containerCount + 1);
    }
  }, [offset.get()]);
  useEffect(() => {
    const currentElement = lastElement;
    // console.log(lastElement);
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

  const [containerCount, setContainerCount] = useState(0);
  return (
    <div className="big_container">
      {/*{<Loader loading={loading} />}*/}
      {/*{console.log("***********")}*/}
      {/*{console.log("allthinktanks", allThinkTanks)}*/}
      {/*{console.log("bigarrayget", bigArray.get().length)}*/}
      {bigArray.get().map((packOfTwelve, counter) => {
        // console.log("packOfTwelve", packOfTwelve.secondProperty.length);
        // }
        // console.log(lang);

        return (
          packOfTwelve.secondProperty.length !== 0 && (
            <div
              className={`thinktanklist__container container and${counter}`}
              key={counter}
            >
              {packOfTwelve.secondProperty.map((p, i) => {
                return i === packOfTwelve.secondProperty.length - 1 &&
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
                  <div key={i} className={`areas area${(i % 12) + 1}`}>
                    <ThinkTankItem
                      id={p.id}
                      title={p.member.pseudo}
                      brand={p.brand !== null ? p.brand.name : 0}
                      url={p.brand !== null ? p.brand.link : 0}
                      images={p.images}
                      tags={p.tags}
                      text={p.content}
                      date={format(p.updated_at, lang)}
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
          )
        );
      })}

      {loading && (
        <div className="scroll-loader">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {/*{stopRequest && <p className="text-center my-10">All by now !</p>}*/}
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

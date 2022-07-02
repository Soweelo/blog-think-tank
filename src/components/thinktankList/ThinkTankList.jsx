import "./thinktanklist.scss";
import ThinkTankItem from "../thinkTankItem/ThinkTankItem";
import { useEffect, useState, memo, useMemo, useRef, useContext } from "react";
import Modal from "../modal/Modal";
import { useFetch } from "../../hooks/useFetch";
import useTrait from "../../hooks/useTrait";
import { format } from "timeago.js";
import { UserContext } from "../../context/UserContext";
export default memo(function ThinkTankList({
  setAccountContent,
  selectedTags,
  allTags,
  setSelectedTags,
  setHomeContent,
  setShowAuth,
}) {
  const fetch = useFetch();
  const { lang } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [text, setText] = useState("");
  const [nbComments, setNbComments] = useState(0);
  const [modalVar, setModalVar] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const tagsToDisplay = useTrait([]);
  const bigArray = useTrait([]);
  const [allThinkTanks, setallThinkTanks] = useState([]);
  const offset = useTrait(0);
  const [lastElement, setLastElement] = useState(null);
  const groupLimit = 12;
  const [stopRequest, setStopRequest] = useState(false);
  const [containerCount, setContainerCount] = useState(0);
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
            enabled: !!modalVar[7],
          }
        );
        const data = await response.json(); // console.log(data.data.content);
        setText(
          data.data.content.content
            ? data.data.content.content
            : data.data.content
        );
        setNbComments(data.data.nbComments ? data.data.nbComments : 0);
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
    offset.set(0);
    setContainerCount(0);
    setStopRequest(false);
    callThinktank();
  }, [selectedTags, allTags]);

  useEffect(() => {
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
  useEffect(() => {
    if (showModal) {
      document.querySelector("html").classList.add("unscrollable");
    } else {
      document.querySelector("html").classList.remove("unscrollable");
    }
  }, [showModal]);

  return (
    <div className="big_container">
      {bigArray.get().map((packOfTwelve, counter) => {
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
                      date={format(p.updated_at)}
                      type={p.type}
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
                      type={p.type}
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
        id={modalVar[7]}
        images={modalVar[0]}
        title={modalVar[1]}
        url={modalVar[3]}
        tags={modalVar[2]}
        text={text}
        type={modalVar[8]}
        nbComments={nbComments}
        date={modalVar[5]}
        // nbComments={modalVar[8]}
        loadingModal={loadingModal}
        setSelectedTags={setSelectedTags}
        setAccountContent={setAccountContent}
        setHomeContent={setHomeContent}
        setShowAuth={setShowAuth}
      ></Modal>
    </div>
  );
});

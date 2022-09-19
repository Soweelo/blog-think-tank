import "./post.scss";
import { ArrowBack, Close } from "@material-ui/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import "autoheight-textarea";
import UserPostList from "./UserPostList";
import CreatePost from "./CreatePost";
import Scroll from "../../../scroll/scroll";
import { UserContext } from "../../../../context/UserContext";
import { logout } from "../../../../context functions/apiCalls";
import { useFetch } from "../../../../hooks/useFetch";
import getOptionByKey from "../../../../functions/getOptionByKey/GetOptionByKey";
export default function Post({
  setMobileView,
  lang,
  setHomeContent,
  allBrands,
  allOptions,
}) {
  const { user, dispatch } = useContext(UserContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [postMessage, setPostMessage] = useState("");
  const [idToDelete, setIdToDelete] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [rerenderPostsList, setRerenderPostsList] = useState(true);
  const [newPost, setNewPost] = useState({});
  const fetch = useFetch();

  //delete post
  const deletePost = async (id) => {
    try {
      const response = await fetch(
        PF + "/api/posts/" + id + "?token=" + user.session,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (data.success) {
        setPostMessage(data.message);
      } else {
        if (data.message === "This session token is not valid") {
          logout(dispatch);
        }
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
    setIdToDelete(null);
    setOpenConfirm(false);
    setRerenderPostsList(true);
    setNewPost({});
  };
  // end delete post
  //getTags

  const getTags = async () => {
    try {
      const response = await fetch(PF + "/api/tags?lang=" + lang).then((r) =>
        r.json()
      );
      setAllTags(response.data);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };

  //end getTags
  useEffect(async () => {
    await getTags();
  }, [lang]);
  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  return (
    <div id={"account-content__scrolling-wrapper"}>
      <Scroll
        showBelow={400}
        scrollAnchor={"account-content__top"}
        scrollContainer={"account-content__scrolling-wrapper"}
      />

      <ArrowBack
        className="account-content__mobileView"
        onClick={(e) => {
          e.preventDefault();
          setMobileView("menu");
        }}
      />
      {openConfirm && (
        <div className="account__message--delete">
          <div className="account__message-delete-text">
            Are you sure you want to delete this Post?
          </div>
          <div className="account__message-delete-btn">
            <button
              onClick={() => {
                // console.log(idToDelete);
                deletePost(idToDelete);
              }}
            >
              yes
            </button>
            <button
              onClick={() => {
                setOpenConfirm(false);
                setIdToDelete(null);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
      {postMessage && (
        <div className="account-content__message account__message">
          {postMessage}
          <Close
            onClick={() => {
              setPostMessage("");
            }}
          />
        </div>
      )}
      <div id="account-content__top">
        <CreatePost
          allTags={allTags}
          setAllTags={setAllTags}
          setPostMessage={setPostMessage}
          newPost={newPost}
          setNewPost={setNewPost}
          allBrands={allBrands}
          allOptions={allOptions}
        />
      </div>

      <UserPostList
        setIdToDelete={setIdToDelete}
        setOpenConfirm={setOpenConfirm}
        setPostMessage={setPostMessage}
        allTags={allTags}
        setAllTags={setAllTags}
        reRenderPostsList={rerenderPostsList}
        setRerenderPostsList={setRerenderPostsList}
        setHomeContent={setHomeContent}
        newPost={newPost}
        setNewPost={setNewPost}
        allBrands={allBrands}
        allOptions={allOptions}
      />
    </div>
  );
}

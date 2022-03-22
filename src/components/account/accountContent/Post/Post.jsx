import "./post.scss";
import { ArrowBack, Close } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";

import "autoheight-textarea";
import UserPostList from "./UserPostList";
import CreatePost from "./CreatePost";
import Scroll from "../../../scroll/scroll";
import outDateCookieSession from "../../../../functions/cookiesController/outDateCookieSession";
export default function Post({
  mobileView,
  setMobileView,
  session,
  lang,
  setHomeContent,
  setIsValidToken,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [postMessage, setPostMessage] = useState("");
  const [idToDelete, setIdToDelete] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [rerenderPostsList, setRerenderPostsList] = useState(true);
  const [newPost, setNewPost] = useState({});
  //delete post
  const deletePost = async (id) => {
    try {
      // console.log("in try", "id", id, "session", session[0]);

      const response = await fetch(
        PF + "/api/posts/" + id + "?token=" + session[0],
        { method: "DELETE" }
      );

      const data = await response.json();

      if (data.success) {
        // console.log(data);
        setPostMessage(data.message);
        // await getAllPosts();
      } else {
        if (data.message === "This session token is not valid") {
          outDateCookieSession(session[0], session[1]);
          setIsValidToken(false);
          setHomeContent("0");
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
  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await fetch(PF + "/api/tags?lang=" + lang, {
          enabled: !!lang,
        }).then((r) => r.json());
        setAllTags(response.data);
      } catch (e) {
        if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
          console.error(e);
        }
      }
    };
    if (lang) {
      getTags();
    }
  }, [lang]);
  //end getTags

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
        onClick={() => {
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
          session={session}
          allTags={allTags}
          setAllTags={setAllTags}
          setPostMessage={setPostMessage}
          setIsValidToken={setIsValidToken}
          newPost={newPost}
          setNewPost={setNewPost}
        />
      </div>

      <UserPostList
        setIdToDelete={setIdToDelete}
        setOpenConfirm={setOpenConfirm}
        setPostMessage={setPostMessage}
        allTags={allTags}
        setAllTags={setAllTags}
        session={session}
        reRenderPostsList={rerenderPostsList}
        setRerenderPostsList={setRerenderPostsList}
        setHomeContent={setHomeContent}
        setIsValidToken={setIsValidToken}
        newPost={newPost}
        setNewPost={setNewPost}
      />
    </div>
  );
}

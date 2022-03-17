import "./post.scss";
import { ArrowBack, Close } from "@material-ui/icons";
import { useEffect, useState } from "react";

import "autoheight-textarea";
import UserPostList from "./UserPostList";
import CreatePost from "./CreatePost";
export default function Post({
  mobileView,
  setMobileView,
  session,
  lang,
  setHomeContent,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [postMessage, setPostMessage] = useState("");
  const [idToDelete, setIdToDelete] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [rerenderPostsList, setRerenderPostsList] = useState("true");

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
        // console.log(data);
        setPostMessage(data.message);
        // await getAllPosts();
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
    setIdToDelete(null);
    setOpenConfirm(false);
    setRerenderPostsList(true);
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
    <div>
      <ArrowBack
        className="account-content__mobileView"
        onClick={() => {
          setMobileView("menu");
        }}
      />
      {openConfirm && (
        <div className="account__message--delete">
          <div className="account__message-delete-text">
            You have ... posts with this tag.
            <br /> Still want to delete?
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
      <CreatePost session={session} allTags={allTags} setAllTags={setAllTags} />

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
      />
    </div>
  );
}

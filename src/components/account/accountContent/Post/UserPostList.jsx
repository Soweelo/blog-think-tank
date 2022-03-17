import "./post.scss";
import parse from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import useTrait from "../../../../hooks/useTrait";
import { format } from "timeago.js";
import EditAutoCSearchbar from "../../../autoCSearchBar/EditAutoSearchBar";
import "autoheight-textarea";
// import { Editor } from "@tinymce/tinymce-react";

export default function UserPostList({
  setIdToDelete,
  session,
  setOpenConfirm,
  setPostMessage,
  allTags,
  setAllTags,
  reRenderPostsList,
  setRerenderPostsList,
  setHomeContent,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [postContentButton, setPostContentButton] = useState([-1, false]);
  const [postContent, setPostContent] = useState([-1, ""]);
  const postTagsToChange = useTrait(-1);
  const postTags = useTrait([]);
  const [eMessage, setEMessage] = useState("");
  const [postContentMemo, setPostContentMemo] = useState("");
  const allPosts = useTrait([]);

  const desc = useRef();
  // const editorRef = useRef(null);
  const [addATag, setAddATag] = useState([false, "", -1]);
  const [deleteATag, setDeleteATag] = useState([false, "", -1]);
  // DELETE POST
  const askConfirm = (e) => {
    e.preventDefault();
    const id = e.target.attributes["data-value"].value;
    // console.log(id);
    setIdToDelete(id);
    setOpenConfirm(true);
  };
  const parse = require("html-react-parser");
  // end DELETE POST
  const submitEditContent = async (event) => {
    const id = event.target.attributes["data-value"].value;
    // console.log(id, postContent, "condition length", postContent[1].length);
    event.preventDefault();
    // try{
    if (5 < postContent[1].length && postContent[1].length < 1000000) {
      // console.log("fine length");

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: postContent[1],
          token: session[0],
        }),
      };
      const url = PF + "/api/posts/" + id;
      // console.log("in submit content", url);

      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success == true) {
        setPostMessage(data.message);
      } else {
        setPostMessage(data.message);
      }
    } else {
      setPostMessage("Your post content length is not valid");
    }
  };
  //*** end edit Content

  //* ADD TAG
  const addATagToPost = async () => {
    // console.log("Ill add");
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag: addATag[1],
          token: session[0],
        }),
      };
      const url = PF + "/api/posts/" + addATag[2] + "/addTag";
      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success == true) {
        // console.log(response);
        setPostMessage(data.message);
        // setAccountContent(2);
      } else {
        // console.log(response);
        setPostMessage(data.message);
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    if (addATag[0]) {
      addATagToPost();
      setAddATag([false, "", -1]);
    }
  }, [addATag[0]]);
  //* end ADD TAG

  //* DELETE TAG
  const deleteATagToPost = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag: deleteATag[1],
          token: session[0],
        }),
      };
      const url = PF + "/api/posts/" + deleteATag[2] + "/removeTag";
      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success == true) {
        // console.log(response);
        setPostMessage(data.message);
        // setAccountContent(2);
      } else {
        // console.log(response);
        setPostMessage(data.message);
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  useEffect(() => {
    // console.log("deleteATag", deleteATag);
    if (deleteATag[0]) {
      deleteATagToPost();
      setDeleteATag([false, "", -1]);
    }
  }, [deleteATag[0]]);

  //* end DELETE TAG

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const getAllPosts = async () => {
    // console.log("in getallposts", session);
    try {
      const response = await fetch(
        PF + "/api/posts/postsList?token=" + session[0]
      );
      const data = await response.json();
      allPosts.set(data.data);
      setRerenderPostsList(false);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  const handleContentChange = (event, id) => {
    setPostContent([id, event.target.value]);
  };

  const undoChangeContent = () => {
    setPostContent([-1, postContentMemo]);
    setPostContentButton([-1, false]);
  };

  useEffect(() => {
    if (reRenderPostsList && session[0]) {
      getAllPosts();
    }
    if (!session[0]) {
      setHomeContent("0");
    }
  }, [reRenderPostsList]);
  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }
  //display editor tiny mce
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  return (
    <div className="account-content__post-wrapper">
      {allPosts.get().map((post, i) => {
        return (
          <div className="account-content__post-container" key={i}>
            <div className="account-content__top">
              <div className="account-content__post-date">
                {format(post.updated_at)}
              </div>
              <div
                className="btn account-content__buttons-btn-delete"
                data-value={post.id}
                onClick={(e) => askConfirm(e)}
              >
                DELETE POST
              </div>
            </div>

            <div className="account-content__content-input">
              <autoheight-textarea>
                <textarea
                  // oninput="auto_grow(this)"
                  data-postid={post.id}
                  className="account-content__text"
                  value={
                    postContent[0] == post.id ? postContent[1] : post.content
                  }
                  // placeholder={post.content.substr(1, 30) + "..."}
                  onClick={(e) => {
                    setPostContentButton([
                      e.target.attributes["data-postid"].value,
                      true,
                    ]);
                  }}
                  onChange={(e) => handleContentChange(e, post.id)}
                  onFocus={(e) => {
                    setPostContentMemo(post.content);
                  }}
                />
              </autoheight-textarea>

              <div
                className={
                  "account-content__buttons " +
                  (postContentButton[0] == post.id && " visible")
                }
              >
                <div
                  className="btn account-content__buttons-btn-edit"
                  data-value={post.id}
                  onClick={(e) => {
                    submitEditContent(e);
                    // console.log("ok");
                  }}
                >
                  EDIT
                </div>
                <div
                  className="btn account-content__buttons-btn-delete"
                  onClick={() => {
                    undoChangeContent();
                  }}
                >
                  UNDO
                </div>
              </div>
            </div>

            <div className="account-content__postImgContainer">
              {post.images ? (
                <img
                  className="account-content__postImg"
                  src={PF + "/" + post.images.small}
                  srcSet={`${PF + "/" + post.images.thumb} 768w, ${
                    PF + "/" + post.images.small
                  } 3200w`}
                  // alt={title}
                />
              ) : (
                <img
                  className="account-content__postImg"
                  src={
                    PF +
                    "/storage/app/public/your-world-3-0-default-black-background.jpeg"
                  }
                  // alt={title}
                />
              )}
            </div>
            <div
              className="account-content__postTagContainer"
              onClick={() => {
                // e.preventDefault();
                if (postTagsToChange.get() !== post.id) {
                  postTags.set(post.tags);
                  setEMessage("");
                }
                postTagsToChange.set(post.id);
                // postTags.set(post.tags);
              }}
            >
              <div className="message">
                {postTagsToChange.get() == post.id && eMessage}
              </div>
              <EditAutoCSearchbar
                selectedItems={
                  postTagsToChange.get() == post.id ? postTags.get() : post.tags
                }
                postTags={postTags}
                allItems={allTags}
                id={5}
                setAllItems={setAllTags}
                max={3}
                editing={true}
                setEMessage={setEMessage}
                setAddTag={setAddATag}
                setDeleteATag={setDeleteATag}
                deleteATag={deleteATag}
                postId={post.id}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

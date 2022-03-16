import "./post.scss";

import {
  ArrowBack,
  Cancel,
  Close,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import useTrait from "../../../../hooks/useTrait";
import { format } from "timeago.js";
import EditAutoCSearchbar from "../../../autoCSearchBar/EditAutoSearchBar";
import "autoheight-textarea";

export default function Post({ mobileView, setMobileView, session, lang }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [postMessage, setPostMessage] = useState("");

  const [postContentButton, setPostContentButton] = useState([-1, false]);
  const [postContent, setPostContent] = useState([-1, ""]);
  const postTagsToChange = useTrait(-1);
  const postTags = useTrait([]);
  const [eMessage, setEMessage] = useState("");
  const [postContentMemo, setPostContentMemo] = useState("");
  const allPosts = useTrait([]);
  const [accountPostForm, setAccountPostForm] = useState(1);
  const [idToDelete, setIdToDelete] = useState(null);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
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

  const deletePost = async (id) => {
    // e.preventDefault();
    // // console.log(e.target.attributes["data-value"].value);
    // const id = e.target.attributes["data-value"].value;
    // console.log("delete");
    // console.log(id);
    try {
      // console.log("in try", "id", id, "session", session[0]);

      const response = await fetch(
        PF + "/api/posts/" + id + "?token=" + session[0],
        { method: "DELETE" }
      );

      const data = await response.json();
      // console.log("data", data);
      // console.log("response", response, id);
      if (data.success) {
        // console.log(data);
        setPostMessage(data.message);
        await getAllPosts();
      } else {
        // console.log(data);
        setPostMessage(data.message);
        await getAllPosts();
      }
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
    setIdToDelete(null);
    setOpenConfirm(false);
  };
  // end DELETE POST

  //*** edit Content
  // const editContentChange = () => {
  //     setPostContentButton([-1, false]);
  //     // 1. ajouter un élément à allposts . rerender
  //     // 2. scrolltop
  //     // 3. asynchrone : savechanges on database avec un put. recupérer la réponse et l'afficher dans une fenetre. pas de rerender
  //     // 4. en cas d echec changer le contenu de allposts et rerender
  //   };
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
        // console.log(response);
        setPostMessage(data.message);
        // setAccountContent(2);
      } else {
        // console.log(response);
        setPostMessage(data.message);
      }

      // }catch(e) {
      //   if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
      //     console.error(e);
      //   }
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
  useEffect(() => {
    // console.log("INTRO"," début chargementtags chargés dans l intro")
    const getTags = async () => {
      try {
        const response = await fetch(PF + "/api/tags?lang=" + lang, {
          enabled: !!lang,
        }).then((r) => r.json());
        // console.log(response.data);
        setAllTags(response.data);
        // console.log("INTRO","tags chargés dans l intro",answ.data.data)
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

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const getAllPosts = async () => {
    // console.log("in getallposts");
    try {
      const response = await fetch(
        PF + "/api/posts/postsList?token=" + session[0]
      );
      const data = await response.json();
      // const sorted = data.data.sort((p1, p2) => {
      //   console.log(p2);
      //   return new Date(p2.updated_at) - new Date(p1.updated_at);
      // });
      // console.log(data.data);
      // console.log(sorted);
      allPosts.set(data.data);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
    }
  };
  const handleContentChange = (event, id) => {
    // console.log(id);
    // console.log(postContentMemo);
    setPostContent([id, event.target.value]);
  };

  const undoChangeContent = () => {
    setPostContent([-1, postContentMemo]);
    setPostContentButton([-1, false]);
  };

  useEffect(() => {
    getAllPosts();
  }, []);
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
      <div className="account-content__post">
        <div className="account-content__postWrapper">
          <div className="account-content__postTop">
            <textarea
              placeholder={"What's in your mind " + session[1] + "?"}
              className="account-content__postInput"
              ref={desc}
            />
          </div>
          <hr className="account-content__postHr" />
          {file && (
            <div className="account-content__postImgContainer">
              <img
                className="account-content__postImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Cancel
                className="account-content__postCancelImg"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <form
            className="account-content__postBottom"
            onSubmit={submitHandler}
          >
            <div className="account-content__postOptions">
              <label htmlFor="file" className="account-content__postOption">
                <PermMedia className="account-content__postIcon red" />
                <span className="account-content__postOptionText">
                  Photo or Video
                </span>

                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="account-content__postOption">
                <Label className="account-content__postIcon blue" />
                <span className="account-content__postOptionText">Tag</span>
              </div>
            </div>
            <button className="btn account-content__postButton" type="submit">
              post
            </button>
          </form>
        </div>
      </div>

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
                    placeholder={post.content.substr(1, 30) + "..."}
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
                    postTagsToChange.get() == post.id
                      ? postTags.get()
                      : post.tags
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
    </div>
  );
}

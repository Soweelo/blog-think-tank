import "./post.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import useTrait from "../../../../hooks/useTrait";
import { format } from "timeago.js";
import EditAutoCSearchbar from "../../../autoCSearchBar/EditAutoSearchBar";
import "autoheight-textarea";
import { Cancel, Label, LocalActivity, PermMedia } from "@material-ui/icons";
import { useFetch } from "../../../../hooks/useFetch";
import { CircularProgress } from "@material-ui/core";
import outDateCookieSession from "../../../../functions/cookiesController/outDateCookieSession";
import { UserContext } from "../../../../context/UserContext";
import { logout } from "../../../../context functions/apiCalls";
import getOptionByKey from "../../../../functions/getOptionByKey/GetOptionByKey";

export default function UserPostList({
  setIdToDelete,
  setOpenConfirm,
  setPostMessage,
  allTags,
  setAllTags,
  reRenderPostsList,
  setRerenderPostsList,
  newPost,
  allOptions,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user, dispatch } = useContext(UserContext);

  //** Prevent rendering a newly modified post by defining  those variables. First expression of array is the id of the newly modified post  or -1 if none has been modified.
  // second expression of array is the content to be changed, without refreshing the postList.
  const [postContentButton, setPostContentButton] = useState([-1, false]);
  const [postContent, setPostContent] = useState([-1, ""]);
  const postTagsToChange = useTrait(-1);
  //**
  const [option_delete, setOption_delete] = useState("");
  const [option_previous_posts, setOption_previous_posts] = useState("");
  const [option_save, setOption_save] = useState("");
  const [option_undo, setOption_undo] = useState("");
  const [option_display_default_image, setOption_display_default_image] =
    useState("");
  const [option_no_image_post, setOption_no_image_post] = useState("");

  const postTags = useTrait([]);
  const [eMessage, setEMessage] = useState(["", "blue"]);
  const [postContentMemo, setPostContentMemo] = useState("");
  const allPosts = useTrait([]);
  const [file, setFile] = useState(null);
  let formDataUpdate = new FormData();
  const changedImgPostId = useTrait(-1);
  const [isFetching, setIsFetching] = useState(false);

  const fetch = useFetch();
  // const editorRef = useRef(null);
  const [addTag, setAddTag] = useState([false, "", -1]);
  const [deleteTag, setDeleteTag] = useState([false, "", -1]);
  // DELETE POST
  const askConfirm = (e) => {
    e.preventDefault();
    setPostMessage("");
    const id = e.target.attributes["data-value"].value;
    // console.log(id);
    setIdToDelete(id);
    setOpenConfirm(true);
  };
  // const parse = require("html-react-parser");
  // end DELETE POST
  const submitEditContent = async (event) => {
    setPostMessage("");
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
          token: user.session,
        }),
      };
      const url = PF + "/api/posts/" + id;
      // console.log("in submit content", url);

      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success) {
        setPostMessage(data.message);
      } else {
        if (data.message === "This session token is not valid") {
          logout(dispatch);
        }
      }
    } else {
      setPostMessage("Your post content length is not valid");
    }
  };
  //*** end edit Content
  // console.log("newPost", newPost);
  //* ADD TAG
  const addATagToPost = async () => {
    setPostMessage("");
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag: addTag[1],
          token: user.session,
        }),
      };
      const url = PF + "/api/posts/" + addTag[2] + "/addTag";
      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success == true) {
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
  };
  useEffect(() => {
    if (addTag[0]) {
      addATagToPost();
      setAddTag([false, "", -1]);
    }
  }, [addTag[0]]);
  //* end ADD TAG

  //* DELETE TAG
  const deleteATagToPost = async () => {
    setPostMessage("");
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag: deleteTag[1],
          token: user.session,
        }),
      };
      const url = PF + "/api/posts/" + deleteTag[2] + "/removeTag";
      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success == true) {
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
  };
  useEffect(() => {
    // console.log("deleteTag", deleteATag);
    if (deleteTag[0]) {
      deleteATagToPost();
      setDeleteTag([false, "", -1]);
    }
  }, [deleteTag[0]]);

  //* end DELETE TAG

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const getAllPosts = async () => {
    // console.log("in getallposts", session);
    // setNewPost({})
    try {
      const response = await fetch(
        PF + "/api/posts/postsList?token=" + user.session
      );
      const data = await response.json();
      if (data.success) {
        allPosts.set(data.data);
      } else {
        if (data.message === "This session token is not valid") {
          logout(dispatch);
        }
      }

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
    if (user) {
      if (reRenderPostsList) {
        getAllPosts();
      }
    } else {
      logout(dispatch);
    }
  }, [reRenderPostsList]);

  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = element.scrollHeight + "px";
  }

  //***deleteImg
  const deletePostImg = async (id) => {
    // console.log("delete");
    setPostMessage("");
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.session,
        }),
      };
      const url = PF + "/api/posts/" + id + "/deleteDefaultImage";
      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success == true) {
        // console.log(response);
        setPostMessage(data.message);
        // getAllPosts();
        // setAccountContent(2);
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
    setFile(null);
  };
  //***end deleteImg
  //*** update img
  const handleFileChange = (event) => {
    // console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  const submitHandlerPostImg = (e) => {
    e.preventDefault(e);
    formDataUpdate.append("image", file);
    formDataUpdate.append("images", file);
    formDataUpdate.append("file", file);
    // console.log("file", file, "etarget", file);
    // for (let [name, value] of formDataUpdate) {
    //   console.log(name, value); // key1 = value1, then key2 = value2
    // }
    updatePostImg();

    // console.
  };
  const updatePostImg = async () => {
    setPostMessage("");
    try {
      setIsFetching(true);
      const requestOptions = {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formDataUpdate,
      };
      // console.log(formDataUpdate);
      const url =
        PF +
        "/api/posts/" +
        changedImgPostId.get() +
        "/updateImage?token=" +
        user.session;
      const response = await fetch(url, requestOptions).then((res) =>
        res.json()
      );
      let data = await response;
      // console.log(data);
      if (data.success == true) {
        // console.log(response);
        setPostMessage(data.message);
        // setAccountContent(2);
      } else {
        if (data.message === "This session token is not valid") {
          logout(dispatch);
        }
      }
      setIsFetching(false);
    } catch (e) {
      if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
        console.error(e);
      }
      // for (let [name, value] of formDataUpdate) {
      //   console.log(name, value); // key1 = value1, then key2 = value2
      // }
    }
  };
  //*** end update img
  // Fix the html tinyMce syntax issue:
  // More beautiful than creating a div with dangerouslySetInnerHtml and get its content BUT does not converts ALL chararcters:*
  // For instance " ' " keeps being expressed as l&#39

  // function createMarkup(content) {
  //   return { __html: content };
  // }
  // console.log(newPost.type)

  //set all options to translate
  useEffect(() => {
    setOption_previous_posts(getOptionByKey("06_previous_posts", allOptions));
    setOption_delete(getOptionByKey("06_delete", allOptions));
    setOption_save(getOptionByKey("06_save", allOptions));
    setOption_display_default_image(
      getOptionByKey("06_display_default_image", allOptions)
    );
    setOption_no_image_post(getOptionByKey("06_no_image_post", allOptions));
    setOption_undo(getOptionByKey("06_undo", allOptions));
  }, [allOptions]);
  return (
    <div className="account-content__post-wrapper">
      {(newPost.id || allPosts.get().length > 0) && (
        <div
          className="account-content__subTitle"
          dangerouslySetInnerHTML={{ __html: option_previous_posts }}
        ></div>
      )}
      {newPost.id && (
        <div className="account-content__post-container">
          <div className="account-content__post-label-type">
            {newPost.type == 0 ? "think tank" : "message"}
          </div>
          <div className="account-content__top">
            <div className="account-content__post-date">
              {format(newPost.updated_at)}
            </div>
            <div
              className="btn account-content__buttons-btn-delete"
              data-value={newPost.id}
              onClick={(e) => askConfirm(e)}
            >
              <span dangerouslySetInnerHTML={{ __html: option_delete }}></span>{" "}
              {" POST"}
            </div>
          </div>

          <div className="account-content__content-input">
            <autoheight-textarea>
              <textarea
                // oninput="auto_grow(this)"
                data-postid={newPost.id}
                className="account-content__text"
                value={
                  postContent[0] == newPost.id
                    ? postContent[1]
                    : newPost.content
                }
                // placeholder={post.content.substr(1, 30) + "..."}
                onClick={(e) => {
                  setPostContentButton([
                    e.target.attributes["data-postid"].value,
                    true,
                  ]);
                }}
                onChange={(e) => handleContentChange(e, newPost.id)}
                onFocus={(e) => {
                  setPostContentMemo(newPost.content);
                }}
              />
            </autoheight-textarea>

            <div
              className={
                "account-content__buttons " +
                (postContentButton[0] === newPost.id && " visible")
              }
            >
              <div
                className="btn account-content__buttons-btn-save"
                data-value={newPost.id}
                onClick={(e) => {
                  submitEditContent(e);
                  // console.log("ok");
                }}
                dangerouslySetInnerHTML={{ __html: option_save }}
              ></div>
              <div
                className="btn account-content__buttons-btn-delete"
                onClick={() => {
                  undoChangeContent();
                }}
                dangerouslySetInnerHTML={{ __html: option_undo }}
              ></div>
            </div>
          </div>

          {newPost.brand.length > 0 && (
            <div className="account-content__postBrand">
              <div className="account-content__postOption-label-wrapper">
                <LocalActivity className="account-content__postIcon green" />
                <span className="account-content__postOptionText">Brand</span>
              </div>
              <div className="tag">{newPost.brand}</div>
            </div>
          )}
          <div className="account-content__postTags">
            <div className="account-content__postOption-label-wrapper">
              <Label className="account-content__postIcon blue" />
              <span className="account-content__postOptionText">Tag</span>
            </div>{" "}
            <div
              className="account-content__postTagContainer"
              onClick={() => {
                // e.preventDefault();
                if (postTagsToChange.get() !== newPost.id) {
                  postTags.set(newPost.tags);
                  setEMessage(["", "blue"]);
                }
                postTagsToChange.set(newPost.id);
                // postTags.set(post.tags);
              }}
            >
              <div className="message" style={{ color: eMessage[1] }}>
                {postTagsToChange.get() == newPost.id && eMessage[0]}
              </div>
              <EditAutoCSearchbar
                selectedItems={
                  postTagsToChange.get() == newPost.id
                    ? postTags.get()
                    : newPost.tags
                  // newPost.tags
                }
                postSelectedItems={postTags}
                allItems={allTags}
                id={5}
                max={3}
                edit={true}
                setEMessage={setEMessage}
                setAddItem={setAddTag}
                setDeleteItem={setDeleteTag}
                postId={newPost.id}
                // firstIsBrand={false}
              />
              {/*{console.log(newPost.tags)}*/}
            </div>
          </div>
          <form onSubmit={submitHandlerPostImg}>
            <label
              htmlFor={"file-" + newPost.id}
              className="account-content__postOption"
            >
              <PermMedia className="account-content__postIcon red" />
              <span className="account-content__postOptionText">
                Photo / Video
              </span>

              <input
                style={{ display: "none" }}
                type="file"
                id={"file-" + newPost.id}
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  changedImgPostId.set(newPost.id);
                  handleFileChange(e);
                }}
                // onChange={(e) => setFile([e.target.files[0]])}
                // value={file[0] == post.id ? file[1] : post.file}
              />
            </label>
            <div className="account-content__postImgContainer">
              {changedImgPostId.get() == newPost.id ? (
                file ? (
                  <>
                    <img
                      className="account-content__postImg"
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                    <Cancel
                      className="account-content__postCancelImg"
                      onClick={() => {
                        deletePostImg(newPost.id);
                        setFile(null);
                        // changedImgPostId.set(-1);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p
                      dangerouslySetInnerHTML={{ __html: option_no_image_post }}
                    ></p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: option_display_default_image,
                      }}
                    ></p>
                  </>
                )
              ) : newPost.images ? (
                <>
                  <img
                    className="account-content__postImg"
                    src={URL.createObjectURL(newPost.images)}
                    alt=""
                  />
                  {/*{console.log(newPost.tags)}*/}
                  <Cancel
                    className="account-content__postCancelImg"
                    onClick={() => {
                      deletePostImg(newPost.id);
                      changedImgPostId.set(newPost.id);
                      setFile(null);
                    }}
                  />
                </>
              ) : (
                <>
                  <p
                    dangerouslySetInnerHTML={{ __html: option_no_image_post }}
                  ></p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: option_display_default_image,
                    }}
                  ></p>
                </>
              )}
            </div>
            <button
              className={
                "btn account-content__postButton " +
                (changedImgPostId.get() == newPost.id && file
                  ? null
                  : "display-none")
              }
              disabled={isFetching}
              type="submit"
              style={{ marginLeft: "calc(50% - 43px)" }}
            >
              {isFetching ? <CircularProgress size="20px" /> : "SAVE"}
            </button>
          </form>
        </div>
      )}

      {allPosts.get().map((post, i) => {
        return (
          <div className="account-content__post-container" key={i}>
            <div className="account-content__post-label-type">
              {post.type === 0 ? "think tank" : "message"}
            </div>
            <div className="account-content__top">
              <div className="account-content__post-date">
                {format(post.updated_at)}
              </div>
              <div
                className="btn account-content__buttons-btn-delete"
                data-value={post.id}
                onClick={(e) => askConfirm(e)}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: option_delete }}
                ></span>{" "}
                {"POST"}
              </div>
            </div>

            <div className="account-content__content-input">
              <div
                id={"html-textarea-" + post.id}
                style={{ display: "none" }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
              <autoheight-textarea>
                <textarea
                  // oninput="auto_grow(this)"
                  data-postid={post.id}
                  className="account-content__text"
                  value={
                    postContent[0] == post.id
                      ? postContent[1]
                      : document.getElementById("html-textarea-" + post.id)
                      ? document.getElementById("html-textarea-" + post.id)
                          .innerText
                      : ""
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
                  className="btn account-content__buttons-btn-save"
                  data-value={post.id}
                  onClick={(e) => {
                    submitEditContent(e);
                    // console.log("ok");
                  }}
                  dangerouslySetInnerHTML={{ __html: option_save }}
                ></div>
                <div
                  className="btn account-content__buttons-btn-delete"
                  onClick={() => {
                    undoChangeContent();
                  }}
                  dangerouslySetInnerHTML={{ __html: option_undo }}
                ></div>
              </div>
            </div>

            {post.brand && (
              <div className="account-content__postBrand">
                <div className="account-content__postOption-label-wrapper">
                  <LocalActivity className="account-content__postIcon green" />
                  <span className="account-content__postOptionText">Brand</span>
                </div>
                <div className="tag">{post.brand.name}</div>
              </div>
            )}
            <div className="account-content__postTags">
              <div className="account-content__postOption-label-wrapper">
                <Label className="account-content__postIcon blue" />
                <span className="account-content__postOptionText">Tag</span>
              </div>
              <div
                className="account-content__postTagContainer"
                onClick={() => {
                  // e.preventDefault();
                  if (postTagsToChange.get() !== post.id) {
                    postTags.set(post.tags);
                    setEMessage(["", "blue"]);
                  }
                  postTagsToChange.set(post.id);
                  // postTags.set(post.tags);
                }}
              >
                <div className="message" style={{ color: eMessage[1] }}>
                  {postTagsToChange.get() == post.id && eMessage[0]}
                </div>
                <EditAutoCSearchbar
                  selectedItems={
                    postTagsToChange.get() == post.id
                      ? postTags.get()
                      : post.tags
                  }
                  postSelectedItems={postTags}
                  allItems={allTags}
                  id={5}
                  setAllItems={setAllTags}
                  max={3}
                  setEMessage={setEMessage}
                  setAddItem={setAddTag}
                  setDeleteItem={setDeleteTag}
                  deleteTag={deleteTag}
                  postId={post.id}
                  firstIsBrand={post.brand ? true : false}
                />
              </div>
            </div>
            <form onSubmit={submitHandlerPostImg}>
              <label
                htmlFor={"file-" + post.id}
                className="account-content__postOption"
              >
                <PermMedia className="account-content__postIcon red" />
                <span className="account-content__postOptionText">
                  Photo / Video
                </span>

                <input
                  style={{ display: "none" }}
                  type="file"
                  id={"file-" + post.id}
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    changedImgPostId.set(post.id);
                    handleFileChange(e);
                  }}
                  // onChange={(e) => setFile([e.target.files[0]])}
                  // value={file[0] == post.id ? file[1] : post.file}
                />
              </label>
              <div className="account-content__postImgContainer">
                <div
                  className="account-content__postImgContainer"
                  // onClick={(e) => console.log(post.id)}
                >
                  {changedImgPostId.get() == post.id ? (
                    file ? (
                      <>
                        <img
                          className="account-content__postImg"
                          src={URL.createObjectURL(file)}
                          alt=""
                        />
                        <Cancel
                          className="account-content__postCancelImg"
                          onClick={() => {
                            deletePostImg(post.id);
                            setFile(null);
                            // changedImgPostId.set(-1);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: option_no_image_post,
                          }}
                        >
                          {" "}
                        </p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: option_display_default_image,
                          }}
                        ></p>
                      </>
                    )
                  ) : post.images ? (
                    <>
                      <img
                        className="account-content__postImg"
                        src={PF + "/" + post.images.small}
                        srcSet={`${PF + "/" + post.images.thumb} 768w, ${
                          PF + "/" + post.images.small
                        } 3200w`}
                        // alt={title}
                      />
                      <Cancel
                        className="account-content__postCancelImg"
                        onClick={() => {
                          deletePostImg(post.id);
                          changedImgPostId.set(post.id);
                          setFile(null);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: option_no_image_post,
                        }}
                      ></p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: option_display_default_image,
                        }}
                      ></p>
                    </>
                  )}
                </div>
              </div>
              <button
                className={
                  "btn account-content__postButton " +
                  (changedImgPostId.get() == post.id && file
                    ? null
                    : "display-none")
                }
                disabled={isFetching}
                type="submit"
                // style="margin-left: calc(50% - 43px)"
                style={{ marginLeft: "calc(50% - 43px)" }}
              >
                {isFetching ? <CircularProgress size="20px" /> : "SAVE"}
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

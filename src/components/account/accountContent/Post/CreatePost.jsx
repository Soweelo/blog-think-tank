import { Cancel, Label, PermMedia } from "@material-ui/icons";
import { useRef, useState } from "react";
import useTrait from "../../../../hooks/useTrait";
import "autoheight-textarea";
import EditAutoCSearchbar from "../../../autoCSearchBar/EditAutoSearchBar";
import { useFetch } from "../../../../hooks/useFetch";
import outDateCookieSession from "../../../../functions/cookiesController/outDateCookieSession";

export default function CreatePost({
  session,
  allTags,
  setAllTags,
  setHomeContent,
  setPostMessage,
  setIsValidToken,
  newPost,
  setNewPost,
}) {
  const [eMessage, setEMessage] = useState("");
  const desc = useRef();
  let formData = new FormData();
  const [file, setFile] = useState();
  const postTags = useTrait([]);
  let postContent = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const fetch = useFetch();
  //submit new post
  const submitHandler = (e) => {
    e.preventDefault();
    formData.append("text", postContent.current.value);
    formData.append("image", file);
    postTags.get().map((tag) => {
      formData.append("tags[]", tag);
    });

    submitPost();
  };
  //end submit new post
  //handle postContentChange

  //end handle postContentChange
  const submitPost = async () => {
    try {
      // console.log(formData.values());
      const requestOptions = {
        method: "POST",
        body: formData,
      };

      let url = PF + "/api/posts?token=" + session[0];
      let res = await fetch(url, requestOptions).then((res) => res.json());
      // console.log(res);
      if (res.success) {
        setPostMessage(res.message);
        setEMessage(["", "red"]);
        setFile(null);
        postTags.set([]);
        postContent.current.value = "";
        let tagsArray = [];
        res.data.tags.map((item) => {
          tagsArray.push(item.name);
        });
        setNewPost({
          updated_at: res.data.updated_at,
          content: res.data.content,
          brand: res.data.brand,
          id: res.data.id,
          images: file,
          tags: tagsArray,
        });
      } else {
        if (res.message === "This session token is not valid") {
          outDateCookieSession(session[0], session[1]);
          setHomeContent("0");
          setIsValidToken(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="account-content__post">
      <div className="account-content__postWrapper">
        <div className="account-content__postTop">
          <autoheight-textarea>
            <textarea
              placeholder={"What's in your mind " + session[1] + "?"}
              className="account-content__postInput"
              ref={postContent}
            />
          </autoheight-textarea>
        </div>
        <hr className="account-content__postHr" />
        {file && (
          <div className="account-content__postImgContainer">
            <img
              className="account-content__postImg"
              src={URL.createObjectURL(file)}
              alt=""
            />
          </div>
        )}
        <form className="account-content__postBottom" onSubmit={submitHandler}>
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
            <hr className="account-content__postHr" />
            <div className="account-content__postOption">
              <div className="account-content__postOption-label-wrapper">
                <Label className="account-content__postIcon blue" />
                <span className="account-content__postOptionText">Tag</span>
              </div>

              <div className="account-content__postEditAutoSearch-Wrapper">
                <EditAutoCSearchbar
                  selectedItems={postTags.get()}
                  postTags={postTags}
                  allItems={allTags}
                  setAllItems={setAllTags}
                  id={7}
                  max={3}
                  postId={null}
                  setEMessage={setEMessage}
                />
                <div className="message" style={{ color: eMessage[1] }}>
                  {eMessage[0]}
                </div>
              </div>
            </div>
          </div>

          <button className="btn account-content__postButton" type="submit">
            post
          </button>
        </form>
      </div>
    </div>
  );
}

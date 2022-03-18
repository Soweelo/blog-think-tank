import { Cancel, Label, PermMedia } from "@material-ui/icons";
import { useRef, useState } from "react";
import useTrait from "../../../../hooks/useTrait";
import "autoheight-textarea";
import EditAutoCSearchbar from "../../../autoCSearchBar/EditAutoSearchBar";
import { useFetch } from "../../../../hooks/useFetch";

export default function CreatePost({
  session,
  allTags,
  setAllTags,
  setHomeContent,
  setPostMessage,
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
    // console.log(postTags.get());

    formData.append("text", postContent.current.value);
    formData.append("image", file);
    postTags.get().map((tag) => {
      formData.append("tags[]", tag);
    });
    formData.append("tags", postTags.get());
    // for (let [name, value] of formData) {
    //   console.log(name, value); // key1 = value1, then key2 = value2
    // }
    submitPost();
  };
  //end submit new post
  //handle postContentChange

  //end handle postContentChange
  const submitPost = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      };
      let url = PF + "/api/posts?token=" + session[0];
      let res = await fetch(url, requestOptions).then((res) => res.json());
      console.log(res);
      if (res.success) {
        setPostMessage(res.message);
        setFile(null);
        postTags.set([]);
        postContent.current.value = "";
      } else {
        setHomeContent("0");
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
            <div className="account-content__postOption">
              <Label className="account-content__postIcon blue" />
              <span className="account-content__postOptionText">Tag</span>
              <div className="account-content__postEditAutoSearch-Wrapper">
                <EditAutoCSearchbar
                  selectedItems={postTags.get()}
                  postTags={postTags}
                  allItems={allTags}
                  setAllItems={setAllTags}
                  id={7}
                  max={3}
                  postId={null}
                  editing={true}
                  setEMessage={setEMessage}
                />
                <div className="message">{eMessage}</div>
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

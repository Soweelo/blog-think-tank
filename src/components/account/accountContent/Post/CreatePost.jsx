import { Cancel, Label, PermMedia } from "@material-ui/icons";
import { useRef, useState } from "react";
import useTrait from "../../../../hooks/useTrait";
import "autoheight-textarea";
import EditAutoCSearchbar from "../../../autoCSearchBar/EditAutoSearchBar";

export default function CreatePost({ session, allTags, setAllTags }) {
  const [eMessage, setEMessage] = useState("");
  const desc = useRef();
  const [file, setFile] = useState(null);
  const postTags = useTrait([]);
  const [postContent, setPostContent] = useState("");
  //submit new post
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(file, postTags.get(), postContent);
  };
  //end submit new post
  //handle postContentChange
  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };
  //end handle postContentChange
  return (
    <div className="account-content__post">
      <div className="account-content__postWrapper">
        <div className="account-content__postTop">
          <autoheight-textarea>
            <textarea
              placeholder={"What's in your mind " + session[1] + "?"}
              className="account-content__postInput"
              ref={desc}
              value={postContent}
              onChange={handlePostContentChange}
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
            <Cancel
              className="account-content__postCancelImg"
              onClick={() => setFile(null)}
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

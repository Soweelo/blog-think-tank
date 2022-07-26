import {
  Cancel,
  Label,
  PermMedia,
  Flag,
  LocalActivity,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import useTrait from "../../../../hooks/useTrait";
import "autoheight-textarea";
import EditAutoCSearchbar from "../../../autoCSearchBar/EditAutoSearchBar";
import { useFetch } from "../../../../hooks/useFetch";
import { CircularProgress } from "@material-ui/core";
import { UserContext } from "../../../../context/UserContext";
import { logout } from "../../../../context functions/apiCalls";
import AutoCSearchbar from "../../../autoCSearchBar/AutoCSearchbar";

export default function CreatePost({
  allTags,
  setAllTags,
  setPostMessage,
  setNewPost,
  allBrands,
}) {
  const { user, dispatch } = useContext(UserContext);
  const [eMessage, setEMessage] = useState("");
  const [eBrandMessage, setEBrandMessage] = useState(["", "black"]);
  const [isFetching, setIsFetching] = useState(false);
  //formatting allBarnds for editAutoCSearchBar
  let adaptedBrands = [];
  allBrands.get().map((brand) => {
    adaptedBrands.push({
      name: brand.name.toLowerCase().replace(/\s/g, ""),
      id: brand.id,
    });
  });
  let formData = new FormData();
  const [file, setFile] = useState();
  const postTags = useTrait([]);
  const postBrand = useTrait([]);
  const postBrandId = useTrait(null);
  const postType = useTrait(0);
  let postContent = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const fetch = useFetch();

  //submit new post
  const submitHandler = (e) => {
    e.preventDefault();
    formData.append("text", postContent.current.value);
    formData.append("image", file);
    formData.append("brand", postBrandId.get());
    formData.append("type", postType.get())
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
      setIsFetching(true);
      for (const [key, value] of formData.entries()) {
        // console.log(key, value);
      }
      const requestOptions = {
        method: "POST",
        body: formData,
      };

      let url = PF + "/api/posts?token=" + user.session;
      let res = await fetch(url, requestOptions).then((res) => res.json());

      if (res.success) {
        let tagsArray = [];
        res.data.tags.map((item) => {
          tagsArray.push(item.name);
        });
        setNewPost({
          updated_at: res.data.updated_at,
          content: res.data.content,
          brand: postBrand.get(),
          id: res.data.id,
          images: file,
          tags: tagsArray,
          type:postType.get(),
        });
        setPostMessage(res.message);
        setEMessage(["", "red"]);
        setFile(null);
        postBrand.set([]);
        postBrandId.set(null);
        postTags.set([]);
        postContent.current.value = "";
        postType.set(0)
      } else {
        setPostMessage(res.message);

        if (res.message === "This session token is not valid") {
          logout(dispatch);
        }
      }
      setIsFetching(false);
    } catch (e) {
      console.log(e);
    }
  };
// console.log(postType.get())
  // console.log("postBrand", postBrand.get());
  return (
    <div className="account-content__post">
      <div className="account-content__postWrapper">
        <div className="account-content__postTop">
          <div className="account-content__postInput">
            <div className="radio">
              <label>
                <input type="radio" value="option1"
                       checked={postType.get() === 0}
                       onChange={ () => postType.set(0)} />
                think tank mode <span>(unables comments on your post)</span>
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="option2"
                       checked={postType.get() === 1}
                       onChange={ () => postType.set(1)} />
                message mode <span>(disables comments on your post)</span>
              </label>
            </div>
          </div>
          <autoheight-textarea>
            <textarea
              placeholder={"What's in your mind " + user.pseudo + "?"}
              className="account-content__postInput"
              ref={postContent}
            />
          </autoheight-textarea>
        </div>
        <hr className="account-content__postHr" />

        <form className="account-content__postBottom" onSubmit={submitHandler}>
          <div className="account-content__postOptions">

            {allBrands.get().length > 0 && (
              <>
                <div className="account-content__postOption">
                  <div className="account-content__postOption-label-wrapper">
                    <LocalActivity className="account-content__postIcon green" />
                    <span className="account-content__postOptionText">
                      Brand
                    </span>
                  </div>

                  <div className="account-content__postEditAutoSearch-Wrapper">
                    <EditAutoCSearchbar
                      selectedItems={postBrand.get()}
                      postSelectedItems={postBrand}
                      postSelectedItemId={postBrandId}
                      allItems={adaptedBrands}
                      id={8}
                      max={1}
                      postId={null}
                      setEMessage={setEBrandMessage}
                      edit={false}
                      firstIsBrand={false}
                    />
                    <div
                      className="message"
                      style={{ color: eBrandMessage[1] }}
                    >
                      {eBrandMessage[0]}
                    </div>
                  </div>
                </div>
              </>
            )}
         
            <div className="account-content__postOption">
              <div className="account-content__postOption-label-wrapper">
                <Label className="account-content__postIcon blue" />
                <span className="account-content__postOptionText">Tag</span>
              </div>

              <div className="account-content__postEditAutoSearch-Wrapper">
                <EditAutoCSearchbar
                  selectedItems={postTags.get()}
                  postSelectedItems={postTags}
                  allItems={allTags}
                  id={7}
                  max={3}
                  postId={null}
                  setEMessage={setEMessage}
                  edit={true}
                  firstIsBrand={false}
                />
                <div className="message" style={{ color: eMessage[1] }}>
                  {eMessage[0]}
                </div>
              </div>
            </div>

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
            {file && (
                <div className="account-content__postImgContainer">
                  <img
                      className="account-content__postImg"
                      src={URL.createObjectURL(file)}
                      alt={""}
                  />
                </div>
            )}
          </div>

          <button className="btn account-content__postButton" type="submit">
            {isFetching ? <CircularProgress size="20px" /> : "POST"}
          </button>
        </form>
      </div>
    </div>
  );
}

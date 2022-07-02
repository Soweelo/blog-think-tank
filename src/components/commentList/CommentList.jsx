import "./commentlist.scss";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import {ArrowDropDown, ArrowDropUp, Create} from "@material-ui/icons";
import { format } from "timeago.js";
import {logout} from "../../context functions/apiCalls";
export default function CommentList({nbComments, setShowAuth,setShowModal,postId}) {
  const { user,dispatch } = useContext(UserContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [parentId, setParentId] = useState(0)
  const [allFirstLevelComments, setAllFirstLevelComments] = useState([])
  const [unfoldedRepliesCommentId, setUnfoldedRepliesCommentId]=useState([])
console.log("commentList reloads")
  function openLoginInterface() {
    setShowModal(false)
      setShowAuth(true);
  }
  const getFirstLevelComments = async () => {
    try {
      const response = await fetch(
          PF + "/api/comments/"+postId+"/"+parentId+"/find?token="+(user? user.session:0)
      );
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setAllFirstLevelComments(data.data);
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

  }
  useEffect(()=>{
   //call the function for getting all posts level 0
    getFirstLevelComments()
  },[])
  return <div className="commentListContainer">
    <div className="commentListWrapper">
      {user?
<div className="commentAddYoursWrapper"><div className="commentPseudo">{user.pseudo}</div> <input type="text" placeholder="Add your comment here ..."/></div>
          :
      <div className="commentLogin"  onClick={() => openLoginInterface()}>
        <Create/>
        <span>Wanna add a comment ?</span>
        <span className="commentLoginLink">Please Login</span>
      </div>}
      { !nbComments? <h3 className="commentNone" > Still no comment on this Post</h3> :
      <div className="commentList">
        {allFirstLevelComments.map((comment, i) => {
          return (
              <div key={i} className="commentWrapper">
                <div className="top">
                  <div className="pseudo">{comment.member}</div>
                  <div className="date">{format(comment.updated_at)}</div>
                </div>
                <div className="text">{comment.content}</div>
                <div className="bottom">
                  <span>REPLY</span>
                  <span>DELETE</span>
                  {comment.nb_responses ?
                    <div className="showReplies">{unfoldedRepliesCommentId.includes(comment.id)?<div>Hide {comment.nb_responses} replies <ArrowDropUp/></div>:<div>Show {comment.nb_responses} replies <ArrowDropDown/></div>}</div>
                    :null
                  }

                </div>
              </div>
          )})}
      </div>
      }


    </div>


  </div>;
}

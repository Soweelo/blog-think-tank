import "./commentlist.scss";
import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../context/UserContext";
import {ArrowDropDown, ArrowDropUp, Create} from "@material-ui/icons";
import {format} from "timeago.js";
import {logout} from "../../context functions/apiCalls";
import useTrait from "../../hooks/useTrait";
import arrayRemove from "../../functions/arrayRemove";
import RepliesList from "../repliesList/RepliesList";


export default function CommentList({nbComments, setNbComments, setShowAuth, setShowModal, postId}) {
    const {user, dispatch} = useContext(UserContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const parentId = useTrait(0)
    const [allFirstLevelComments, setAllFirstLevelComments] = useState([])
    const [loadFirstLevelComments, setLoadFirstLevelComments] = useState(true) // used to send request for all first level comments thanks to a use effect. first render it must be true, then set to false.It'll be set to true again if a new comment is added.
    const [commentIdToDelete, setIdToDelete] = useState(-1) //commentId to delete
    let newComment = useRef();
    let formData = new FormData();
    function openLoginInterface() {
        setShowModal(false)
        setShowAuth(true);
    }

    const deleteComment = async () => {
        try {
            //request delete
            const response = await fetch(
                PF + "/api/comments/" + commentIdToDelete + "?token=" + user.session,
                {method: "DELETE"}
            );
            const data = await response.json();
            if (data.success) {
                loadFirstLevelComments(true)
                setNbComments(nbComments - 1)
                setIdToDelete(-1)
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
    const getComments = async () => {
        try {
            const response = await fetch(
                PF + "/api/comments/" + postId + "/" + parentId.get() + "/find?token=" + (user ? user.session : 0)
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
    const handleContentChange = (e) => {
        if (e.key === "Enter" && e.target.value.length > 0) {
            submitHandler(e)
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        formData.append("text", newComment.current.value);
        formData.append("post", postId);
        formData.append("parent", parentId.get());
        submitComment();
    };
    const submitComment = async() =>{
        try {
            const requestOptions = {
                method: "POST",
                body: formData,
            };
            let url = PF + "/api/comments?token=" + user.session;
            let res = await fetch(url, requestOptions).then((res) => res.json());

            if (res.success) {
                setLoadFirstLevelComments(true)
                setNbComments(nbComments + 1);
                newComment.current.value="";
            } else {
                if (res.message === "This session token is not valid") {
                    logout(dispatch);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        //if loadFirstLevelComments is true call the function for getting all posts level 0
        if (loadFirstLevelComments) {
            // parentId.set(0)
            getComments()
            setLoadFirstLevelComments(false)
        }
    }, [loadFirstLevelComments])
    useEffect(() => {
        console.log(commentIdToDelete)
        if (commentIdToDelete > 0) {
            deleteComment()
        }
    }, [commentIdToDelete])
    return <div className="commentListContainer">
        <div className="commentListWrapper">
            {user ?
                <div className="commentAddYoursWrapper">
                    <div className="commentPseudo">{user.pseudo}</div>
                    <input type="text" placeholder="Add your comment here ..."  ref={newComment} onKeyDown={(e) => handleContentChange(e)}/></div>
                :
                <div className="commentLogin" onClick={() => openLoginInterface()}>
                    <Create/>
                    <span>Wanna add a comment ?</span>
                    <span className="commentLoginLink">Please Login</span>
                </div>}
            {!nbComments ? <h3 className="commentNone"> Still no comment on this Post</h3> :
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
                                    <div className="actions">
                                        <span>REPLY</span>
                                        {comment.owner ?
                                            <span onClick={() => setIdToDelete(comment.id)}>DELETE</span> : null}
                                    </div>
                                    {comment.nb_responses ?

                                        <RepliesList nbResponses={comment.nb_responses}
                                                     setNbComments={setNbComments}
                                                     nbComments={nbComments}
                                                     setShowAuth={setShowAuth}
                                                     setShowModal={setShowModal}
                                                     commentId={comment.id}
                                                     postId={postId}/>
                                        : null
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            }


        </div>


    </div>;
}

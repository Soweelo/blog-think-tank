import "./replieslist.scss"
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";
import arrayRemove from "../../functions/arrayRemove";
import {useContext, useEffect, useState} from "react";
import {logout} from "../../context functions/apiCalls";
import {UserContext} from "../../context/UserContext";
import {format} from "timeago.js";

export default function RepliesList({nbResponses,setNbComments,nbComments, commentId, postId}) {
    const {user, dispatch} = useContext(UserContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [isFolded, setIsFolded] = useState(true)
    const [allReplies, setAllReplies] = useState([])
    const [loadReplies, setLoadReplies] = useState(false);
    const [commentIdToDelete, setIdToDelete] = useState(-1) //commentId to delete
    const [updatedNbResponses, setUpdatedNbResponses] = useState(nbResponses); //by default the number of responses is got from api. when a response is created or deleted though, we update this number without rerendering
    const showReplies = () =>{
        setIsFolded(!isFolded)
        if(allReplies.length == 0){
            setLoadReplies(true)
        }
    }
    const getReplies = async () => {
        try {
            const response = await fetch(
                PF + "/api/comments/" + postId + "/" + commentId + "/find?token=" + (user ? user.session : 0)
            );
            const data = await response.json();
            console.log(data)
            if (data.success) {
                setAllReplies(data.data);
                setLoadReplies(false)
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
    const deleteComment = async () => {
        try {
            //request delete
            const response = await fetch(
                PF + "/api/comments/" + commentIdToDelete + "?token=" + user.session,
                {method: "DELETE"}
            );
            const data = await response.json();
            if (data.success) {

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
        setLoadReplies(true)
        setNbComments(nbComments - 1)
        setUpdatedNbResponses(updatedNbResponses - 1)
    }
    useEffect(()=>{
        if(loadReplies){
            getReplies()
        }
    },[loadReplies])
    useEffect(() => {
        console.log(commentIdToDelete)
        if (commentIdToDelete > 0) {
            deleteComment()
        }
    }, [commentIdToDelete])
    return (
        <div className="repliesList">
            <div className="showRepliesBtn" onClick={() => showReplies()}>
                {!isFolded ?
                    <div>
                        Hide {nbResponses} {updatedNbResponses == 1 ? "reply" : "replies"}
                        <ArrowDropUp/>
                    </div>
                    :
                    <div>
                        Show {nbResponses} {updatedNbResponses == 1 ? "reply" : "replies"}
                        <ArrowDropDown/>
                    </div>
                }
            </div>
            <div className={"repliesContainer " + (!isFolded ? "expand" : "")
            }>
                <div className="repliesWrapper">
                    {allReplies.map((comment, i) => {
                        return (
                            <div key={i} className="commentWrapper">
                                <div className="top">
                                    <div className="pseudo">{comment.member}</div>
                                    <div className="date">{format(comment.updated_at)}</div>
                                </div>
                                <div className="text">{comment.content}</div>
                                <div className="bottom">
                                    {comment.owner ?
                                        <div className="actions">
                                            <span onClick={() => setIdToDelete(comment.id)}>DELETE</span>
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>


    )
}
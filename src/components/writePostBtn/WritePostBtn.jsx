import {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import {Add} from "@material-ui/icons";
import "./writepostbtn.scss"

export default function  WritePostBtn ({setAccountContent, setHomeContent, setShowAuth, setShowModal, modal}) {
    const { user } = useContext(UserContext);
    const handleWritePost = () => {
        setAccountContent(1)
        if(user){
            setHomeContent("5")
        }else{
            if(modal){
                setShowModal(false)
            }
            setShowAuth(true)
        }

    }
        return (
            <div
                className="writePostBtn"
                title="Write a Post Now!"
                onClick={handleWritePost}
            >
                <Add/>
            </div>
        );

}




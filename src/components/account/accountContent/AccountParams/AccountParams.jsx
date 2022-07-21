import "./accountparams.scss"
import {
    ArrowBack,
    LockOpen,
    MailOutline,
    PersonOutline,
    StarOutline,
} from "@material-ui/icons";
import {useFetch} from "../../../../hooks/useFetch";
import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../../context/UserContext";
import {logout, updateUser} from "../../../../context functions/apiCalls";

export default function AccountParams({setMobileView, setHomeContent, setIsOpenedPopup, setPopupContent}) {
    // console.log("rerender account params");
    const fetch = useFetch();
    const {user, dispatch} = useContext(UserContext);
    const [isFetching, setIsFetching] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [status, setStatus] = useState("");
    const [password, setPassword] = useState("");
    const [changeUserInfo, setChangeUserInfo] = useState(true);
    const [message, setMessage] = useState([0, ""]);// array with 0 for error 1 for success, and second argument is message text
    const newPassword = useRef()
    const [modifyPassword, setModifyPassword] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false);
    const getMemberbySession = async () => {
        try {
            setIsFetching(true);
            const response = await fetch(
                PF + "/api/members/session?token=" + user.session
            ).then((r) => r.json());

            if (response.success == true) {
                setEmail(response.data.email);
                setPassword("*********");
                setUserId(response.data.id);
                setStatus(response.data.is_premium);
                setPseudo(response.data.pseudo);
            } else {
                if (response.message === "This session token is not valid") {
                    logout(dispatch);
                }
            }
            setIsFetching(false);
        } catch (e) {
            if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
                console.error(e);
            }
        }
    };
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        setIsFetching(true)
        setMessage([0, ""])
        console.log("hello", newPassword.current.value)
        try {
            const requestOptions = {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    password: newPassword.current.value,
                }),
            };
            let url = PF + "/api/members?token=" + user.session;
            let res = await fetch(url, requestOptions).then((res) => res.json());
            console.log(res)
            if (res.success) {
                console.log(res.data);
                setMessage([1, res.message])
                setModifyPassword(false)
            } else {
                setMessage([0, res.message])
            }
            setIsFetching(false)
        } catch (e) {
            if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
                console.error(e);
            }
            setIsFetching(false)
        }
    }
    const deleteAccount = async () => {
        try {
            const response = await fetch(
                PF + "/api/members?token=" + user.session,
                { method: "DELETE"}
            );
            const data = await response.json();
            console.log(data)
            if (data.success) {
                logout(dispatch);
                // setPostMessage(data.message);
            } else {
                if (data.message === "This session token is not valid") {
                    logout(dispatch);
                }else{
                    logout(dispatch);
                }
            }
        } catch (e) {
            if (!(e instanceof DOMException) || e.code !== e.ABORT_ERR) {
                console.error(e);
            }
        }
        setOpenConfirm(false);
    }
    useEffect(() => {
        if (changeUserInfo) {
            getMemberbySession();
            setChangeUserInfo(false);
        }
    }, [changeUserInfo]);
    useEffect(() => {
        setModifyPassword(false)
    }, [])

    return (
        <div className="account-content__account-params-wrapper">
            <ArrowBack
                className="mobileView"
                onClick={() => {
                    setMobileView("menu");
                }}
            />
            <h2>My Account
                <div
                className="btn account-content__buttons-btn-delete"
                onClick={() => setOpenConfirm(true)}
            >
                DELETE ACCOUNT
            </div></h2>

            <div className={"account__form-message" + (message[0] ? " validate" : "")}>{message[1]}</div>
            {openConfirm && (
                <div className="account__message--delete">
                    <div className="account__message-delete-text">
                        Are you sure you want to delete your account?
                        <br/>

                        All your posts and brands will be lost...
                    </div>

                    <div className="account__message-delete-btn">
                        <button
                            onClick={() => {
                                deleteAccount();
                            }}
                        >
                            yes
                        </button>
                        <button
                            onClick={() => {
                                setOpenConfirm(false);
                            }}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
            <div className="account-content__info-container">
                <div className="account-content__info-line">
                    <div className="account-content__label">
                        <PersonOutline/>
                        Pseudo
                    </div>
                    <div className="account-content__value">{pseudo}</div>
                </div>
                <div className="account-content__info-line">
                    <div className="account-content__label">
                        <LockOpen/>
                        Password
                    </div>

                    {modifyPassword ?
                        <>
                            <input ref={newPassword} className="account-content__value" placeholder="New password"
                                   disabled={isFetching}></input>
                            < button className="account__btn-submit btn" onClick={handlePasswordSubmit}
                                     disabled={isFetching}>
                                {isFetching ?
                                    <div className="lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    : "SAVE"}
                            </button>
                        </> :
                        <>
                            <div className="account-content__value">{password}</div>
                            < button className="account-content__buttons-btn-edit btn"
                                     onClick={() => setModifyPassword(true)}>Modificate
                            </button>
                        </>
                    }

                </div>
                <div className="account-content__info-line">
                    <div className="account-content__label">
                        <StarOutline/>
                        Status
                    </div>
                    <div className="account-content__value">
                        {status ? "Premium user" : "Basic"}
                    </div>
                </div>
                <div className="account-content__info-line">
                    <div className="account-content__label">
                        <MailOutline/>
                        Email
                    </div>
                    <div className="account-content__value">{email}</div>
                </div>
            </div>
        </div>
    );
}

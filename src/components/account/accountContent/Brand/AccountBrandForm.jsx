import {useContext, useState} from "react";
import styled from "styled-components";
import {UserContext} from "../../../../context/UserContext";
import {logout} from "../../../../context functions/apiCalls";

const StyledInput = styled.input`
  display: block;
  margin: 0.3rem 0 0 0;
  border: none;
  padding: 0 0 0 0.5rem;
  background-color: white;
  opacity: 0.8;
  color: black;
  border: 1px solid rgba(100, 100, 100, 0.68);
  border-radius: 20px;
  height: 40px;
  width: max(50%, 300px);
  max-width: 100%;
`;
export default function AccountBrandForm({
                                             accountBrandForm,
                                             setBackMessage,
                                             setAccountContent,
                                             brandContent,
                                         }) {
    const {user, dispatch} = useContext(UserContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [message, setMessage] = useState("");
    const [brandId, setBrandId] = useState(
        accountBrandForm == 1 ? brandContent[0] : ""
    );
    const [brandName, setBrandName] = useState(
        accountBrandForm == 1 ? brandContent[1] : ""
    );
    const [brandLink, setBrandLink] = useState(
        accountBrandForm == 1 ? brandContent[2] : ""
    );
    const handleBrandNameChange = (e) => {
        e.preventDefault()
        setBrandName(e.target.value);
    };
    // console.log(brandLink, brandName);
    const handleBrandLinkChange = (e) => {
        e.preventDefault()
        setBrandLink(e.target.value);
    };
    //add Brand
    const submitAddBrand = async (event) => {
        event.preventDefault();
        // try{
        if (
            5 < brandName.length &&
            brandName.length < 25 &&
            brandName.length > 0 &&
            brandName.length > 3
        ) {
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: brandName,
                    link: brandLink,
                    token: user.session,
                }),
            };
            const url = PF + "/api/brands";
            // console.log(hashedRegPsw, regEmail,url)
            const response = await fetch(url, requestOptions).then((response) =>
                response.json()
            );
            let data = await response;
            if (data.success == true) {
                // console.log(response);
                setBackMessage(data.message);
                setAccountContent(2);
            } else {
                console.log(response);
                setMessage(data.message);
                if (data.message === "This session token is not valid") {
                    logout(dispatch);
                }
            }
        } else {
            setMessage("Your brand name or link length is not valid");
        }
    };
    //edit Brand
    const submitEditBrand = async (event) => {
        event.preventDefault();
        // try{
        if (
            5 < brandName.length &&
            brandName.length < 25 &&
            brandName.length > 0 &&
            brandName.length > 3
        ) {
            // alert("fine length")
            const requestOptions = {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    link: brandLink,
                    name: brandName,
                    token: user.session,
                }),
            };
            const url = PF + "/api/brands/" + brandId;
            const response = await fetch(url, requestOptions).then((response) =>
                response.json()
            );
            let data = await response;
            if (data.success == true) {
                // console.log(response);
                setBackMessage(data.message);
                setAccountContent(2);
            } else {
                // console.log(response);
                setMessage(data.message);
                if (data.message === "This session token is not valid") {
                    logout(dispatch);
                }
            }
        } else {
            setMessage("Your brand name or link length is not valid");
        }
    };
    console.log(brandContent)
    return (
        <div className="account-content__account-params-wrapper">
            <h2>{accountBrandForm === 1 ? "Edit your Link" : "Add a new Link"}</h2>
            <div className="account__form-message">{message}</div>
            <form onSubmit={accountBrandForm === 1 ? submitEditBrand : submitAddBrand}>
                <div className="account__input-container">
                    <div className="account-label">Name</div>
                    <StyledInput
                        className="input-field"
                        type="text"
                        placeholder={accountBrandForm === 1 ? brandName : "Type Your Link name"}
                        onChange={handleBrandNameChange}
                        value={brandName}
                    />
                </div>
                <div className="account__input-container">
                    <div className="account-label">URL</div>
                    <StyledInput
                        className="input-field"
                        type="text"
                        placeholder={accountBrandForm === 1 ? brandLink : "Type Your Link URL"}
                        onChange={handleBrandLinkChange}
                        value={brandLink}
                    />
                </div>
                <button className="btn account__btn-submit" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

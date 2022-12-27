import "./addbrand.scss";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

import { useContext, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { logout } from "../../../../context functions/apiCalls";
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
export default function AddBrand({ allBrands, postBrand }) {
  const { user, dispatch } = useContext(UserContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [message, setMessage] = useState("");
  const [greenMessage, setGreenMessage] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandLink, setBrandLink] = useState("");
  const getAllBrands = async () => {
    // console.log("in getallbrands");
    try {
      const response = await fetch(
        PF + "/api/brands/list?token=" + user.session
      );
      const data = await response.json();
      // console.log(data.data);
      if (data.success) {
        allBrands.set(data.data);
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
  };
  const handleBrandNameChange = (e) => {
    e.preventDefault();
    setBrandName(e.target.value);
  };
  // console.log(brandLink, brandName);
  const handleBrandLinkChange = (e) => {
    e.preventDefault();
    setBrandLink(e.target.value);
  };
  //add Brand
  const submitAddBrand = async () => {
    setIsFetching(true);
    // try{
    if (
      5 < brandName.length &&
      brandName.length < 25 &&
      brandName.length > 0 &&
      brandName.length > 3
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: brandName,
          link: brandLink,
          token: user.session,
        }),
      };
      const url = PF + "/api/brands";
      const response = await fetch(url, requestOptions).then((response) =>
        response.json()
      );
      let data = await response;
      if (data.success == true) {
        // console.log(response);
        setGreenMessage(true);
        setMessage(data.message);
        setIsFetching(false);
        postBrand.set([brandName]);
        getAllBrands();
      } else {
        // console.log(response);
        setGreenMessage(false);
        setMessage(data.message);
        if (data.message === "This session token is not valid") {
          logout(dispatch);
        }
        setIsFetching(false);
      }
    } else {
      setGreenMessage(false);
      setMessage("Your brand name or link length is not valid");
      setIsFetching(false);
    }
  };
  return (
    <>
      <div className="account__input-container">
        <div className="account-label">Name</div>
        <StyledInput
          className="input-field"
          type="text"
          placeholder={"Type Your Link name"}
          onChange={handleBrandNameChange}
          value={brandName}
          disabled={isFetching}
        />
      </div>
      <div className="account__input-container">
        <div className="account-label">URL</div>
        <StyledInput
          className="input-field"
          type="text"
          placeholder={"Type Your Link URL"}
          onChange={handleBrandLinkChange}
          value={brandLink}
          disabled={isFetching}
        />
      </div>
      <div
        className="btn account__btn-submit account__btn-add-link"
        onClick={() => submitAddBrand()}
        disabled={isFetching}
      >
        {isFetching ? <CircularProgress size="20px" /> : "SAVE"}
      </div>
      <div
        className={"account__form-message" + (greenMessage ? " validate" : "")}
      >
        {message}
      </div>
    </>
  );
}

import { useContext, useState } from "react";
import styled from "styled-components";
import { Mail, Close } from "@material-ui/icons";
import outDateCookieSession from "../../../../functions/cookiesController/outDateCookieSession";
import { AuthContext } from "../../../../context/AuthContext";
import { logout } from "../../../../apiCalls";
// Styling a regular HTML input
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
`;
export default function AccountBrandForm({
  formContent,
  setBackMessage,
  setAccountContent,
  brandContent,
  setHomeContent,
}) {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [message, setMessage] = useState("");
  const [brandId, setBrandId] = useState(
    formContent == 1 ? brandContent[0] : ""
  );
  const [brandName, setBrandName] = useState(
    formContent == 1 ? brandContent[1] : ""
  );
  const [brandLink, setBrandLink] = useState(
    formContent == 1 ? brandContent[2] : ""
  );
  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };
  // console.log(brandLink, brandName);
  const handleBrandLinkChange = (e) => {
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
      // alert("fine length")

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          link: brandLink,
          name: brandName,
          token: user.session,
        }),
      };
      const url = PF + "/api/brands/" + brandId;
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
  return (
    <>
      <h2>{formContent === 1 ? "Edit your Brand" : "Add a new Brand"}</h2>
      <div className="account__form-message">{message}</div>
      <form onSubmit={formContent === 1 ? submitEditBrand : submitAddBrand}>
        <div className="account__input-container">
          <div className="account-label">Name</div>
          <StyledInput
            className="input-field"
            type="text"
            placeholder={formContent === 1 ? brandName : "Type Your Brand name"}
            onChange={handleBrandNameChange}
            value={brandName}
          />
        </div>
        <div className="account__input-container">
          <div className="account-label">Link</div>
          <StyledInput
            className="input-field"
            type="text"
            placeholder={formContent === 1 ? brandLink : "Type Your Brand link"}
            onChange={handleBrandLinkChange}
            value={brandLink}
          />
        </div>
        <button className="btn account__btn-submit" type="submit">
          Save
        </button>
      </form>
    </>
  );
}

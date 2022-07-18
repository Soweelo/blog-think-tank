import React from 'react';
import { Person, Create, LocalOffer} from "@material-ui/icons";
import {components} from "react-select";
 function renderIconSwitch(id){
    switch (id ){
        case 1:
            return (<><Create/></>);
        case 2:
            return (<><LocalOffer/></>);
        default:
            return (<><Person /></>)
    }
}

export default function AccountContentMenuItem({id, name, setMobileView, mobileView, setAccountContent}) {
   const Icon = renderIconSwitch(id)

    const handleClickMenuItem = () => {
      setMobileView("content")
        console.log(id, "click", mobileView);
        setAccountContent(id);
    }
    return (
        <li
            onClick={()=> {
                handleClickMenuItem()
            }}
        >

            {Icon}

            {name}
        </li>

    )
};


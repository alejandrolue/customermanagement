import React, {useState} from "react";
import {Switch} from "@mui/material";

function SwitchButton() {
    const [value, setValue] = useState(false)
    const onClickHandler = () => {
        setValue(!value)
        console.log(value)
    }

    return (
        <div className="switch">
            <Switch onClick={() => onClickHandler()}/>
        </div>
    )
}

export default SwitchButton
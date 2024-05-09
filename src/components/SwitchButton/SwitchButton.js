import React, {useState} from "react"
import {Switch} from "@mui/material";

export default function SwitchButton({value, getValue}) {
    const onHandleChange = (e) => {
        const checked = e.target.checked
        getValue({state: checked, value: value})
    }
    return (
        <div className="SwitchButton">
            <Switch onClick={onHandleChange} value={value}/>
        </div>
    )
}
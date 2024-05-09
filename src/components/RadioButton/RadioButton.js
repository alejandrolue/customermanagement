import React from "react"
import {Radio} from "@mui/material";

export default function RadioButton(props) {
    return (
        <div className="radioButton">
            <Radio value={props.value} label={props.label}/>
        </div>
    )
}
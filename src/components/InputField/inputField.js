import React, {useState} from "react"
import {TextField} from "@mui/material";

export default function InputField({label, variant, sendValue}) {
    const [value, setValue] = useState("")
    const onHandleChange = (e) => {
        setValue(value)
        sendValue(value)
    }
    return (
        <div className="inputField">
            <TextField label={label} variant={variant} onChange={(e) => onHandleChange(e.target.value)}/>
        </div>
    )
}
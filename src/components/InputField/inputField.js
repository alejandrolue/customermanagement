import React from "react"
import {TextField} from "@mui/material";

export default function InputField({value, label, variant, onChildValueChange, inputValue}) {
    const onHandleChange = (e) => {
        const newValue = e.target.value
        onChildValueChange({name: value, value: newValue})
    }
    return (
        <div className="inputField">
            <TextField label={label} variant={variant} onChange={onHandleChange} />
        </div>
    )
}
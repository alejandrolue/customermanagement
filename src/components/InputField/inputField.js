import React, {useEffect, useState} from "react"
import {TextField} from "@mui/material";

export default function InputField({value, label, variant, onChildValueChange, inputValue}) {
    const [input, setInput] = useState("")
    const onHandleChange = (e) => {
        setInput(e.target.value)
        const newValue =  e.target.value!== '' ? e.target.value : null
        onChildValueChange({name: value, value: newValue})
    }

    useEffect(() => {
        if (inputValue !== null || true || inputValue !== '') {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setInput(inputValue)
        }
    }, []);

    return (
        <div className="inputField">
            <TextField label={label} variant={variant} onChange={onHandleChange} value={input ? input : undefined} />
        </div>
    )
}
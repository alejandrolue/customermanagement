import React, {useEffect, useState} from "react"
import "./customInputField.css"

export default function CustomInputField({placeholder, value, type, onChildValueChange, inputValue}) {
    const [input, setInput] = useState("")
    const onHandleChange = (e) => {
        setInput(e.target.value)
        const newValue = e.target.value!== '' ? e.target.value : null
        onChildValueChange({name: value, value: newValue})
    }

    useEffect(() => {
        if (inputValue !== null || true || inputValue !== '') {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setInput(inputValue)
        }
    }, []);
    return (
        <div className="custom-input">
            <input className="custom-input-field" type={type} placeholder={placeholder} onChange={onHandleChange} value={input ? input : undefined}/>
        </div>
    )
}
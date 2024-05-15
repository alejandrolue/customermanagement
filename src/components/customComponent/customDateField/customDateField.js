import React, {useEffect, useState} from "react"
import "./customDateField.css"

export default function CustomDateField({onChildValueChange, value, inputValue}) {
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
        <div className="custom-date">
            <input className="custom-date-input" type="date" onChange={onHandleChange} value={input ? input : undefined}/>
        </div>
    )
}
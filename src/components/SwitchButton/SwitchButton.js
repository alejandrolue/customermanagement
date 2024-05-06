import React, {useState} from "react"
import {Switch} from "@mui/material";

export default function SwitchButton({getValue}) {
    const [value, setValue] = useState(false)

    const onHandleChange = () => {
        setValue(!value)
        getValue(value)
    }
    return (
        <div className="SwitchButton">
            <Switch onClick={onHandleChange}/>
        </div>
    )
}
import React, {useState} from "react";
import {TextField} from "@mui/material";

function InputField(props) {
    const [value, setValue] = useState("")

    const onValueChange = (e) => {
        setValue(e)
        console.log(value)
    }


    return (
        <div className="InputField">
            <TextField onChange={(e) => onValueChange(e.target.value)} label={props.label} variant={props.variant}/>
        </div>
    )
}

export default InputField
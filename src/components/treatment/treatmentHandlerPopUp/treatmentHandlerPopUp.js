import React, {useState} from 'react';
import Popup from 'reactjs-popup';
import "./treatmentHandlerPopUp.css"
import TreatmentHandler from "../treatmentHandler/treatmentHandler";
import "../../treatment/treatmentHandlerPopUp/treatmentHandlerPopUp.css"
import {Button} from "@mui/material";

export default function TreatmentHandlerPopUp({data, id, buttonText, onStateChange}) {
    let tableData = data
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
        onStateChange()
    }

    return (
        <div>
            <Button className="button" onClick={() => setOpen(o => !o)}> {buttonText} </Button>

            <Popup id="popUp-root"
                className="popUp"
                open={open}
                closeOnDocumentClick
                onClose={closeModal}>

                <TreatmentHandler id={id} data={tableData} closeModal={closeModal}/>
            </Popup>
        </div>
    )
        ;
};
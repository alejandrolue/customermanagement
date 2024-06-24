import React, {useState} from "react"
import {Button} from "@mui/material";
import Popup from "reactjs-popup";
import TreatmentHandler from "../treatmentHandler/treatmentHandler";
import CreateTreatmentTable from "../createTreatmentTable/createTreatmentTable";

export default function CreateTreatmentTablePopUp({id, buttonText, onStateChange}) {
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
        onStateChange()
    }

    return (
        <div className="createTreatmentTablePopUp-container">
            <Button className="button" onClick={() => setOpen(o => !o)}> {buttonText} </Button>

            <Popup id="popUp-root"
                   className="popUp"
                   open={open}
                   closeOnDocumentClick
                   onClose={closeModal}>

                <CreateTreatmentTable clientId={id} closeModal={closeModal}/>
            </Popup>
        </div>
    )
}
import React, {useState} from "react"
import TreatmentHandler from "../../treatment/treatmentHandler/treatmentHandler";
import Popup from "reactjs-popup";
import CustomerForm from "../CustomerForm/customerForm";
import {Button} from "@mui/material";

export default function CustomerFormPopUp({onStateChange}) {
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
        onStateChange()
    }
    return (
        <div className="customerFormPopUp-container">
            <Button className="button" onClick={() => setOpen(o => !o)}> ADD NEW CUSTOMER </Button>
            <div>
                <Popup id="popUp-root"
                       className="popUp"
                       open={open}
                       closeOnDocumentClick
                       onClose={closeModal}>

                    <CustomerForm closeModal={closeModal}/>
                </Popup>
            </div>
        </div>
    )
}
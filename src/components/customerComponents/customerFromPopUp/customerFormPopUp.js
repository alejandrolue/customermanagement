import React, {useState} from "react"
import TreatmentHandler from "../../treatment/treatmentHandler/treatmentHandler";
import Popup from "reactjs-popup";
import CustomerForm from "../CustomerForm/customerForm";
import {Button} from "@mui/material";

export default function CustomerFormPopUp({onStateChange, value, data}) {
    const [open, setOpen] = useState(false);
    let clientData = data
    const closeModal = () => {
        setOpen(false);
        onStateChange()
    }
    return (
        <div className="customerFormPopUp-container">
            <Button className="button" onClick={() => setOpen(o => !o)}> {value} </Button>
            <div>
                <Popup id="popUp-root"
                       className="popUp"
                       open={open}
                       closeOnDocumentClick
                       onClose={closeModal}>

                    <CustomerForm closeModal={closeModal} data={clientData}/>
                </Popup>
            </div>
        </div>
    )
}
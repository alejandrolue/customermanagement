import React, {useCallback, useState} from "react"
import {useLocation} from "react-router-dom";
import {Button, Card, CardContent, Typography} from "@mui/material";
import SessionTable from "../../components/sessionTable/sessionTable";
import TreatmentTable from "../../components/treatment/treatmentTable/treatmentTable";
import TreatmentHandler from "../../components/treatment/treatmentHandler/treatmentHandler";
import "./customerPage.css"
import Popup from "reactjs-popup";
import TreatmentHandlerPopUp from "../../components/treatment/treatmentHandlerPopUp/treatmentHandlerPopUp";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../config/firebase";

export default function CustomerPage() {
    const location = useLocation()
    const client = location.state
    const clientId = client.id
    const [change, setChange] = useState(false)

    const handleDeleteDocument = async () => {
        try {
            // Delete the document
            await deleteDoc(doc(db, "clients", clientId));

            console.log("Document deleted successfully");
        } catch (err) {
            console.error("Error deleting document:", err);
        }
    };

    const caller = () => {
        onStateChange()
    }

    const onStateChange = useCallback(() => {
        setChange(open => !open);
    }, [change]);

    return (
        <div className="customerPage">
            <div style={{width: 700}}>
                <Card xs={{maxWidth: 500}}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            Client information
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Name: {client.firstName} {client.lastName} Number: {client.phoneNumber}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Address: {client.street} {client.postCode} Birthdate: {client.birthDate}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Recommended by: {client.recommendation}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Agne Pectoris: {client.agnePectoris ? ("Yes") : ("No")}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Lungenmobile: {client.lungenmobile ? ("Yes") : ("No")}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Medicament: {client.medication ? ("Yes") : ("No")}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Thrombosegefahr: {client.thrombosegefahr ? ("Yes") : ("No")}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Niereninsuffizenz: {client.niereninsuffizienz ? ("Yes") : ("No")}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Offenes bein: {client.openLeg ? ("Yes") : ("No")}
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <div>
                <TreatmentHandlerPopUp id={clientId} buttonText="ADD NEW TREATMENT" onStateChange={caller}/>
            </div>
            <div>
                <TreatmentTable id={clientId} onStateChange={caller}/>
            </div>
            <Button onClick={handleDeleteDocument}>DELETE CLIENT</Button>
        </div>
    )
}
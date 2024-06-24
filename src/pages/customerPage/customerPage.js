import React, {useCallback, useEffect, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Card, CardContent, Typography} from "@mui/material";
import TreatmentTable from "../../components/treatment/treatmentTable/treatmentTable";
import "./customerPage.css"
import TreatmentHandlerPopUp from "../../components/treatment/treatmentHandlerPopUp/treatmentHandlerPopUp";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase";
import CustomerFormPopUp from "../../components/customerComponents/customerFromPopUp/customerFormPopUp";
import CreateTreatmentTablePopUp from "../../components/treatment/createTreatmentTablePopUp/createTreatmentTablePopUp";
import WeightGraph from "../../components/customerComponents/clientCharts/weightGraph/weightGraph";

export default function CustomerPage() {
    const location = useLocation()
    const client = location.state
    const clientId = client.id
    const [change, setChange] = useState(false)
    const nav = useNavigate()
    const [treatmentTableList, setTreatmentTableList] = useState([])
    const treatmentTableListRef = collection(db, "clients", clientId, "treatmentTable")

    useEffect(() => {
        const getTreatmentTableList = async () => {
            try {
                const data = await getDocs(treatmentTableListRef);
                const list = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setTreatmentTableList(list)
            } catch (err) {
                console.log(err)
            }
        }
        getTreatmentTableList()
    }, [change]);

    const caller = () => {
        onStateChange()
        console.log("called")
    }

    const onStateChange = useCallback(() => {
        setChange(open => !open);
    }, [change]);

    const onHandleClick = () => {
        nav("/client", {state: client})
    }

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
                            Angina Pectoris: {client.agnePectoris ? ("Yes") : ("No")}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Lungenembolie: {client.lungenmobile ? ("Yes") : ("No")}
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
                        <Button onClick={onHandleClick}>CLIENT VIEW</Button>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h1>Treatments</h1>
                <CreateTreatmentTablePopUp id={clientId} onStateChange={caller} buttonText="CREATE NEW TABLE"/>
            </div>
            <div>
                {treatmentTableList.map((data) => (
                    <>
                        <h4>ABO: {data.aboName} TYPE: {data.type} SESSIONS: {data.sessions}</h4>
                        <TreatmentHandlerPopUp id={clientId} treatmentTable={data.id} buttonText="ADD NEW TREATMENT"
                                               onStateChange={caller}/>
                        <TreatmentTable id={clientId} onStateChange={caller} tableId={data.id}/>
                    </>
                ))}

            </div>
            <CustomerFormPopUp value="EDIT CLIENT" data={client} id={clientId} onStateChange={caller}/>
        </div>
    )
}
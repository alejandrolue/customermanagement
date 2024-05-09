import React from "react"
import {useLocation} from "react-router-dom";
import {Card, CardContent, Typography} from "@mui/material";
import SessionTable from "../../components/sessionTable/sessionTable";

export default function CustomerPage() {
    const location = useLocation()
    const client = location.state
    console.log(client.id)
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
            <div style={{maxWidth: 1000}}>
                <SessionTable client={client}/>
            </div>
        </div>
    )
}
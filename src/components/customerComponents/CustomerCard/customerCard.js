import React from "react"
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function CustomerCard({client}) {
    const nav = useNavigate()
    const onHandleClick = () => {
        nav("/customer", {state: client})
    }
    return (
        <div className="customerCard">
            <Card sx={{maxWidth: 250}} onClick={onHandleClick}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="p" component="div">
                            {client.firstName} {client.lastName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
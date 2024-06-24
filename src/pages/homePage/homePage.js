import React, {useCallback, useEffect, useState} from "react"
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase";
import CustomerCard from "../../components/customerComponents/CustomerCard/customerCard";
import TreatmentHandlerPopUp from "../../components/treatment/treatmentHandlerPopUp/treatmentHandlerPopUp";
import CustomerForm from "../../components/customerComponents/CustomerForm/customerForm";
import CustomerFormPopUp from "../../components/customerComponents/customerFromPopUp/customerFormPopUp";
import "./homePage.css"
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const [clientList, setClientList] = useState([])
    const clientsCollectionsRef = collection(db, "clients")
    const [change, setChange] = useState(false)
    const nav = useNavigate()
    useEffect(() => {
        const getClientsList = async () => {
            //READ THE DATA
            // SET THE CLIENTS DATA
            try {
                const data = await getDocs(clientsCollectionsRef);
                const list = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setClientList(list)
            } catch (err) {
                console.log(err)
            }
        }
        getClientsList()
    }, [change]);

    const caller = () => {
        onStateChange()
    }

    const onStateChange = useCallback(() => {
        setChange(open => !open);
    }, [change]);

    return (
        <div>
            <div className="App">
                <div>
                    <CustomerFormPopUp onStateChange={caller} value="ADD NEW CUSTOMER"/>
                    <Button onClick={() => nav("/finance")}>Finance</Button>
                </div>
                <div className="customerCards">

                    {clientList.map((client, index) => (
                        <CustomerCard client={client} key={index} onStateChange={caller}/>
                    ))}
                </div>
            </div>
        </div>

    )
}
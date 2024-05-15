import React, {useCallback, useEffect, useState} from "react"
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase";
import CustomerCard from "../../components/CustomerCard/customerCard";
import TreatmentHandlerPopUp from "../../components/treatment/treatmentHandlerPopUp/treatmentHandlerPopUp";
import CustomerForm from "../../components/customerComponents/CustomerForm/customerForm";
import CustomerFormPopUp from "../../components/customerComponents/customerFromPopUp/customerFormPopUp";

export default function HomePage() {
    const [clientList, setClientList] = useState([])
    const clientsCollectionsRef = collection(db, "clients")
    const [change, setChange] = useState(false)
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
                    <CustomerFormPopUp onStateChange={caller}/>
                </div>
                <div>

                    {clientList.map((client, index) => (
                        <CustomerCard client={client} key={index}/>
                    ))}
                </div>
            </div>
        </div>

    )
}
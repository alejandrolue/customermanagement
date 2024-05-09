import React, {useEffect, useState} from "react"
import CustomerForm from "../../components/CustomerForm/customerForm";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase";
import CustomerCard from "../../components/CustomerCard/customerCard";

export default function HomePage() {
    const [clientList, setClientList] = useState([])
    const clientsCollectionsRef = collection(db, "clients")
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
    }, []);

    return (
        <div>
            <div className="App">
                {clientList.map((client, index) => (
                    <CustomerCard client={client} key={index}/>
                ))}
            </div>
        </div>
    )
}
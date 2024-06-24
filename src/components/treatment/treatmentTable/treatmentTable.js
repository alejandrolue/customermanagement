import React, {useEffect, useState} from "react"
import "./treatmentTable.css"
import {collection, doc, getDocs, getColl} from "firebase/firestore";
import {db} from "../../../config/firebase";
import {Button} from "@mui/material";
import TreatmentHandlerPopUp from "../treatmentHandlerPopUp/treatmentHandlerPopUp";

export default function TreatmentTable({id, onStateChange, tableId}) {
    const treatmentDocRef = collection(db, "clients",id ,"treatmentTable", tableId, "treatments")
    const [treatmentList, setTreatmentList] = useState([])

    useEffect(() => {
        const getTreatmentList = async () => {
            try {
                const data = await getDocs(treatmentDocRef);
                const list = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                // Sort the list by date
                list.sort((a, b) => new Date(a.date) - new Date(b.date));
                setTreatmentList(list);
            } catch (err) {
                console.log(err)
            }
        }
        getTreatmentList()

    }, [onStateChange]);

    const closeModal = () => {
        onStateChange()
    }

    return (
        <div className="treatment-table-container">
            <table className="treatment-table">
                <thead>
                <tr>
                    <th className="treatment-table-head">Session</th>
                    <th className="treatment-table-head">Date</th>
                    <th className="treatment-table-head">Weight</th>
                    <th className="treatment-table-head">Treatment</th>
                    <th className="treatment-table-head">Bought product</th>
                    <th className="treatment-table-head">Payed at</th>
                    <th className="treatment-table-head">Edit</th>
                </tr>
                </thead>
                <tbody>
                {/* eslint-disable-next-line array-callback-return */}
                {treatmentList.map((data, index) => (
                    <tr key={index}>
                        <td className="treatment-table-row">{index + 1}</td>
                        <td className="treatment-table-row">{data.date}</td>
                        <td className="treatment-table-row">{data.weight}</td>
                        <td className="treatment-table-row">{data.treatment}</td>
                        <td className="treatment-table-row">{data.boughtProduct}</td>
                        <td className="treatment-table-row">{data.payedAt}</td>
                        <td className="treatment-table-row"><TreatmentHandlerPopUp treatmentTable={tableId} id={id} data={data} buttonText="CHANGE" onStateChange={closeModal} tableRow={data.id}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
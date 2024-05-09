import React, {useEffect, useState} from "react"
import {DataGrid} from '@mui/x-data-grid';
import {addDoc, collection, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase";
import {Button} from "@mui/material";

export default function SessionTable({client}) {
    const clientRef = collection(db, "clients/" + client.id + "/sessionInfo")
    const [formData, setFormData] = useState({})
    const [rows, setRows] = useState([
        {id: 1, session: "vor 1.Behandlung", date: "", weight: ""},
        {id: 2, session: "nach 1. Behandlung", date: "", weight: ""},
        {id: 3, session: "nach 5. Behandlung", date: "", weight: ""},
        {id: 4, session: "nach 10. Behandlung", date: "", weight: ""},
        {id: 5, session: "nach 20. Behandlung", date: "", weight: ""},
    ]);

    /*
    useEffect(() => {
        const getSessionInfo = async () => {
            //READ THE DATA
            // SET THE CLIENTS DATA
            try {
                const data = await getDocs(clientRef);
                const list = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setRows(list)
                console.log(list)
            } catch (err) {
                console.log(err)
            }
        }
        getSessionInfo()
    }, []);*/

    const submitChanges = async () => {
        try {
            await addDoc(clientRef, formData)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCellEdit = (params) => {
        const { id, field, value } = params;
        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(updatedRows);
        console.log(rows)
    };

    return (
        <div style={{height: 300, width: '50%'}}>
            <DataGrid rows={rows} columns={columns} onCellClick={handleCellEdit}/>
            <Button onClick={submitChanges}>Save</Button>
        </div>

    )
}

const columns = [
    {field: 'session', headerName: 'Session', width: 180, editable: false},
    {field: 'date', headerName: 'Date', width: 180, editable: true},
    {field: 'weight', headerName: 'Weight', width: 180, editable: true},

];


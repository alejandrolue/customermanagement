import React, {useState} from "react"
import CustomInputField from "../../customComponent/customInputField/customInputField";
import CustomDateField from "../../customComponent/customDateField/customDateField";
import {Button} from "@mui/material";
import dayjs from "dayjs";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../../config/firebase";

export default function CreateTreatmentTable({clientId, closeModal}) {
    const today = dayjs()
    const formattedToday = today.format('YYYY-MM-DD');
    let treatmentTableRef = collection(db, "clients/" + clientId + "/treatmentTable")
    const [formData, setFormData] = useState({
        day: formattedToday,
        aboName: "",
        price: "",
        type: "Facial",
        sessions: "12"
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.name]: e.value,
        });

    }

    const handleDropdownChange = (e) => {
        setFormData({
            ...formData,
            type: e.target.value
        })
        console.log(formData)
    }

    const handleDropdownChangeSessions = (e) => {
        setFormData({
            ...formData,
            sessions: e.target.value
        })
        console.log(formData)
    }

    const submitChanges = async () => {
        try {
            await addDoc(treatmentTableRef, formData)
            closeModal();
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="createTreatmentTable-container">
            <div className="treatment-handler-body">
                <div className="treatment-handler-content">
                    <div className="treatment-handler-head">
                        Create new table
                    </div>
                    <div className="treatment-handler-input">
                        <div className="treatment-handler-fields">
                            <CustomInputField placeholder="Abo" value="aboName" type="text"
                                              onChildValueChange={handleInputChange}/>
                            <CustomInputField placeholder="price" value="price" type="number"
                                              onChildValueChange={handleInputChange}/>
                            <label>Type:</label>
                            <select name="type" onChange={handleDropdownChange}>
                                <option value="facial">Facial</option>
                                <option value="body">Body</option>
                            </select>
                            <label>Sessions:</label>
                            <select name="sessions" onChange={handleDropdownChangeSessions}>
                                <option value="12">12</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        <div className="treatment-handler-picker">
                            <Button onClick={submitChanges}>ADD</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
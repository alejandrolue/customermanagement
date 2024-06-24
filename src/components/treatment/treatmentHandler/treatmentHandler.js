import React, {useEffect, useState} from "react";
import "./treatmentHandler.css"
import CustomInputField from "../../customComponent/customInputField/customInputField";
import CustomDateField from "../../customComponent/customDateField/customDateField";
import {addDoc, collection, deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../../../config/firebase";
import {Button} from "@mui/material";

export default function TreatmentHandler({id, data, closeModal, treatmentTable, treatmentId, tableRow}) {
    const clientDocRef = doc(db, "clients", id)
    const treatmentTableCollectionRef = collection(clientDocRef, "treatmentTable")
    const tableDocRef = doc(treatmentTableCollectionRef, treatmentTable)
    const treatmentsCollectionRef = collection(tableDocRef, "treatments");


    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        date: "",
        weight: "",
        treatment: "",
        treatmentPrice: "",
        boughtProduct: "",
        combinedProductPrice: "",
        payedAt: ""
    })

    const submitChanges = async () => {
        try {
            await addDoc(treatmentsCollectionRef, formData)
            closeModal();
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateChange = async () => {
        try {
            const treatmentUpdateRef = doc(db, "clients", id, "treatmentTable", treatmentTable, "treatments", tableRow);
            await setDoc(treatmentUpdateRef, formData);
        } catch (err) {
            console.error("Error updating document:", err);
        }
        closeModal();
    };

    const handleDeleteDocument = async () => {
        try {
            await deleteDoc(doc(db, "clients", id, "treatmentTable", treatmentTable, "treatments", tableRow));
        } catch (err) {
            console.error("Error deleting document:", err);
        }
        closeModal();
    };


    useEffect(() => {
        if (data ?? false) {
            setEdit(true);
            setFormData(data)
        }
    }, [data]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.name]: e.value,
        });
    }

    return (
        <div className="treatment-handler-container">
            <div className="treatment-handler-body">
                <div className="treatment-handler-content">
                    <div className="treatment-handler-head">
                        {edit ? (<h2>EDIT TREATMENT</h2>) : (<h2>ADD NEW TREATMENT</h2>)}
                    </div>
                    <div className="treatment-handler-input">
                        <div className="treatment-handler-fields">
                            <CustomInputField placeholder="Weight" value="weight" onChildValueChange={handleInputChange}
                                              type="number" inputValue={data && data.weight ? data.weight : undefined}/>
                            <CustomInputField placeholder="Treatment" value="treatment"
                                              onChildValueChange={handleInputChange} type="text"
                                              inputValue={data && data.treatment ? data.treatment : undefined}/>
                            <CustomInputField placeholder="Treatment Price" value="treatmentPrice"
                                              onChildValueChange={handleInputChange} type="number"
                                              inputValue={data && data.treatmentPrice ? data.treatmentPrice : undefined}/>

                        </div>
                        <div className="treatment-handler-fields">
                            <CustomInputField placeholder="Bought Product" value="boughtProduct"
                                              onChildValueChange={handleInputChange} type="text"
                                              inputValue={data && data.boughtProduct ? data.boughtProduct : undefined}/>
                            <CustomInputField placeholder="Combined Product Price" value="combinedProductPrice"
                                              onChildValueChange={handleInputChange} type="number"
                                              inputValue={data && data.combinedProductPrice ? data.combinedProductPrice : undefined}/>
                        </div>
                        <div className="treatment-handler-picker">
                            <div>
                                <p>Treatment date</p>
                                <CustomDateField value="date" onChildValueChange={handleInputChange}
                                                 inputValue={data && data.date ? data.date : undefined}/>
                            </div>
                            <div>
                                <p>Payed date</p>
                                <CustomDateField value="payedAt" onChildValueChange={handleInputChange}
                                                 inputValue={data && data.payedAt ? data.payedAt : undefined}/>
                            </div>

                        </div>
                        <div className="treatment-handler-picker">
                            {edit ? (<div>
                                    <Button onClick={handleUpdateChange}>UPDATE</Button>
                                    <Button onClick={handleDeleteDocument}>DELETE</Button></div>)
                                : (
                                    <Button onClick={submitChanges}>ADD</Button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
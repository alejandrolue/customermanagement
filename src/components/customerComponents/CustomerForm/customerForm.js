import React, {useEffect, useState} from "react"
import dayjs from 'dayjs';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Switch,
    Typography
} from "@mui/material";
import Radio from '@mui/joy/Radio';
import FormControl from '@mui/joy/FormControl';
import RadioGroup from '@mui/joy/RadioGroup';
import {collection, addDoc, doc, setDoc, deleteDoc} from "firebase/firestore";
import InputField from "../../InputField/inputField";
import SwitchButton from "../../SwitchButton/SwitchButton";
import {db} from "../../../config/firebase";
import CustomDateField from "../../customComponent/customDateField/customDateField";
import {useLocation, useNavigate} from "react-router-dom";

export default function CustomerForm({closeModal, data}) {
    const [recommendedBy, setRecommendedBy] = useState(false)
    const nav = useNavigate()
    const [edit, setEdit] = useState(false)
    const clientRef = collection(db, "clients")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        street: "",
        postCode: "",
        phoneNumber: "",
        birthDate: "",
        niereninsuffizienz: false,
        lungenembolie: false,
        medication: false,
        thrombosegefahr: false,
        anginaPectoris: false,
        openLeg: false,
        recommendation: "",
    })

    const handleInputChange = (e) => {
        const value = e.value
        const name = e.name
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateInput = (e) => {

        setFormData({
            ...formData,
            birthDate: e.value
        });
    }

    const handleRadioInput = (e) => {
        if (e.name === "recommended") {
            setRecommendedBy(true)
            setFormData({
                ...formData,
                recommendation: e.value
            });

        } else {
            setRecommendedBy(false)
            setFormData({
                ...formData,
                recommendation: e
            });
        }
    }

    const onSwitchChange = (e) => {
        setFormData({
            ...formData,
            [e.value]: e.state
        })
    }

    const handleRecommendedBy = () => {
        setRecommendedBy(true)
    }

    const createClient = async () => {
        try {
            await addDoc(clientRef, formData)
            closeModal()
            nav("/")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (data ?? false) {
            setEdit(true);
            setFormData(data)
        }
    }, [data]);

    const handleUpdateChange = async () => {
        try {
            const treatmentUpdateRef = doc(db, "clients", data.id);
            // Update the document with the new data (formData)
            await setDoc(treatmentUpdateRef, formData);
            nav("/")
        } catch (err) {
            console.error("Error updating document:", err);
        }
        closeModal();
    };

    const handleDelete = async () => {
        try {
            // Delete the document
            await deleteDoc(doc(db, "clients", data.id));
            nav("/")
        } catch (err) {
            console.error("Error deleting document:", err);
        }
        closeModal();
    };

    return (
        <div className="customerForm">
            <Card sx={{maxWidth: 700}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {edit ? (<h2>EDIT CLIENT</h2>) : (<h2>CREATE NEW CLIENT</h2>)}
                    </Typography>
                    <CardActions>
                        <InputField label="Firstname" variant="standard" value="firstName"
                                    onChildValueChange={handleInputChange} type="text"
                                    inputValue={data && data.firstName ? data.firstName : undefined}/>
                        <InputField label="Lastname" variant="standard" value="lastName"
                                    onChildValueChange={handleInputChange} type="text"
                                    inputValue={data && data.lastName ? data.lastName : undefined}/>
                        <InputField label="Street" value="street" variant="standard"
                                    onChildValueChange={handleInputChange} type="text"
                                    inputValue={data && data.street ? data.street : undefined}/>
                    </CardActions>
                    <CardActions>
                        <InputField label="Post code" variant="standard" value="postCode"
                                    onChildValueChange={handleInputChange} type="text"
                                    inputValue={data && data.postCode ? data.postCode : undefined}/>
                        <InputField label="Phone number" variant="standard" value="phoneNumber"
                                    onChildValueChange={handleInputChange} type="text"
                                    inputValue={data && data.phoneNumber ? data.phoneNumber : undefined}/>

                        <CustomDateField value="date" onChildValueChange={handleDateInput}
                                         inputValue={data && data.birthDate ? data.birthDate : undefined}/>
                    </CardActions>
                </CardContent>
                {edit ? (<></>) : (
                    <>
                        <CardContent>
                            <CardActions>
                                <Typography variant="body2" color="text.secondary">
                                    Niereninsuffizienz
                                </Typography>
                                <SwitchButton getValue={onSwitchChange} value="niereninsuffizienz"/>
                                <Typography variant="body2" color="text.secondary">
                                    Lungenembolie
                                </Typography>
                                <SwitchButton getValue={onSwitchChange} value="lungenmobile"/>
                            </CardActions>
                            <CardActions>
                                <Typography variant="body2" color="text.secondary">
                                    Nehmen sie zur Zeit Medikamente ein
                                </Typography>
                                <SwitchButton getValue={onSwitchChange} value="medication"/>
                                <Typography variant="body2" color="text.secondary">
                                    Thrombosegefahr
                                </Typography>
                                <SwitchButton getValue={onSwitchChange} value="thrombosegefahr"/>
                            </CardActions>
                            <CardActions>
                                <Typography variant="body2" color="text.secondary">
                                    Angina Pectoris
                                </Typography>
                                <SwitchButton getValue={onSwitchChange} value="agnePectoris"/>
                                <Typography variant="body2" color="text.secondary">
                                    Haben sie ein offenes bein
                                </Typography>
                                <SwitchButton getValue={onSwitchChange} value="openLeg"/>
                            </CardActions>
                        </CardContent>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Wie wurden sie auf uns aufmerksam?
                            </Typography>
                            <FormControl>
                                <RadioGroup>
                                    <Radio value="Inserat" label="Inserat" onClick={() => handleRadioInput("Inserat")}/>
                                    <Radio value="Telefonbuch" label="Telefonbuch"
                                           onClick={() => handleRadioInput("Telefonbuch")}/>
                                    <Radio value="Empfelung durch" label="Empfelung durch"
                                           onClick={handleRecommendedBy}/>
                                </RadioGroup>
                                {recommendedBy === true &&
                                    <InputField label="Recommended by" variant="standard" value="recommended"
                                                onChildValueChange={handleRadioInput}/>
                                }
                            </FormControl>
                        </CardContent>
                    </>
                )}
                <CardActions>
                    {edit ? (
                            <>
                                <Button size="small" color="primary" onClick={handleUpdateChange}>UPDATE</Button>
                                <Button size="small" color="primary" onClick={handleDelete}>DELETE</Button>
                            </>
                        )
                        :
                        (<Button size="small" color="primary" onClick={createClient}>CREATE</Button>)}
                </CardActions>
            </Card>
        </div>
    )
}
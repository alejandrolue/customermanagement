import React, {useState} from "react"
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
import {collection, addDoc} from "firebase/firestore";
import InputField from "../../InputField/inputField";
import SwitchButton from "../../SwitchButton/SwitchButton";
import {db} from "../../../config/firebase";
import CustomDateField from "../../customComponent/customDateField/customDateField";

export default function CustomerForm({closeModal}) {
    const [recommendedBy, setRecommendedBy] = useState(false)
    const clientRef = collection(db, "clients")
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        street: "",
        postCode: "",
        phoneNumber: "",
        birthDate: "",
        niereninsuffizienz: false,
        lungenmobile: false,
        medication: false,
        thrombosegefahr: false,
        agnePectoris: false,
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
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="customerForm">
            <Card sx={{maxWidth: 700}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Customer Form
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Enter the customers information
                    </Typography>
                    <CardActions>
                        <InputField label="Firstname" variant="standard" value="firstName"
                                    onChildValueChange={handleInputChange}/>
                        <InputField label="Lastname" variant="standard" value="lastName"
                                    onChildValueChange={handleInputChange}/>
                        <InputField label="Street" value="street" variant="standard"
                                    onChildValueChange={handleInputChange}/>
                    </CardActions>
                    <CardActions>
                        <InputField label="Post code" variant="standard" value="postCode"
                                    onChildValueChange={handleInputChange}/>
                        <InputField label="Phone number" variant="standard" value="phoneNumber"
                                    onChildValueChange={handleInputChange}/>

                        <CustomDateField value="date" onChildValueChange={handleDateInput}/>
                    </CardActions>
                    <CardActions>
                        <Typography variant="body2" color="text.secondary">
                            Niereninsuffizienz
                        </Typography>
                        <SwitchButton getValue={onSwitchChange} value="niereninsuffizienz"/>
                        <Typography variant="body2" color="text.secondary">
                            Lungenmobile
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
                            Agne Pectoris
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
                            <Radio value="Empfelung durch" label="Empfelung durch" onClick={handleRecommendedBy}/>
                        </RadioGroup>
                        {recommendedBy === true &&
                            <InputField label="Recommended by" variant="standard" value="recommended"
                                        onChildValueChange={handleRadioInput}/>
                        }
                    </FormControl>

                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={createClient}>
                        CREATE
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
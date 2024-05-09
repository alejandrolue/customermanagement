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
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import InputField from "../InputField/inputField";
import SwitchButton from "../SwitchButton/SwitchButton";
import {getValue} from "@testing-library/user-event/dist/utils";
import RadioButton from "../RadioButton/RadioButton";
import Radio from '@mui/joy/Radio';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import {collection, addDoc} from "firebase/firestore";
import {db} from "../../config/firebase";

export default function CustomerForm() {
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
        const date = dayjs(e).format('DD/MM/YYYY')
        setFormData({
            ...formData,
            birthDate: date
        });
    }

    const handleRadioInput = (e) => {
        if (recommendedBy) {
            handleRecommendedBy()
        }
        if (e.name === "recommended") {
            setFormData({
                ...formData,
                recommendation: e.value
            });

        } else {
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
        setRecommendedBy(!recommendedBy)
    }

    const createClient = async () => {
        try {
            await addDoc(clientRef, formData)
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
                        <InputField label="Firstname" variant="standard" value="firstName" onChildValueChange={handleInputChange}/>
                        <InputField label="Lastname" variant="standard" value="lastName" onChildValueChange={handleInputChange}/>
                        <InputField label="Street" value="street" variant="standard" onChildValueChange={handleInputChange}/>
                    </CardActions>
                    <CardActions>
                        <InputField label="Post code" variant="standard" value="postCode" onChildValueChange={handleInputChange}/>
                        <InputField label="Phone number" variant="standard" value="phoneNumber" onChildValueChange={handleInputChange}/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Birthdate"
                                    onChange={(value) => handleDateInput(value)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
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
                            <Radio value="Telefonbuch" label="Telefonbuch" onClick={() => handleRadioInput("Telefonbuch")}/>
                            <Radio value="Empfelung durch" label="Empfelung durch" onClick={handleRecommendedBy}/>
                        </RadioGroup>
                    </FormControl>
                    {recommendedBy === true &&
                        <InputField label="Recommended by" variant="standard" value="recommended" onChildValueChange={handleRadioInput}/>
                    }
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={createClient}>
                        Share
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
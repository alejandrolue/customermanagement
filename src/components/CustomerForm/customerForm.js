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

export default function CustomerForm() {
    const [dayValue, setDayValue] = useState(dayjs());
    const [switchValue, setSwitchValue] = useState()
    const [recommendedBy, setRecommendedBy] = useState(false)

    const onSwitchChange = (value) => {
        setSwitchValue(value)
        console.log(value)
    }

    const handleRecommendedBy = () => {
        setRecommendedBy(!recommendedBy)
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
                        <InputField label="Firstname" variant="standard"/>
                        <InputField label="LastName" variant="standard"/>
                        <InputField label="Street" variant="standard"/>
                    </CardActions>
                    <CardActions>
                        <InputField label="Post code" variant="standard"/>
                        <InputField label="Phone number" variant="standard"/>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Birthdate"
                                    value={dayValue}
                                    onChange={(newValue) => setDayValue(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </CardActions>
                    <CardActions>
                        <Typography variant="body2" color="text.secondary">
                            Niereninsuffizienz
                        </Typography>
                        <SwitchButton getValue={onSwitchChange}/>
                        <Typography variant="body2" color="text.secondary">
                            Lungenmobile
                        </Typography>
                        <SwitchButton getValue={onSwitchChange}/>
                    </CardActions>
                    <CardActions>
                        <Typography variant="body2" color="text.secondary">
                            Nehmen sie zur Zeit Medikamente ein
                        </Typography>
                        <SwitchButton getValue={onSwitchChange}/>
                        <Typography variant="body2" color="text.secondary">
                            Thrombosegefahr
                        </Typography>
                        <SwitchButton getValue={onSwitchChange}/>
                    </CardActions>
                    <CardActions>
                        <Typography variant="body2" color="text.secondary">
                            Agne Pectoris
                        </Typography>
                        <SwitchButton getValue={onSwitchChange}/>
                        <Typography variant="body2" color="text.secondary">
                            Haben sie ein offenes bein
                        </Typography>
                        <SwitchButton getValue={onSwitchChange}/>
                    </CardActions>
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Wie wurden sie auf uns aufmerksam?
                    </Typography>
                    <FormControl>
                        <RadioGroup>
                            <Radio value="Inserat" label="Inserat"/>
                            <Radio value="Telefonbuch" label="Telefonbuch"/>
                            <Radio value="Empfelung durch" label="Empfelung durch" onClick={handleRecommendedBy}/>
                        </RadioGroup>
                    </FormControl>
                    {recommendedBy === true &&
                        <InputField label="Recommended by" variant="standard" />
                    }
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
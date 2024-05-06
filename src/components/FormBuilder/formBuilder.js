import React, {useState} from "react";
import {
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, MenuItem,
    Typography
} from "@mui/material";
import {Dropdown, MenuButton} from "@mui/base";
import {Menu} from '@mui/base/Menu';
import InputField from "../InputField/inputField";
import SwitchButton from "../switch/switch";
import RadioButtons from "../radioButtons/radioButtons";

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

let count = 0

function FormBuilder() {
    const [option, setOption] = useState("")
    const [list, setList] = useState([])

    const createHandleMenuClick = (menuItem) => {
        return () => {
            setOption(menuItem)
            list.push({
                index: count++,
            })
            console.log(`Clicked on ${menuItem}`);
        };
    };

    return (
        <div className="form-builder">
            <Card sx={{maxWidth: 1000}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Form builder
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Create your form
                    </Typography>
                    <CardActions>
                        <Dropdown>
                            <MenuButton>ADD</MenuButton>
                            <Menu>
                                <MenuItem onClick={createHandleMenuClick("Switch")}>Switch</MenuItem>
                                <MenuItem onClick={createHandleMenuClick("InputField")}>Input Field</MenuItem>
                                <MenuItem onClick={createHandleMenuClick("RadioButtons")}>Radio Button</MenuItem>
                            </Menu>
                        </Dropdown>
                        <Button onClick={createHandleMenuClick()}>ADD</Button>
                    </CardActions>
                    {list.map(item => (
                        //TODO: Important to keep
                        /*let ComponentToRender
                        if (item.value === "Switch") {
                            ComponentToRender = SwitchButton
                        } else if (item.value === "InputField") {
                            ComponentToRender = InputField
                        } else if (item.value === "RadioButttons") {
                            ComponentToRender = RadioButtons
                        }

                        return <ComponentToRender key={index} data={item}></ComponentToRender>*/
                        <h1>{item.index}</h1>
                    ))}
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

export default FormBuilder
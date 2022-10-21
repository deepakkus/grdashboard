import React, {useState} from "react"
import { useTranslation } from "react-i18next"
import {Grid, Segment, Menu, Dropdown, Form, Button, Responsive, Container, Divider} from "semantic-ui-react"
import SettingsList from "../SettingsList/SettingsList"
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import "./settingsmidgrids.scss"
import { ThemeProvider } from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core"




const overrideTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
          toolbar: {
            backgroundColor: "#58CB7C",
          },
        },
      },

})

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#58CB7C"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
          color: "#58CB7C"
        }
      }
}))
const InputField = withStyles({
    root:{
        '& input:focus + fieldset': {
            borderColor: '#58CB7C !important'
        },
        '& label.Mui-focused': {
            color: '#58CB7C',
        }
    },
})(TextField)

const SettingsMidGrids = (props)=>
{
    const {userId, token, userFarms, getIdealRange, lookup} = props;
    const [activeItem, setActiveItem] = useState('Profile Info')
    const [field, setField] = useState('');
    const [error, setError] = useState({
        firstNameError : false,
        lastNameError : false,
        adhaarSSNerror : false,
        addressError : false,
        cityError : false,
        pincodeError : false,
        countryError : false
    })


    const {t} = useTranslation()
    const [selectedDate, handleDateChange] = useState(new Date())
    const [sampleDate, setSampleDate] = useState(new Date())
    const [reportDate, setReportDate] = useState(new Date())
    let fieldOptions = [];
    let selectedField = '';
    let currentFieldId = '';



    const fillData = (newData = props.userFarms) => {
        newData.forEach(element => {
            fieldOptions.push({
                text: element.farmName,
                id: element._id,
                value: element.farmName,
                // polygon: element.location,
                // center: element.address.location
            })
        });
        selectedField = newData[0].farmName;
        currentFieldId = newData[0]._id;
    }


    const adhaarRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
    const SSNRegex = /^\d{3}-?\d{2}-?\d{4}$/;
    const classes = useStyles()
    const handleItemClick = (e, {name}) =>
    {
        setActiveItem(name)
    }

    const handleChange = (event) => {
        if(event.target.name === "First Name")
        {
            event.target.value === '' ? setError({...error, firstNameError : true}) : setError({...error, firstNameError : false})
        }
        if(event.target.name === "Last Name")
        {
            event.target.value === '' ? setError({...error, lastNameError : true}) : setError({...error, lastNameError : false})
        }
        if(event.target.name === "ID Number")
        {
            (event.target.value !== '' && adhaarRegex.test(event.target.value) === true)  ? setError({...error, adhaarSSNerror : false}) : setError({...error, adhaarSSNerror : true})
            console.log(event.target.value)
        }
        if(event.target.name === "Address")
        {
            event.target.value === '' ? setError({...error, addressError : true}) : setError({...error, addressError : false})
        }
        if(event.target.name === "City")
        {
            event.target.value === '' ? setError({...error, cityError : true}) : setError({...error, cityError : false})
        }
        if(event.target.name === "Pincode")
        {
            (event.target.value === '' || event.target.value.length > 10) ? setError({...error, pincodeError : true}) : setError({...error, pincodeError : false})
        }
        if(event.target.name === "Country")
        {
            event.target.value === '' ? setError({...error, countryError : true}) : setError({...error, countryError : false})
        }
    }

    return(
        <div>
            <Responsive minWidth = {1024}>
                {
                    activeItem === 'Profile Info' ? 
                    (
                        <Grid container columns={1} className = "settingsContainer">
                            <Grid.Row className = "settingsRow">
                                <Grid.Column width={16}>
                                    <Segment className="px-0 settingsSegment">
                                        <Menu pointing secondary fluid className="pl-2">
                                            <Menu.Item 
                                            
                                                name="Profile Info"
                                                color = "green"
                                                active = {activeItem === "Profile Info"}
                                                onClick = {handleItemClick}
                                            />
                                            <Menu.Item 
                                            
                                                name="Soil Health Records"
                                                color = "green"
                                                active = {activeItem === "Soil Health Records"}
                                                onClick = {handleItemClick}
                                            />
                                        </Menu>

                                        <Grid container className = "settingsList">
                                            <Grid.Row className="mx-0 px-4 mt-3">
                                                <Grid.Column width = {8}>
                                                    <div>
                                                        <h6 style={{marginBottom: "0px"}}>
                                                            Admin Information
                                                        </h6>
                                                    </div>
                                                    <Grid container columns={2} className = "settings-list-elements">
                                                        <Grid.Row className="mx-0 mt-4">
                                                            <Grid.Column width = {8} className="px-0">
                                                                <Form className="pr-0">
                                                                    <InputField 
                                                                    error = {error.firstNameError}
                                                                    helperText = {error.firstNameError && "Please enter your first name"}
                                                                    id="outlined-select-activity"
                                                                    label={t("FIRST NAME")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter Your Name"
                                                                    name = "First Name"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    onChange = {handleChange}
                                                                    />
                                                                </Form>
                                                            </Grid.Column>
                                                            <Grid.Column width = {8} className="px-0 pl-2">
                                                                <Form>
                                                                    <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("LAST NAME")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter Your Name"
                                                                    name = "Last Name"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    error = {error.lastNameError}
                                                                    onChange = {handleChange}
                                                                    helperText = {error.lastNameError && "Please enter your last name"}
                                                                    />
                                                                </Form>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className="mx-0 mt-0 py-0">
                                                            <Grid.Column width = {8} className="px-0">
                                                                <Form className="pr-0">
                                                                    <MuiPickersUtilsProvider utils ={MomentUtils}>
                                                                        <ThemeProvider theme = {overrideTheme}>
                                                                            <KeyboardDatePicker 
                                                                                className = {classes.root}
                                                                                clearable
                                                                                id = "date"
                                                                                label = {t("DATE OF BIRTH")}
                                                                                value = {selectedDate}
                                                                                placeholder = "Enter Your DOB"
                                                                                onChange = { date => handleDateChange(date) }
                                                                                format = "MM/DD/YYYY"
                                                                                inputVariant = "outlined"
                                                                                InputProps = {{disableUnderline : true}}
                                                                                InputLabelProps = {{shrink : true}}
                                                                                disableFuture = {true}
                                                                                openTo = "year"
                                                                                orientation = "landscape"
                                                                                name = "Date Of Birth"
                                                                            />
                                                                        </ThemeProvider>
                                                                    </MuiPickersUtilsProvider>
                                                                </Form>
                                                            </Grid.Column>
                                                            <Grid.Column width = {8} className="px-0 pl-2">
                                                                <Form>
                                                                    <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("GENDER")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter Your Gender"
                                                                    name = "Gender"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth

                                                                    />
                                                                </Form>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className="mx-0 mt-0">
                                                            <Grid.Column width = {16} className="px-0">
                                                                <Form className="pr-0">
                                                                    <InputField 
                                                                    error = {error.adhaarSSNerror}
                                                                    helperText = {error.adhaarSSNerror && "Please enter a valid local ID card number"}
                                                                    id="outlined-select-activity"
                                                                    label={t("SOCIAL SECURITY NUMBER/AADHAR CARD")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter Your Local ID Card Number"
                                                                    name = "ID Number"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    onChange = {handleChange}
                                                                    />
                                                                </Form>
                                                            </Grid.Column>
                                                            
                                                        </Grid.Row>

                                                        <Grid.Row className="mx-0 mt-4">
                                                            <Grid.Column width = {16} className="px-0">
                                                                <Form className="pr-0">
                                                                    <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("ADDRESS")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter Your Address"
                                                                    name = "Address"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    error = {error.addressError}
                                                                    onChange = {handleChange}
                                                                    helperText = {error.addressError && "Please enter your address"}
                                                                    />
                                                                </Form>
                                                            </Grid.Column>
                                                            
                                                        </Grid.Row>

                                                        <Grid.Row className="mx-0 mt-0 py-0">
                                                            <Grid.Column width = {8} className="px-0">
                                                                <Form className="pr-0">
                                                                    <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("CITY")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter Your City"
                                                                    name = "City"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    onChange = {handleChange}
                                                                    helperText = {error.cityError && "Please enter your city"}
                                                                    error = {error.cityError}
                                                                    />
                                                                </Form>
                                                            </Grid.Column>
                                                            <Grid.Column width = {8} className="px-0 pl-2">
                                                                <Form>
                                                                    <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("PINCODE")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter Your Pincode"
                                                                    name = "Pincode"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    type = "number"
                                                                    error = {error.pincodeError}
                                                                    helperText = {error.pincodeError && "Please enter a valid pincode"}
                                                                    onChange = {handleChange}
                                                                    />
                                                                </Form>
                                                            </Grid.Column>
                                                        </Grid.Row>

                                                        <Grid.Row className="mx-0 mt-0">
                                                            <Grid.Column width = {8} className="px-0">
                                                                <Form className="pr-0">
                                                                    <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("COUNTRY")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter Your Country"
                                                                    name = "Country"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    onChange = {handleChange}
                                                                    error = {error.countryError}
                                                                    helperText = {error.countryError && "Please enter your country"}
                                                                    />
                                                                </Form>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                                <Grid.Column width = {8}>
                                                    <Grid className="mx-0">
                                                        <Grid.Row columns={2} className="mx-0">
                                                            <Grid.Column>
                                                                <div>
                                                                    <h6 style={{marginBottom: "0px"}}>
                                                                        Farm Plots
                                                                    </h6>
                                                                </div>
                                                            </Grid.Column>
                                                            <Grid.Column floated="right">
                                                                <div style={{textAlign : "center"}}>
                                                                    <h6 style={{marginBottom: "0px"}}>
                                                                        + ADD FIELD
                                                                    </h6>
                                                                </div>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row columns={1} className="mx-0">
                                                            <Grid.Column width={16} className = "user-fields-container">
                                                                <SettingsList {...props}/>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row className = "save-btn-container">
                                                <Grid.Column textAlign = "center">
                                                    <Button className = "save">
                                                        SAVE & UPDATE
                                                    </Button>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            
                        </Grid>
                    ):
                    (
                        <Grid container columns={1} className = "settingsContainer">
                            <Grid.Row className = "settingsRow">
                                <Grid.Column width={16}>
                                    {props.userFarms.length > 0 ? fillData(props.userFarms) : null}
                                    <Segment className="px-0 settingsSegment">
                                        <Menu pointing secondary fluid className="pl-2">
                                            <Menu.Item 
                                            
                                                name="Profile Info"
                                                color = "green"
                                                active = {activeItem === "Profile Info"}
                                                onClick = {handleItemClick}
                                            />
                                            <Menu.Item 
                                            
                                                name="Soil Health Records"
                                                color = "green"
                                                active = {activeItem === "Soil Health Records"}
                                                onClick = {handleItemClick}
                                            />
                                        </Menu>

                                        <Grid container className = "">
                                            <Grid.Row className="mx-0 px-4 mt-3">
                                                <Grid.Column width = {6} className = "soil-health-left-container">
                                                    <SettingsList {...props} soilHealth = {true}/>
                                                    
                                                </Grid.Column>
                                                
                                                <Grid.Column width = {10}>
                                                    <Grid className = "soil-health-input">
                                                        <Grid.Row className = "mx-0 px-0">
                                                            <Grid.Column width = {4}>
                                                                <label>SELECT FIELD</label>
                                                                <Dropdown 
                                                                    placeholder = 'SelectField'
                                                                    selection
                                                                    fluid
                                                                    options = {fieldOptions}
                                                                    defaultValue={field ? field : selectedField}
                                                                    onChange={(e) => {
                                                                        setField(e.target.textContent);
                                                                        // setFieldId(e.target.id);
                                                                        // setLatLon(dumm);
                                                                        //console.log("setLAtLon---->",dumm);
                                                                    }}
                                                                />
                                                            </Grid.Column>
                                                            <Grid.Column width = {6} className = "mt-4">
                                                                <MuiPickersUtilsProvider utils ={MomentUtils}>
                                                                    <ThemeProvider theme = {overrideTheme}>
                                                                        <KeyboardDatePicker 
                                                                            className = {classes.root}
                                                                            clearable
                                                                            id = "date-sample-collection"
                                                                            label = {t("SAMPLE COLLECTION DATE")}
                                                                            value = {sampleDate}
                                                                            placeholder = ""
                                                                            onChange = {(date) => setSampleDate(date)}
                                                                            format = "MM/DD/YYYY"
                                                                            inputVariant = "outlined"
                                                                            InputProps = {{disableUnderline : true}}
                                                                            InputLabelProps = {{shrink : true}}
                                                                            disableFuture = {true}
                                                                            openTo = "year"
                                                                            orientation = "landscape"
                                                                            name = "SAMPLE COLLECTION DATE"
                                                                        />
                                                                    </ThemeProvider>
                                                                </MuiPickersUtilsProvider>
                                                            </Grid.Column>
                                                            <Grid.Column width = {6} className = "mt-4">
                                                            <MuiPickersUtilsProvider utils ={MomentUtils}>
                                                                    <ThemeProvider theme = {overrideTheme}>
                                                                        <KeyboardDatePicker 
                                                                            className = {classes.root}
                                                                            clearable
                                                                            id = "date-report-collection"
                                                                            label = {t("REPORT DATE")}
                                                                            value = {reportDate}
                                                                            placeholder = ""
                                                                            onChange = {(date) => setReportDate(date)}
                                                                            format = "MM/DD/YYYY"
                                                                            inputVariant = "outlined"
                                                                            InputProps = {{disableUnderline : true}}
                                                                            InputLabelProps = {{shrink : true}}
                                                                            disableFuture = {true}
                                                                            openTo = "month"
                                                                            orientation = "landscape"
                                                                            name = "REPORT DATE"
                                                                        />
                                                                    </ThemeProvider>
                                                                </MuiPickersUtilsProvider>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className = "mx-0">
                                                            <Grid.Column width = {6} className = "mt-0">
                                                                <InputField 
                                                                    id="select-gender"
                                                                    label={t("SOIL SAMPLE NUMBER")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter soil sample number"
                                                                    name = "Soil Number"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    
                                                                />
                                                            </Grid.Column>
                                                            <Grid.Column width = {10} className = "mt-0">
                                                                <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("NAME OF LABORATORY")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter Lab name"
                                                                    name = "Lab name"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className = "mx-0">
                                                            <Grid.Column width = {6} className = "mt-0">
                                                                <InputField 
                                                                    id="select-gender"
                                                                    label={t("pH Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "pH value"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    />
                                                            </Grid.Column>
                                                            <Grid.Column width = {5} className = "mt-0">
                                                                <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("EC Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "Lab name"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                />
                                                            </Grid.Column>
                                                            <Grid.Column width = {5} className = "mt-0">
                                                                <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("OC Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "Lab name"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className = "mx-0">
                                                            <Grid.Column width = {6} className = "mt-0">
                                                                <InputField 
                                                                    id="select-gender"
                                                                    label={t("N Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "pH value"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    />
                                                            </Grid.Column>
                                                            <Grid.Column width = {5} className = "mt-0">
                                                                <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("P Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "Lab name"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                />
                                                            </Grid.Column>
                                                            <Grid.Column width = {5} className = "mt-0">
                                                                <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("K Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "Lab name"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className = "mx-0">
                                                            <Grid.Column width = {6} className = "mt-0">
                                                                <InputField 
                                                                    id="select-gender"
                                                                    label={t("S Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "S value"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    />
                                                            </Grid.Column>
                                                            <Grid.Column width = {5} className = "mt-0">
                                                                <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("Zn Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "Zn"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                />
                                                            </Grid.Column>
                                                            <Grid.Column width = {5} className = "mt-0">
                                                                <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("B Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "B"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className = "mx-0">
                                                            <Grid.Column width = {6} className = "mt-0">
                                                                <InputField 
                                                                    id="select-gender"
                                                                    label={t("Fe Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "Fe value"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    />
                                                            </Grid.Column>
                                                            <Grid.Column width = {5} className = "mt-0">
                                                                <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("Mn Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "Mn"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                />
                                                            </Grid.Column>
                                                            <Grid.Column width = {5} className = "mt-0">
                                                                <InputField 
                                                                    id="outlined-select-activity"
                                                                    label={t("Cu Value")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter the value"
                                                                    name = "Cu"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className = "mx-0">
                                                            <Grid.Column width = {10} className = "mt-0">
                                                                <InputField 
                                                                    id="select-gender"
                                                                    label={t("RECOMMENDATIONS")}
                                                                    variant = "outlined"
                                                                    placeholder = "Enter any recommendations made by the lab"
                                                                    name = "Recommendations"
                                                                    autoComplete = "off"
                                                                    InputLabelProps = {{shrink : true}}
                                                                    fullWidth
                                                                    />
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                        <Grid.Row className = "mx-0 soil-test-btn-container">
                                                            <Grid.Column textAlign = "center">
                                                                <Button className = "add-soil">
                                                                    ADD SOIL TEST REPORT
                                                                </Button>
                                                            </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                      

                                            </Grid.Row>
            
                                        </Grid>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            
                        </Grid>
                    )
                }
                
            </Responsive>
            <Responsive minWidth = {768} maxWidth = {1024}>
                {
                    activeItem === 'Profile Info' ? 
                
                <Container>
                <Grid container columns={1} className = "settingsContainer">
                    <Grid.Row className = "settingsRow">
                        <Grid.Column width={16}>
                            <Segment className="px-0 settingsSegment">
                                <Menu pointing secondary fluid className="pl-2">
                                    <Menu.Item 
                                    
                                        name="Profile Info"
                                        color = "green"
                                        active = {activeItem === "Profile Info"}
                                        onClick = {handleItemClick}
                                    />
                                    <Menu.Item 
                                    
                                        name="Soil Health Records"
                                        color = "green"
                                        active = {activeItem === "Soil Health Records"}
                                        onClick = {handleItemClick}
                                    />
                                </Menu>

                                <Grid columns={2} container className = "settingsList">
                                    <Grid.Row className="mx-0 px-3 mt-3">
                                        <Grid.Column width = {8}>
                                            <div>
                                                <h6 style={{marginBottom: "0px"}}>
                                                    Admin Information
                                                </h6>
                                            </div>
                                            <Grid container columns={2}>
                                                <Grid.Row className="mx-0 mt-4">
                                                    <Grid.Column width = {8} className="px-0">
                                                        <Form className="pr-0">
                                                            <InputField 
                                                            id="outlined-select-activity"
                                                            label={t("FIRST NAME")}
                                                            variant = "outlined"
                                                            placeholder = "Enter Your Name"
                                                            name = "First Name"
                                                            autoComplete = "off"
                                                            InputLabelProps = {{shrink : true}}
                                                            fullWidth
                                                            error = {error.firstNameError}
                                                            helperText = {error.firstNameError && "Please enter your first name"}
                                                            onChange = {handleChange}
                                                            />
                                                        </Form>
                                                    </Grid.Column>
                                                    <Grid.Column width = {8} className="px-0 pl-2">
                                                        <Form>
                                                            <InputField 
                                                            id="outlined-select-activity"
                                                            label={t("LAST NAME")}
                                                            variant = "outlined"
                                                            placeholder = "Enter Your Name"
                                                            name = "Last Name"
                                                            autoComplete = "off"
                                                            InputLabelProps = {{shrink : true}}
                                                            fullWidth
                                                            error = {error.lastNameError}
                                                            helperText = {error.lastNameError && "Please enter your last name"}
                                                            onChange = {handleChange}
                                                            />
                                                        </Form>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row className="mx-0 mt-0 py-0">
                                                    <Grid.Column width = {8} className="px-0">
                                                        <Form className="pr-0">
                                                            <MuiPickersUtilsProvider utils ={MomentUtils}>
                                                                <ThemeProvider theme = {overrideTheme}>
                                                                    <KeyboardDatePicker 
                                                                        className = {classes.root}
                                                                        clearable
                                                                        id = "date"
                                                                        label = {t("DATE OF BIRTH")}
                                                                        value = {selectedDate}
                                                                        placeholder = "Enter Your DOB"
                                                                        onChange = { date => handleDateChange(date) }
                                                                        format = "MM/DD/YYYY"
                                                                        inputVariant = "outlined"
                                                                        InputProps = {{disableUnderline : true}}
                                                                        InputLabelProps = {{shrink : true}}
                                                                        disableFuture = {true}
                                                                        openTo = "year"
                                                                        orientation = "landscape"
                                                                        name = "Date Of Birth"
                                                                    />
                                                                </ThemeProvider>
                                                            </MuiPickersUtilsProvider>
                                                        </Form>
                                                    </Grid.Column>
                                                    <Grid.Column width = {8} className="px-0 pl-2">
                                                        <Form>
                                                            <InputField 
                                                            id="outlined-select-activity"
                                                            label={t("GENDER")}
                                                            variant = "outlined"
                                                            placeholder = "Enter Your Gender"
                                                            name = "Gender"
                                                            autoComplete = "off"
                                                            InputLabelProps = {{shrink : true}}
                                                            fullWidth

                                                            />
                                                        </Form>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row className="mx-0 mt-0">
                                                    <Grid.Column width = {16} className="px-0">
                                                        <Form className="pr-0">
                                                            <InputField 
                                                            id="outlined-select-activity"
                                                            label={t("SOCIAL SECURITY NUMBER/AADHAR CARD")}
                                                            variant = "outlined"
                                                            placeholder = "Enter Your Local ID Card Number"
                                                            name = "ID Number"
                                                            autoComplete = "off"
                                                            InputLabelProps = {{shrink : true}}
                                                            fullWidth
                                                            error = {error.adhaarSSNerror}
                                                            helperText = {error.adhaarSSNerror && "Please enter a valid local ID card number"}
                                                            onChange = {handleChange}
                                                            />
                                                        </Form>
                                                    </Grid.Column> 
                                                </Grid.Row>

                                                <Grid.Row className="mx-0 mt-5">
                                                    <Grid.Column width = {16} className="px-0">
                                                        <Form className="pr-0">
                                                            <InputField 
                                                            id="outlined-select-activity"
                                                            label={t("ADDRESS")}
                                                            variant = "outlined"
                                                            placeholder = "Enter Your Address"
                                                            name = "Address"
                                                            autoComplete = "off"
                                                            InputLabelProps = {{shrink : true}}
                                                            fullWidth
                                                            error = {error.addressError}
                                                            helperText = {error.addressError && "Please enter your address"}
                                                            onChange = {handleChange}
                                                            />
                                                        </Form>
                                                    </Grid.Column>
                                                    
                                                </Grid.Row>

                                                <Grid.Row className="mx-0 mt-0 py-0">
                                                    <Grid.Column width = {8} className="px-0">
                                                        <Form className="pr-0">
                                                            <InputField 
                                                            id="outlined-select-activity"
                                                            label={t("CITY")}
                                                            variant = "outlined"
                                                            placeholder = "Enter Your City"
                                                            name = "City"
                                                            autoComplete = "off"
                                                            InputLabelProps = {{shrink : true}}
                                                            fullWidth
                                                            error = {error.cityError}
                                                            helperText = {error.cityError && "Please enter your city"}
                                                            onChange = {handleChange}
                                                            />
                                                        </Form>
                                                    </Grid.Column>
                                                    <Grid.Column width = {8} className="px-0 pl-2">
                                                        <Form>
                                                            <InputField 
                                                            id="outlined-select-activity"
                                                            label={t("PINCODE")}
                                                            variant = "outlined"
                                                            placeholder = "Enter Your Pincode"
                                                            name = "Pincode"
                                                            autoComplete = "off"
                                                            InputLabelProps = {{shrink : true}}
                                                            fullWidth
                                                            error = {error.pincodeError}
                                                            helperText = {error.pincodeError && "Please enter a valid pincode"}
                                                            onChange = {handleChange}
                                                            />
                                                        </Form>
                                                    </Grid.Column>
                                                </Grid.Row>

                                                <Grid.Row className="mx-0 mt-0">
                                                    <Grid.Column width = {8} className="px-0">
                                                        <Form className="pr-0">
                                                            <InputField 
                                                            id="outlined-select-activity"
                                                            label={t("COUNTRY")}
                                                            variant = "outlined"
                                                            placeholder = "Enter Your Country"
                                                            name = "Country"
                                                            autoComplete = "off"
                                                            InputLabelProps = {{shrink : true}}
                                                            fullWidth
                                                            error = {error.countryError}
                                                            helperText = {error.countryError && "Please enter your country"}
                                                            onChange = {handleChange}
                                                            />
                                                        </Form>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                        <Grid.Column width = {8}>
                                            <Grid className="mx-0">
                                                <Grid.Row columns={2} className="mx-0">
                                                    <Grid.Column>
                                                        <div>
                                                            <h6 style={{marginBottom: "0px"}}>
                                                                Farm Plots
                                                            </h6>
                                                        </div>
                                                    </Grid.Column>
                                                    <Grid.Column floated="right">
                                                        <div style={{textAlign : "center"}}>
                                                            <h6 style={{marginBottom: "0px"}}>
                                                                + ADD FIELD
                                                            </h6>
                                                        </div>
                                                    </Grid.Column>
                                                </Grid.Row>
                                                <Grid.Row columns={1} className="mx-0">
                                                    <Grid.Column width={16} className = "user-fields-container">
                                                        <SettingsList {...props}/>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className = "save-btn-container">
                                        <Grid.Column textAlign = "center">
                                            <Button className = "save">
                                                SAVE & UPDATE
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Container>
                : 
                (
                    <Container>
                        <Grid container columns={1} className = "settingsContainer">
                                <Grid.Row className = "settingsRow">
                                    <Grid.Column width={16}>
                                        <Segment className="px-0 settingsSegment">
                                            <Menu pointing secondary fluid className="pl-2">
                                                <Menu.Item 
                                                
                                                    name="Profile Info"
                                                    color = "green"
                                                    active = {activeItem === "Profile Info"}
                                                    onClick = {handleItemClick}
                                                />
                                                <Menu.Item 
                                                
                                                    name="Soil Health Records"
                                                    color = "green"
                                                    active = {activeItem === "Soil Health Records"}
                                                    onClick = {handleItemClick}
                                                />
                                            </Menu>

                                            <Grid container className = "soil-health">
                                                <Grid.Row className="mx-0 px-4 mt-3 soil-health-row">
                                                    <Grid.Column width = {8} className = "soil-health-left-container">
                                                        <SettingsList {...props}/>
                                                        
                                                    </Grid.Column>
                                                    
                                                    <Grid.Column width = {8}>
                                                        <Container>
                                                        <Grid className = "soil-health-input">
                                                            <Grid.Row className = "mx-0 px-0">
                                                                <Grid.Column width = {16}>
                                                                    <label>SELECT FIELD</label>
                                                                    <Dropdown 
                                                                        placeholder = 'SelectField'
                                                                        selection
                                                                        fluid
                                                                        options = {fieldOptions}
                                                                        defaultValue={field ? field : selectedField}
                                                                        onChange={(e) => {
                                                                            setField(e.target.textContent);
                                                                            // setFieldId(e.target.id);
                                                                            // setLatLon(dumm);
                                                                            //console.log("setLAtLon---->",dumm);
                                                                        }}
                                                                    />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <MuiPickersUtilsProvider utils ={MomentUtils}>
                                                                        <ThemeProvider theme = {overrideTheme}>
                                                                            <KeyboardDatePicker 
                                                                                className = {classes.root}
                                                                                clearable
                                                                                id = "date-sample-collection"
                                                                                label = {t("SAMPLE COLLECTION DATE")}
                                                                                value = {sampleDate}
                                                                                placeholder = ""
                                                                                onChange = {(date) => setSampleDate(date)}
                                                                                format = "MM/DD/YYYY"
                                                                                inputVariant = "outlined"
                                                                                InputProps = {{disableUnderline : true}}
                                                                                InputLabelProps = {{shrink : true}}
                                                                                disableFuture = {true}
                                                                                openTo = "year"
                                                                                orientation = "landscape"
                                                                                name = "SAMPLE COLLECTION DATE"
                                                                            />
                                                                        </ThemeProvider>
                                                                    </MuiPickersUtilsProvider>
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                <MuiPickersUtilsProvider utils ={MomentUtils}>
                                                                        <ThemeProvider theme = {overrideTheme}>
                                                                            <KeyboardDatePicker 
                                                                                className = {classes.root}
                                                                                clearable
                                                                                id = "date-report-collection"
                                                                                label = {t("REPORT DATE")}
                                                                                value = {reportDate}
                                                                                placeholder = ""
                                                                                onChange = {(date) => setReportDate(date)}
                                                                                format = "MM/DD/YYYY"
                                                                                inputVariant = "outlined"
                                                                                InputProps = {{disableUnderline : true}}
                                                                                InputLabelProps = {{shrink : true}}
                                                                                disableFuture = {true}
                                                                                openTo = "month"
                                                                                orientation = "landscape"
                                                                                name = "REPORT DATE"
                                                                            />
                                                                        </ThemeProvider>
                                                                    </MuiPickersUtilsProvider>
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                            <Grid.Row className = "mx-0">
                                                                <Grid.Column width = {16} className = "mt-0">
                                                                    <InputField 
                                                                        id="select-gender"
                                                                        label={t("SOIL SAMPLE NUMBER")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter soil sample number"
                                                                        name = "Soil Number"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                        
                                                                    />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <InputField 
                                                                        id="outlined-select-activity"
                                                                        label={t("NAME OF LABORATORY")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter Lab name"
                                                                        name = "Lab name"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                    />
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                            <Grid.Row className = "m-0">
                                                                <Grid.Column width = {16} className = "m-0">
                                                                    <InputField 
                                                                        id="select-gender"
                                                                        label={t("pH Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "pH value"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                        />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <InputField 
                                                                        id="outlined-select-activity"
                                                                        label={t("EC Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "Lab name"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                    />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <InputField 
                                                                        id="outlined-select-activity"
                                                                        label={t("OC Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "Lab name"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                    />
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                            <Grid.Row className = "mx-0">
                                                                <Grid.Column width = {16} className = "mt-0">
                                                                    <InputField 
                                                                        id="select-gender"
                                                                        label={t("N Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "pH value"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                        />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <InputField 
                                                                        id="outlined-select-activity"
                                                                        label={t("P Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "Lab name"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                    />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <InputField 
                                                                        id="outlined-select-activity"
                                                                        label={t("K Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "Lab name"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                    />
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                            <Grid.Row className = "mx-0">
                                                                <Grid.Column width = {16} className = "mt-0">
                                                                    <InputField
                                                                        id="select-gender"
                                                                        label={t("S Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "S value"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                        />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <InputField 
                                                                        id="outlined-select-activity"
                                                                        label={t("Zn Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "Zn"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                    />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <InputField
                                                                        id="outlined-select-activity"
                                                                        label={t("B Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "B"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                    />
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                            <Grid.Row className = "m-0">
                                                                <Grid.Column width = {16} className = "mt-0">
                                                                    <InputField 
                                                                        id="select-gender"
                                                                        label={t("Fe Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "Fe value"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                        />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <InputField 
                                                                        id="outlined-select-activity"
                                                                        label={t("Mn Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "Mn"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                    />
                                                                </Grid.Column>
                                                                <Grid.Column width = {16} className = "mt-4">
                                                                    <InputField 
                                                                        id="outlined-select-activity"
                                                                        label={t("Cu Value")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter the value"
                                                                        name = "Cu"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                    />
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                            <Grid.Row className = "mx-0 my-0">
                                                                <Grid.Column width = {16} className = "mt-0">
                                                                    <InputField 
                                                                        id="select-gender"
                                                                        label={t("RECOMMENDATIONS")}
                                                                        variant = "outlined"
                                                                        placeholder = "Enter any recommendations made by the lab"
                                                                        name = "Recommendations"
                                                                        autoComplete = "off"
                                                                        InputLabelProps = {{shrink : true}}
                                                                        fullWidth
                                                                        />
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                            <Grid.Row className = "mx-0 soil-test-btn-container">
                                                                <Grid.Column textAlign = "center">
                                                                    <Button className = "add-soil">
                                                                        ADD SOIL TEST REPORT
                                                                    </Button>
                                                                </Grid.Column>
                                                            </Grid.Row>
                                                        </Grid>
                                                        </Container>
                                                    </Grid.Column>
                                        

                                                </Grid.Row>
                
                                            </Grid>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                
                        </Grid>
                    </Container>
                )}
            </Responsive>
        </div>
    )
}


export default SettingsMidGrids
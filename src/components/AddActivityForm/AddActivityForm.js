import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Modal, Button, Grid } from "semantic-ui-react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withTranslation } from "react-i18next";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ActivityOption from "../AddActivityForm/activityLists/activityOption"
import PlantseedActivity from "../AddActivityForm/activityLists/plantseedactivity"
import IrrigationActivity from "./activityLists/irrigationactivity";
import CropGrowthActivity from "./activityLists/cropgrowthactivity";
import FertilizationActivity from "./activityLists/fertilizationactivity";
import HarvestingActivity from "./activityLists/harvestingactivity";
import StorageActivity from "./activityLists/storageactivity";
import TransportationActivity from "./activityLists/transportationactivity";
import MarketingActivity from "./activityLists/marketingactivity";
// import './addcropform.scss';
//import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#67bc46",
      dark: "#000",
    },
    secondary: {
      main: "#1A960A",
    },
  },
  typography: {
    useNextVariants: true,
  },
  textField: {
    color: "green",
    "&:hover": {
      backgroundColor: "green",
    },
    "&$focused": {
      backgroundColor: "green",
      boxShadow: "green 0.25 0 0 0 2px",
      borderColor: "green",
    },
    minWidth: "200px !important"
  },
  checkbox: {
    color: "green",
    "&$checked": {
      color: "green",
    },
  },
});

class AddActivityForm extends Component {
  state = {
    activityType: null,
    cc: null,
    errorMsg: false,
    // snackbarOpen: false,
    logDate: null,
    description: null,
    confirmed: false,
    dateError: false,
  };

  
  handleActivityChange = (e) => {
    this.setState({ activityType: e.target.value });
  };
  
  handleCropCycleChange = (e) => {
    this.setState({ cc: e.target.value });
  };
  handleLogDateChange = (e) => {
    this.setState({ logDate: e.target.value });
  };
  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };
  handleSnackbarClose = () => {
    // if (reason === 'clickaway') {
    //     return;
    //   }
    this.setstate({ snackbarOpen: false });
  };
  handleCheckBoxChange = () => {
    if (!this.state.dateError) {
      this.setState({ confirmed: true });
    }
  };
  handleClose = () => {
    this.props.changeDialogDisp();
  };
  handleSubmit = () => {
    if (this.state.confirmed) {
      this.props.changeDialogDisp();
      const activity = {
        logDate: this.state.logDate,
        cropCycleId: this.state.cc,
        activityId: this.state.activityType,
        description: this.state.description,
      };
      this.props.onSubmit(activity);
      this.setState({
        //snackbarOpen: false,
        activityType: this.props.activityTypes.length
          ? this.props.activityTypes[0]._id
          : "",
        cc: this.props.currentCropCycles.length
          ? this.props.currentCropCycles[0]._id
          : "",
        description: "",
        logDate: "",
        confirmed: false,
      });
    } else {
      this.setState({ errorMsg: true });
    }
  };

  logDateValidation = (date) => {
    console.log("in logDateVal");
    if (this.state.cc && this.props.currentCropCycles) {
      const ccObject = this.props.currentCropCycles.find(
        (cropCycle) => cropCycle._id === this.state.cc
      );
      return date < ccObject.startDate || date > ccObject.endDate;
    }
  };

  componentDidUpdate() {
    if (this.props.activityTypes.length && !this.state.activityType) {
      this.setState({ activityType: this.props.activityTypes[0]._id });
    }
    if (this.props.currentCropCycles.length && !this.state.cc) {
      this.setState({ cc: this.props.currentCropCycles[0]._id });
    }
    if (this.state.logDate && this.props.currentCropCycles && this.state.cc) {
      const ccObject = this.props.currentCropCycles.find(
        (cropCycle) => cropCycle._id === this.state.cc
      );
      console.log("dateErrorUpdate ccObject is", ccObject);
      if (
        this.state.logDate < ccObject.startDate ||
        this.state.logDate > ccObject.endDate
      ) {
        if (this.state.dateError === false) {
          this.setState({ dateError: true, confirmed: false });
        }
      }
      if (
        this.state.logDate > ccObject.startDate &&
        this.state.logDate < ccObject.endDate &&
        this.state.dateError === true
      ) {
        this.setState({ dateError: false });
      }
    }
  }

  render() {
    const { t } = this.props;
    let activityList = ["Land Preparation", "Planting of seeds", "Irrigation", "Crop Growth", "Fertilization", "Harvesting", "Storage", "Transportation", "Marketing"]
    return (
      <MuiThemeProvider theme={theme}>

        <Modal
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          style = {{position : "relative"}}
          
        >
          <Modal.Header>{t("act-form-title")}</Modal.Header>
          <Modal.Content >
            <Grid>
              <Grid.Row className = "ml-0">
                <Grid.Column width = {8}>
                  <TextField
                    id="outlined-select-cc"
                    label={t("cc-label")}
                    select
                    fullWidth
                    // className="mr-4 ml-4 mt-2 w-25"
                    variant = "outlined"
                    defaultValue={
                      this.props.currentCropCycles[0]
                        ? this.props.currentCropCycles[0]._id
                        : ""
                    }
                    helperText={t("cc-helper")}
                    onChange={this.handleCropCycleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {this.props.currentCropCycles ? (
                      this.props.currentCropCycles.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {this.props.userFarms &&
                            this.props.userFarms.find(
                              (farm) => option.farmId === farm._id
                            ).farmName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>{t("empty-option")}</MenuItem>
                    )}
                  </TextField>
                </Grid.Column>
                <Grid.Column width = {4}>
                  <TextField
                    id="outlined-select-activity"
                    label={t("activity-label")}
                    select
                    fullWidth
                    defaultValue = ""
                    onChange={this.handleActivityChange}
                    variant="outlined"
                    // className="mr-4 ml-4 mt-2 w-25"
                    helperText={t("activity-helper")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {activityList ? activityList.map((item) => (
                      <MenuItem key = {item} value = {item}>
                        {item}
                      </MenuItem>
                    ))                    
                    : (
                      <MenuItem disabled>{t("empty-option")}</MenuItem>
                    )}
                  </TextField>
                </Grid.Column>
                <Grid.Column width = {4}>
                  <TextField
                    error
                    id="logdate"
                    fullWidth
                    label={t("log-date-label")}
                    type="date"
                    // className="mr-4 ml-4 mt-2 w-25"
                    // defaultValue={new Date()}
                    variant="outlined"
                    error={this.state.dateError}
                    shouldDisableDate={this.logDateValidation}
                    onChange={this.handleLogDateChange}
                    helperText={t("log-date-error")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className = "ml-0"> 
                <Grid.Column className = "px-5">
                  {
                    this.state.activityType === "Land Preparation" ? 
                      <ActivityOption />
                    :

                    this.state.activityType === "Planting of seeds" ?
                      <PlantseedActivity />
                    :
                    this.state.activityType === "Irrigation" ? 
                      <IrrigationActivity/>
                    :
                    this.state.activityType === "Crop Growth" ? 
                      <CropGrowthActivity />
                    :
                    this.state.activityType === "Fertilization" ? 
                      <FertilizationActivity />
                    :
                    this.state.activityType === "Harvesting" ? 
                      <HarvestingActivity/>
                    :
                    this.state.activityType === "Storage" ? 
                      <StorageActivity/>
                    :
                    this.state.activityType === "Transportation" ? 
                      <TransportationActivity />
                    :
                    this.state.activityType === "Marketing" && <MarketingActivity/>
                  }
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          
          <Modal.Actions>
            <Button onClick={this.handleClose} color="gray">
              {t("cancel")}
            </Button>
            <Button onClick={this.handleSubmit} color="green">
              {t("submit")}
            </Button>
          </Modal.Actions>
        </Modal>
      </MuiThemeProvider>
    );
  }
}

export default withTranslation("add-activity")(AddActivityForm);



{/* <Grid>
              <Grid.Row>
                <TextField
                  id="outlined-select-activity"
                  label={t("activity-label")}
                  select
                  defaultValue={
                    this.props.activityTypes[0]
                      ? this.props.activityTypes[0]._id
                      : "Select Activity"
                  }
                  onChange={this.handleActivityChange}
                  variant="outlined"
                  className="mr-4 ml-4 mt-2 w-25"
                  helperText={t("activity-helper")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {this.props.activityTypes ? (
                    this.props.activityTypes.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>{t("empty-option")}</MenuItem>
                  )}
                </TextField>
                <TextField
                  id="outlined-select-cc"
                  label={t("cc-label")}
                  select
                  className="mr-4 ml-4 mt-2 w-25"
                  variant="outlined"
                  defaultValue={
                    this.props.currentCropCycles[0]
                      ? this.props.currentCropCycles[0]._id
                      : ""
                  }
                  helperText={t("cc-helper")}
                  onChange={this.handleCropCycleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {this.props.currentCropCycles ? (
                    this.props.currentCropCycles.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {this.props.userFarms &&
                          this.props.userFarms.find(
                            (farm) => option.farmId === farm._id
                          ).farmName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>{t("empty-option")}</MenuItem>
                  )}
                </TextField>
              </Grid.Row>
              <Grid.Row>
                <TextField
                  error
                  id="logdate"
                  label={t("log-date-label")}
                  type="date"
                  className="mr-4 ml-4 mt-2 w-25"
                  // defaultValue={new Date()}
                  variant="outlined"
                  error={this.state.dateError}
                  shouldDisableDate={this.logDateValidation}
                  onChange={this.handleLogDateChange}
                  helperText={t("log-date-error")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-description"
                  label={t("description-label")}
                  variant="outlined"
                  className="mr-4 ml-4 mt-2 w-25"
                  helperText={t("description-helper")}
                  onChange={this.handleDescriptionChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControlLabel
                  className="mr-4 ml-4 w-50"
                  control={
                    <Checkbox
                      checked={this.state.confirmed}
                      onChange={this.handleCheckBoxChange}
                      name="checked"
                    />
                  }
                  label={t("cc-form-checkbox")}
                />
              </Grid.Row>
              <Grid.Row>
                {this.state.errorMsg ? (
                  <p
                    style={{
                      position: "absolute",
                      color: "red",
                      left: "25%",
                      right: "25%",
                    }}
                  >
                    {" "}
                    {t("ccuncheckederror")}{" "}
                  </p>
                ) : (
                  ""
                )}
              </Grid.Row>
            </Grid> */}
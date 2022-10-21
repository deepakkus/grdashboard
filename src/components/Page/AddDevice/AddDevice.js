import React, { useState, useEffect } from "react";
import "./AddDevice.scss";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import addDeviceImg from "../../../images/addDevice.png";
import { AiOutlinePlus } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
// import Input from "../common/Input";
import Logo from "../../common/Logo";
import AlertBar from "../../AlertBar/AlertBar";
import { updateUserFarmDevice } from "../../../services/farm";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#67bc46",
      dark: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const AddDevice = (props) => {
  const { t } = useTranslation("add-device");
  // console.log(props);
  const { saveDevice } = props;
  const [values, setValues] = useState({
    deviceID: "",
    validationMsg: false,
    isOpen: false,
    msg: "",
    verticalInput: "",
    horizontalInput: "",
    severity: "",
    errMsg: "",
  });
  console.log({ values });

  const emailLabel = React.createRef();
  //  ^[0-9]+$    
  const handleChange = (name, value) => {
    //if(/^[0-9]+$|^$/.test(value)){
    //  setValues({...values, validationMsg: false, [name]: value});
    //}
    setValues({ ...values, [name]: value });
  };

  const handleBack = () => {
    props.history.push("/" + props.history.location.search);
  };

  let { userDevices, error } = props.devices;
  // let errorMsg = error.data ? error.data.message : "";

  // console.log({ errorMsg });

  const handleNext = () => {
    props.history.push(
      `/sensors/${values.deviceID ? values.deviceID : ""}`
      // `/sensors/${userDevices.length ? userDevices[0].deviceId : ""}`
    );
  };

  const handleEmailFocus = (e) =>
    (emailLabel.current.innerText = t("place-holder"));

  const handleEmailBlur = (e) => (emailLabel.current.innerText = "");

  const saveHandler = async () => {
    const { deviceID, validationMsg } = values;

    // TODO for now it is only soil sensor
    const deviceType = props.devicetypes.find((d) => d.name === "Soil Sensor");
    const deviceTypeId = deviceType._id;
    const deviceId = values.deviceID;
    const userId = props.userId;
    const deviceName = `${deviceType.name} ${userDevices.length + 1}`;
    const device = {
      deviceTypeId,
      deviceId,
      userId,
      deviceName,
    };

    let res = await saveDevice(device, props.token);
    updateUserFarmDevice(userId);
    console.log({ res });
    if (res == undefined && !res.data) {
      setValues({
        ...values,
        validationMsg: true,
        isOpen: true,
        msg: t("network-error-msg"),
        severity: "error",
      });
      setTimeout(() => {
        setValues({
          ...values,
          validationMsg: true,
          isOpen: false,
          msg: t("network-error-msg"),
          severity: "error",
        });
      }, 3001);
    } else if (!res.data) {
      setValues({
        ...values,
        validationMsg: false,
        isOpen: true,
        msg: t("success-msg"),
        severity: "success",
      });
      setTimeout(() => {
        setValues({
          ...values,
          validationMsg: "",
          isOpen: false,
          msg: t("success-msg"),
          severity: "success",
        });
      }, 3001);
    } else if (res.data.message === "Device ID is already added") {
      setValues({
        ...values,
        validationMsg: true,
        isOpen: true,
        msg: t("error-msg-added-already"),
        severity: "error",
      });
      setTimeout(() => {
        setValues({
          ...values,
          validationMsg: true,
          isOpen: false,
          msg: t("error-msg-added-already"),
          severity: "error",
        });
      }, 3001);
    } else {
      setValues({
        ...values,
        validationMsg: true,
        isOpen: true,
        msg: t("error-msg"),
        severity: "error",
      });
      setTimeout(() => {
        setValues({
          ...values,
          validationMsg: true,
          isOpen: false,
          msg: t("error-msg"),
          severity: "error",
        });
      }, 3001);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className="device-container addDeviceContainer">
        <Grid className="left-col">
          <Grid.Column>
            <Logo />
            <Grid
              textAlign="center"
              style={{ marginTop: "6rem" }}
              verticalAlign="middle"
              className="padit"
            >
              <Grid.Column style={{ maxWidth: 350 }}>
                <Header as="h3" color="grey" textAlign="left">
                  {t("enter-sensor")}
                </Header>
                <img
                  src={addDeviceImg}
                  alt="addDevice"
                  className="addDeviceImg"
                />
                <Form size="large">
                  <div class="buttonInside">
                    <TextField
                      id="outlined-multiline-flexible"
                      label={t("device-id")}
                      variant="outlined"
                      onFocus={handleEmailFocus}
                      onBlur={handleEmailBlur}
                      fullWidth
                      placeholder="14253614"
                      name="deviceID"
                      value={values.deviceID}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      autoComplete="off"
                      error={values.validationMsg}
                      helperText={
                        values.validationMsg
                          ? // t("plaese enter differnt device-id")
                            t("validation-msg")
                          : "Find Device ID on Box  or below QR code on your Device "
                      }
                    />
                    <p ref={emailLabel} className="label"></p>
                  </div>
                  <Grid.Row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "1rem  ",
                    }}
                  >
                    <Grid.Column>
                      <Button
                        fluid
                        size="large"
                        className="white"
                        onClick={handleBack}
                      >
                        {t("back")}
                      </Button>
                    </Grid.Column>

                    <Grid.Column>
                      <Button
                        color="green"
                        fluid
                        size="large"
                        className="pr-3  pl-3"
                        onClick={() => {
                          saveHandler();
                        }}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <AiOutlinePlus
                          style={{
                            color: "white",
                            fontSize: "1.rem",
                          }}
                        />

                        {t("add-device")}
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        fluid
                        size="large"
                        className="white"
                        onClick={handleNext}
                      >
                        {t("next")}
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <AlertBar
                        isOpen={values.isOpen}
                        // isOpen={true}
                        msg={values.msg}
                        verticalInput="top"
                        horizontalInput="left"
                        severity={values.severity}
                        // errorMsg={errorMsg}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Form>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
        <Grid className="right-col">
          <Grid.Column>
            <div className="imagesection"></div>
          </Grid.Column>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
};

export default AddDevice;

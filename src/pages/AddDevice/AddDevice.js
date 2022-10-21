import React, { useState } from "react";
import "./AddDevice.scss";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import addDeviceImg from "../../images/addDevice.png";
import { AiOutlinePlus } from "react-icons/ai";

import { useTranslation } from "react-i18next";

import TextField from "@material-ui/core/TextField";
// import Input from "../common/Input";
import Logo from "../../components/common/Logo";

import { connect } from "react-redux";
import { addDevice } from "../../actions/addDevice";

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
  const { t } = useTranslation("public-data");

  console.log(props);
  const { addDevice } = props;
  const [values, setValues] = useState({
    deviceID: "",
  });
  const addDeviceLabel = React.createRef();

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleBack = () => {
    props.history.push("/");
  };

  const handleEmailFocus = (e) =>
    (addDeviceLabel.current.innerText = "Enter 8 - Digit Device ID");

  const handelAddDeviceBlur = (e) => (addDeviceLabel.current.innerText = "");
  const onClick = (id) => {
    addDevice(id);
    setValues({ deviceID: "" });
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
                  REGISTER IOT SOIL SENSOER
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
                      label="Enter ID"
                      variant="outlined"
                      onFocus={handleEmailFocus}
                      onBlur={handelAddDeviceBlur}
                      fullWidth
                      value={values.deviceID}
                      placeholder="Enter 8 - Digit Device ID"
                      name="deviceID"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      autoComplete="off"
                    />
                    <p ref={addDeviceLabel} className="label"></p>
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
                        Back
                      </Button>
                    </Grid.Column>

                    <Grid.Column>
                      <Button
                        color="green"
                        fluid
                        size="large"
                        onClick={() => onClick(values.deviceID)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <AiOutlinePlus
                          style={{
                            color: "white",
                            fontSize: "1.4rem",
                            paddingBottom: 2,
                          }}
                        />
                        ADD DEVICE
                      </Button>
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

// export default withRouter(AddDevice);

export default connect(null, {
  addDevice,
})(AddDevice);

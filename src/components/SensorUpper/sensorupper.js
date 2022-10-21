import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

import { withTranslation } from "react-i18next";

import { Container, Grid, Dropdown } from "semantic-ui-react";
import iconLocation from "../../images/icons/iconlocation.svg";
import iconDate from "../../images/icons/icontoday.svg";
import iconedit from "../../images/icons/iconedit.svg";
import "./sensorupper.scss";

class SensorUpper extends Component {
  state = {
    data: [
      {
        name: "Sensor1",
        hw: "ver v1.2019",
        sw: "ver v2.4",
        upTime: "188 hrs",
        lastModified: "Today At 13h00",
      },
      { humidity: "81", airTemp: "35", solarRad: "75" },
    ],
  };

  render() {
    const { userDevices, sensor } = this.props;
    console.log({ sensor });
    const deviceId =
      this.props.match && this.props.match.params
        ? this.props.match.params.id
        : "";
    // translation react-i18next
    const { t } = this.props;
    // TODO use the real data, use deviceName from userDevices

    const versionStyle = {
      color: "gray",
      fontSize: 10,
      margin: 0,
    };
    const upTimeStyle = {
      color: "gray",
      fontSize: 14,
    };
    const paramStyle = {
      fontSize: 20,
      color: "#535353",
      fontWeight: "bold"
    };
    const paramsValStyle = {
      fontSize: 35,
      color: "#0E7B3C",
      fontWeight: "600",
      opacity: 0.7,
      margin: 0
    };
    const paramTitleStyle = {
      fontSize: 14,
      color: "#535353",
      fontWeight: "bold",
      marginBottom: "12px"
    };

    const children = [];
    userDevices.map((userDevice) => {
      children.push({
        key: userDevice.deviceId,
        text: userDevice.deviceName,
        value: userDevice.deviceId,
        content: (
          <Link className="link" to={"/sensors/" + userDevice.deviceId}>
            {userDevice.deviceName}
          </Link>
        ),
      });
    });
    return (
      <Container fluid className="sensorUpper m-0 p-0">
        <Grid columns={2} divided>
          <Grid.Column className="leftpart" width={8} className="pl-5">
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={9} style={{ margin: 0, padding: 0 }}>
                  <Container textAlign="left">
                    <p>
                      <bold style={{ fontSize: 24 }}>
                        {!userDevices.length ? (
                          <p style={{ fontSize: 15 }}>
                            no sensors found in dropdown please select device
                            from upove dropdown
                            {/* sensor */}
                          </p>
                        ) : (
                          <Dropdown
                            inline
                            header="sensors"
                            options={children}
                            defaultValue={deviceId}
                            className = "sensorDropdown"
                            // defaultValue={defaultOption}
                          />
                        )}
                      </bold>
                    </p>
                  </Container>
                </Grid.Column>

                <Grid.Column width={7} style={{ margin: 0, padding: 0 }}>
                  <Container textAlign="right">
                    <p style={upTimeStyle}>
                      {t("common:uptime")}:{" "}
                      {sensor ? sensor.device.uptime : "_"}
                    </p>
                  </Container>
                </Grid.Column>
              </Grid.Row>
              <p style={versionStyle} className="p-0">
                HW: {sensor ? sensor.device.hw_version : "_"}{" "}
              </p>
              &nbsp;
              <p style={versionStyle} className="pl-2">
                SW: {sensor ? sensor.device.software_version : "_"}{" "}
              </p>
              <Grid.Row columns={3}>
                <Grid.Column width={9}>
                  <img src={iconDate} alt="date" />
                  <p style={versionStyle}>
                    <bold>
                      {t("common:todayLastUpdate")}
                      {/* parse="YYYY-MM-DD HH:mm" */}
                      <Moment format=" HH:mm" unix>
                        {sensor ? sensor.timestamp : "_"}
                      </Moment>
                    </bold>
                  </p>
                </Grid.Column>
                <Grid.Column width={4} className="p-0">
                  <img src={iconLocation} alt="location" />
                  <p style={versionStyle}>
                    {" "}
                    <bold> {t("common:location")}</bold>{" "}
                  </p>
                </Grid.Column>
                <Grid.Column width={3}>
                  <img src={iconedit} alt="edit" />
                  <p style={versionStyle}>
                    {" "}
                    <bold>{t("common:edit")}</bold>{" "}
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column className="rightpart" width={8}>
            <Grid>
              <Grid.Row className=" p-2">
                <Grid.Column>
                  <Container textAlign="left">
                    <p style={paramStyle} className = "paramStyle">
                      <bold>{t("common:SurfaceParameters")}</bold>
                    </p>
                  </Container>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row
                columns={3}
                centered
                className="m-2 p-0"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid.Column width={4}>
                  <p style={paramsValStyle} className = "paramsVal">
                    {sensor ? Math.round(sensor.level0.humidity) : "0"}
                    &#37;
                  </p>
                  <p style={paramTitleStyle} className = "paramsTitle">
                    <bold className="f-xs"> {t("common:Humidity")} </bold>
                  </p>
                </Grid.Column>
                <Grid.Column width={4}>
                  <p style={paramsValStyle} className = "paramsVal">
                    {sensor ? Math.round(sensor.level0.airTemp) : "0"}
                    &#8451;
                  </p>
                  <p style={paramTitleStyle} className = "paramsTitle">
                    <bold className="f-xs"> {t("common:AirTemp")} </bold>
                  </p>
                </Grid.Column>
                <Grid.Column>
                  {/* To fix Units */}
                  <p style={paramsValStyle} className = "paramsVal">
                    {sensor ? Math.round(sensor.level0.solarRad / 100) : "0"}
                    lux
                  </p>
                  <p style={paramTitleStyle} className = "paramsTitle">
                    <bold className="f-xs">{t("common:SolarRadiation")}</bold>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          {!sensor && (
            <Grid.Column width={8}>
              <p style={{ color: "red" }}>
                No data found for this sensor , please change selected sensor
                from sensor dropdown
              </p>
            </Grid.Column>
          )}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sensors: state.devices.userDevices,
  };
};
const SensorUpperComponent = withTranslation()(SensorUpper);

export default connect(mapStateToProps)(SensorUpperComponent);

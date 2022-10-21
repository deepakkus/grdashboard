import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Grid, GridColumn, Segment, Divider, Responsive, Container} from "semantic-ui-react";
import { ProgressBar } from "react-bootstrap";
import { withTranslation } from "react-i18next";

// import depthSensor from "../../images/ssensorIMG.png";
import depthSensor from "../../images/sensorsImage.png";
import "./sensortable.scss";
import SensorUpper from "../../components/SensorUpper/sensorupper";
import MainButton from "../../components/MainButton/MainButton";
import { getIdealRanges } from "../../services/plantCard";

class SensorTable extends Component {
  state = {
    /**
     * ProgressBar from Bootstrap coloring values
     */
    progressVariants: ["success", "warning", "danger"],

    /**
     * Progress from Semantic coloring values
     * Not Used
     */
    progressSemantic: ["success", "warning", "error"],

    /**
     * Not checked yet
     */
    progressMaxVal: [100, 100, 100, 100, 40, 14, 100, 100],
  };

  /**
   * ProgressBar from Bootstrap
   * @param key table header in this.state.depths list
   * @param val value for column from this.state.depths list
   * if it is in the ideal range specified in the state {ranges}
   */

  checkVariant = (key, val, ranges) => {
    if (val >= ranges[key].min && val <= ranges[key].max) {
      return this.state.progressVariants[0];
    } else if (
      Math.round(val / ranges[key].min) === 1 ||
      Math.floor(val / ranges[key].max) === 1
    ) {
      return this.state.progressVariants[1];
    } else {
      return this.state.progressVariants[2];
    }
  };
  async componentDidMount() {
    getIdealRanges();
  }

  /**
   * Progress from SemanticUI
   * @param key table header in this.state.depths list
   * @param val value for column from this.state.depths list
   * if it is in the ideal range specified in the state {ranges}
   * success -> in ideal range
   * warning -> round(value/minIdeal) = 1 or floor(value/maxIdeal) = 1
   * error -> otherwise
   */
  checkProgress = (key, val, ranges) => {
    if (val >= ranges[key].min && val <= ranges[key].max) {
      return this.state.progressSemantic[0];
    } else if (
      Math.round(val / ranges[key].min) === 1 ||
      Math.floor(val / ranges[key].max) === 1
    ) {
      return this.state.progressSemantic[1];
    } else {
      return this.state.progressSemantic[2];
    }
  };

  /** Random Table For Testing */
  testTable = () => {
    let table = [];
    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        children.push(<td>{`Column ${j + 1}`}</td>);
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>);
    }

    return table;
  };

  /**
   * Creating the table from state depths values
   * @param ranges ideal range from state
   * In react while rendering you can't render the parent then render child by loop
   * Implement loop for parent then loop for children to add into children list
   * exit children loop then add parent to list with children embedded in it
   * return list of parents to be rendered
   */

  createTable = () => {
    let table = [];

    let { t, ranges } = this.props;

    // ranges = undefined;

    if (Object.keys(ranges).length) {
      let depths = [
        this.props.sensor.level1,
        this.props.sensor.level2,
        this.props.sensor.level3,
      ];

      // console.log("test", depths);
      // console.log("test2", this.state.depths);
      // Outer loop to create parent

      // const { t } = this.props;
      depths.map((depth, index) => {
        let rangesFromState = ranges;
        const {
          nitrogen,
          phosphorus,
          potassium,
          salinity,
          soilTemp,
          pH,
          moisture,
          respiration,
          aeration,
        } = rangesFromState;
        // console.log("rangesFromState", rangesFromState);
        let children = [];

        rangesFromState = {
          N: nitrogen,
          P: phosphorus,
          K: potassium,
          salinity,
          soilTemp,
          pH,
          moisture,
          // respiration,
          // aeration,
          // "evapotranspiration(ET)": {
          //   min: 80,
          //   max: 100,
          // },
          item: {
            respiration,
            aeration,
          },
        };
        // console.log("rangesFromState1", rangesFromState);

        //Inner loop to create children
        for (var key in rangesFromState) {
          let val = Math.round(depth[key]);

          children.push(
            <GridColumn className = "sensor-column">
              {val == undefined || NaN || null ? (
                <p></p>
              ) : (
                <div className="p-0">
                  <p style={{ fontSize: 40, textAlign: "center", color: "#8D8C8C", fontWeight: "normal", marginLeft: "10px"}}>
                    {(() => {
                      if (key === "item" && depth["respiration"]) {
                        return (val = depth["respiration"]);
                      } else if (key === "item" && depth["aeration"]) {
                        return (val = depth["aeration"]);
                      } else if (depth[key] == undefined || NaN || null) {
                        return "";
                      } else {
                        return (val = Math.round(depth[key]));
                      }
                    })()}
                  </p>
                  {val == undefined || isNaN(val) || null ? (
                    <p></p>
                  ) : (
                    <ProgressBar
                      style={{ height: ".5rem", textAlign: "center" }}
                      striped
                      variant={this.checkVariant(key, val, rangesFromState)}
                      now={val}
                      className = "progress-Bar"
                      // max={rangesFromState[key].max}
                      max={(() => {
                        if (key === "item" && depth["respiration"]) {
                          return rangesFromState["item"].respiration.max;
                        } else if (key === "item" && depth["aeration"]) {
                          return rangesFromState["item"].aeration.max;
                        } else {
                          return rangesFromState[key].max;
                        }
                      })()}
                      key={`$key+$index`}
                    />
                  )}

                  {depth[key] == undefined || NaN || null ? (
                    ""
                  ) : (
                    <p style={{ margin: 0, textAlign: "center" }} className = "sensor-Status">
                      {" "}
                      {t("common:Ideal")}{" "}
                    </p>
                  )}
                  <p style={{ fontSize: 10, textAlign: "center" }} className = "sensor-Status">
                    {(() => {
                      if (key === "item" && depth["respiration"]) {
                        return ` ${rangesFromState["item"].respiration.min} -
                        ${rangesFromState["item"].respiration.max}`;
                      } else if (key === "item" && depth["aeration"]) {
                        return ` ${rangesFromState["item"].aeration.min} -
                        ${rangesFromState["item"].aeration.max}`;
                      } else if (
                        key === "item" &&
                        !depth["aeration"] &&
                        !depth["aeration"]
                      ) {
                        return ``;
                      } else {
                        return `${rangesFromState[key].min} - ${rangesFromState[key].max}`;
                      }
                    })()}
                  </p>
                  {/* <br /> */}

                  {(() => {
                    if (key === "item" && depth["respiration"]) {
                      return (
                        <GridColumn>
                          <p style={{ fontWeight: "bold", margin: 0 }}>
                            Respiration
                          </p>
                          <p style={{ fontSize: 11, padding: "0 30%" }}>
                            (PPM)
                          </p>
                        </GridColumn>
                      );
                    } else if (key === "item" && depth["aeration"]) {
                      return (
                        <GridColumn>
                          <p style={{ fontWeight: "bold", margin: 0 }}>
                            Aeration
                          </p>
                          <p
                            style={{
                              fontSize: 11,
                              padding: "0 30%",
                              margin: 0,
                            }}
                          >
                            (%)
                          </p>
                        </GridColumn>
                      );
                    }
                  })()}
                  {/* <Divider style={{ width: "100%" }} className="p-0 m-0" /> */}
                </div>
              )}
            </GridColumn>
          );
        }
        table.push(
          <React.Fragment>
            <Grid.Row className="sensor-row">{children}</Grid.Row>
            <Divider style={{ minWidth: "60vw" }} className="p-0 m-0" />
          </React.Fragment>
        );
      });
    }

    return table;
  };

  render() {
    const { t, sensor, ranges } = this.props;

    return ranges ? (
      <>
        <Responsive minWidth = {1024}>
          {/* <Container> */}
          <Segment
            style={{ overflowX: "hidden", maxHeight: "85vh", marginTop: "20px"}}
            className="table"
            raised
          >
            <Grid columns={2}>
              <Grid.Column width={13}>
                <Grid.Row className="my-4 mx-2">
                  <SensorUpper
                    match={this.props.match}
                    sensor={this.props.sensor}
                    userDevices={this.props.devices.UserDevicesOptions}
                    className="m-5"
                  />
                </Grid.Row>
                <Divider style={{ width: "100vw" }} className="p-0 m-0" />
                {sensor ? (
                  <Grid.Row className="table m-4 ml-0 pl-0">
                    <Grid columns={8} rows={4}>
                      <Grid.Row className="header-row">
                        <Grid.Column className="bold">
                          {t("common:Nitrogen")} <br /> <span className = "unit">(mg/L)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:Phosphorus")} <br /> <span className = "unit">(mg/L)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:Potassium")} <br /> <span className = "unit">(mg/L)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:Salinity")} <br /> <span className = "unit">(ds/M)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:SoilTemp")} <br /> <span className = "unit">(&#8451;)</span>
                        </Grid.Column>
                        <Grid.Column className="bold ph-value">
                          {t("common:pH")} <br /> <span className = "unit">(pH)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:Moisture")} <br /> <span className = "unit">(%)</span>
                        </Grid.Column>
                        <Grid.Column className="bold additional-value">
                          {" "}
                          {t("common:Additional")}
                        </Grid.Column>
                      </Grid.Row>
                      {this.createTable()}
                    </Grid>
                  </Grid.Row>
                ) : (
                  ""
                )}
              </Grid.Column>
              {sensor && (
                <Grid.Column width={3}>
                  <img
                    src={depthSensor}
                    alt="depthSensor"
                    className="depthSensorImg"
                  />
                </Grid.Column>
              )}
            </Grid>
          </Segment>
          {/* </Container> */}
        </Responsive>
        {/* RESPONSIVENESS FOR TABLETS */}
        <Responsive minWidth = {768} maxWidth = {1024}>
          <Container>
          <Segment
            style={{ overflowX: "scroll", maxHeight: "75vh", marginTop: "20px"}}
            className="table"
            
          >
            <Grid columns={2}>
              <Grid.Column width={13}>
                <Grid.Row className="my-4 mx-2">
                  <SensorUpper
                    match={this.props.match}
                    sensor={this.props.sensor}
                    userDevices={this.props.devices.UserDevicesOptions}
                    className="m-5"
                  />
                </Grid.Row>
                <Divider style={{ width: "100vw" }} className="p-0 m-0" />
                {sensor ? (
                  <Grid.Row className="table m-4 ml-0 pl-0">
                    <Grid columns={8} rows={4} className = "table-data">
                      <Grid.Row className="header-row">
                        <Grid.Column className="bold">
                          {t("common:Nitrogen")} <br /> <span className = "unit">(mg/L)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:Phosphorus")} <br /> <span className = "unit">(mg/L)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:Potassium")} <br /> <span className = "unit">(mg/L)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:Salinity")} <br /> <span className = "unit">(ds/M)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:SoilTemp")} <br /> <span className = "unit">(&#8451;)</span>
                        </Grid.Column>
                        <Grid.Column className="bold ph-value">
                          {t("common:pH")} <br /> <span className = "unit">(pH)</span>
                        </Grid.Column>
                        <Grid.Column className="bold">
                          {t("common:Moisture")} <br /> <span className = "unit">(%)</span>
                        </Grid.Column>
                        <Grid.Column className="bold additional-value">
                          {" "}
                          {t("common:Additional")}
                        </Grid.Column>
                      </Grid.Row>
                      {this.createTable()}
                    </Grid>
                  </Grid.Row>
                ) : (
                  ""
                )}
              </Grid.Column>
              {sensor && (
                <Grid.Column width={3}>
                  <img
                    src={depthSensor}
                    alt="depthSensor"
                    className="depthSensorImg"
                  />
                </Grid.Column>
              )}
            </Grid>
          </Segment>
          </Container>
        </Responsive>
      </>
    ) : (
      <div style={{ textAlign: "center", margin: "1rem 0" }}>
        <p className="p-0 m-2">No sensors data found</p>
        <Link className="p-0 m-0" to="/addDevice">
          <MainButton style={{ textAlign: "center", width: "15vw" }}>
            ADD A NEW DEVICE
          </MainButton>
        </Link>
      </div>
    );
  }
}

const SensorTableComponent = withTranslation()(SensorTable);

export default SensorTableComponent;

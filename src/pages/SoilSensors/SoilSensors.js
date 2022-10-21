import React, { Component } from "react";
import MainButton from "../../components/MainButton/MainButton";
import { Grid, Segment, Button } from "semantic-ui-react";
import Profile from "../../components/Profile/Profile";
import SearchBar from "../../components/SearchBar/SearchBar";
import PublicData from "../../components/PublicData/PublicData";
import SensorsList from "../../components/SensorsList/SensorsList";
import Sensortable from "../../components/SensorTable/sensortable";
import Navbar from "../../components/Navbar/navbar";
import SensorUpper from "../../components/SensorUpper/sensorupper";

import "./SoilSensors.scss";

export default class SoilSensors extends Component {
  render() {
    return (
      <Grid className="main ">
        <Grid.Row stretched>
          <Grid.Column width={1}>
            <Navbar />
          </Grid.Column>
          <Grid.Column width={11} className="midBody">
            <div className="search">
              <SearchBar title="soil sensors" />
            </div>
            <Segment raised className="mainContnet p-0">
              <SensorUpper />
              <Sensortable />
              {/* <SenseMidSection  /> */}
            </Segment>
          </Grid.Column>

          <Grid.Column width={4} className="sideSection">
            <Profile />

            <SensorsList />
            <PublicData />
            <MainButton />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

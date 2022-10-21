import React, { Component } from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import MainButton from "../../components/MainButton/MainButton";
import Profile from "../../components/Profile/Profile";
import CalenderCard from "../../components/CalenderCard/CalenderCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Navbar from "../../components/Navbar/navbar";
import DashMidGrids from "../../components/DashMidGrids/dashmidgrids";
// import SensorsList from "../../components/SensorsList";

import "./DashBoard.scss";
// Hakuna matata
// sharath

export default class DashBoard extends Component {
  render() {
    return (
      <Grid className="main ">
        <Grid.Row stretched>
          <Grid.Column width={1}>
            <Navbar />
          </Grid.Column>
          <Grid.Column width={11} className="midBody">
            <div className="search">
              <SearchBar title="Dashboard" />
            </div>
            {/* <Segment raised className="mainContnet "> */}
            <DashMidGrids />
            {/* </Segment> */}
          </Grid.Column>

          <Grid.Column width={4} className="sideSection">
            <Profile />
            {/* <WeatherCard /> */}
            <Segment raised className="weatherImg">
              <img
                src="https://images.squarespace-cdn.com/content/v1/5435569fe4b0d289e7405178/1584652246319-XMYIC4XMWWCGHSCVT4I5/ke17ZwdGBToddI8pDm48kNGm9A3LRnRHhT4wpyPm-N8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcO06e_sjNp3gfLQybDZhBJU3ZVJsBlU0dc9q6YQIhnVxFN2600ugJ9MKLbvu9Bzjz/Screen+Shot+2019-07-26+at+9.42.59+AM.jpg"
                alt="weatherImg"
              />
            </Segment>

            <Segment raised className="CalenderCard">
              <CalenderCard />
            </Segment>

            <MainButton />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

import React, { Suspense, useEffect, useState } from "react";
import { Container, Grid, Responsive, Button, Segment } from "semantic-ui-react";
import CalenderCard from "../../components/CalenderCard/CalenderCard"
import Navbar from "../Navbar/navbar";
import SearchBar from "../SearchBar/SearchBar";
import DashMidGrids from "../DashMidGrids/dashmidgrids";
import Profile from "../Profile/Profile";
import MainButton from "../MainButton/MainButton";
import DashSideSection from "../../sections/DashSideSection/dashsidesection";
import TabletView from "../tablet-view/tablet-view"
import { useTranslation } from "react-i18next";
import PublicData from "../PublicData/PublicData";


const Dashboard = (props) => {
  const [flag, setFlag] = useState(true);
  const { t } = useTranslation("common");
  // console.log(props)
  const getLatLong = () =>
  {
      // console.log(props.userFarms)
      const lat = props.userFarms ? props.userFarms[0].location[0][0] : 0;
      
      const lon = props.userFarms ? props.userFarms[0].location[0][1] : 0;
      return { lat, lon}
  }

  // console.log(props.userFarms)
  // const changeFlag = () => {
  //   setFlag(false);
  //   setTimeout(() => {
  //     console.log(flag);
  //   }, 1000);
  // };

  useEffect(() => {
    document.title = t(props.title);
    if (props.userDevices && props.userDevices.length) {
      props.getSensorsData(props.userDevices.map((d) => d.deviceId).join());
    }
  }, [props.title]);
  return (
    <div>
      <Responsive minWidth={1366}>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={1}>
              {/* <Container className="leftcontainer"> */}
              <Navbar
                active="dashboard"
                defaultsensor={
                  props.sensors && props.sensors[0]
                    ? props.sensors[0].deviceId
                    : undefined
                }
              />
              {/* </Container> */}
            </Grid.Column>
            {/* changeFlag={changeFlag} */}
            <Suspense fallback="loading">
              <Grid.Column width={11}>
                <div className="midcontainer">
                  <SearchBar {...props} />
                  <DashMidGrids  {...props} />
                </div>
              </Grid.Column>
              <Grid.Column width={4} className="rightcontainer">
                <div>
                  <Profile className="Profile" />
                </div>
                <div>
                  <Segment raised className="p-0 calendarcontainer">
                    <CalenderCard />
                  </Segment>
                </div>
                <Container>
                <div>
                  <PublicData {...props} latlng = {getLatLong()} className = "weather-det-dashboard"/>
                </div>
                </Container>
                <div>
                  <MainButton {...props}>
                  {
                    t("ADD_ACTIVITY")
                  }
                  </MainButton>
                </div>
              </Grid.Column>
            </Suspense>
          </Grid.Row>
        </Grid>
      </Responsive>



      <Responsive minWidth={768} maxWidth={1365.98}>
        <TabletView {...props} latlng = {getLatLong()}/>
      </Responsive>
    </div>
  );
};

export default Dashboard;

import React, { Suspense, useEffect, useState } from "react";
import { Segment, Container, Grid, Loader, Responsive } from "semantic-ui-react";
import Navbar from "../Navbar/navbar";
import SearchBar from "../SearchBar/SearchBar";
import PublicData from "../PublicData/PublicData";
import Profile from "../Profile/Profile";
import MainButton from "../MainButton/MainButton";
import MapCard from "../MapCard/MapCard";
import AddSensorLink from "../AddSensorLink/AddSensorLink";
import SensorTable from "../../components/SensorTable/sensortable";
import { useTranslation } from "react-i18next";
import { getIdealRanges } from "../../services/plantCard";
import { getPlantName } from "../../utils/utilsFunctions";
import TabletViewSensorsPage from "../tablet-view/tablet-view-sensors"
const Sensors = (props) => {
  const {
    title,
    devices: { userDevices },
    getSensorsData,
    ranges,
  } = props;
  // console.log(props.userFarms)
  const [values, setValues] = useState({
    ranges: {},
  });
  const { t } = useTranslation("common");
  const ids =
    ",14fbedaf-1b14-49f3-93ab-f3e405ab3e0d,20ac411f-4c09-409c-88a8-fe69594e2652";
  useEffect(() => {
    document.title = t(props.title);
    setRanges();
    props.getIdealRange("generic");
    if (userDevices && userDevices.length) {
      getSensorsData(userDevices.map((d) => d.deviceId).join());
    }
    console.log("getSensorsData");
  }, [title]);

  const selected = (id) => {
    let sensors = props.sensors;
    const sensor = sensors.filter((sensor) => {
      return sensor.deviceId === id;
    });
    if (sensor[0]) {
      return sensor[0];
    } else {
      return;
    }
  };

  // /console.log(props.farms)

  const setRanges = async () => {
    // TODO logic of finding the crop/plant
    // const plant = "allium%20cepa";
    const sensor = selected(props.match.params.id);
    const markerLoc = sensor && [
      sensor.location.latitude,
      sensor.location.longitude,
    ];

    if (sensor) {
      const plant = getPlantName(
        props.userFarms,
        markerLoc,
        props.lookup.croptypes
      );
      const ranges = plant
        ? await getIdealRanges(plant)
        : await getIdealRanges("generic");

      // props.getIdealRange("generic");

      setValues({ ranges });
      console.log({ plant });
      console.log({ ranges });
    }
  };

  const getLatLong = () => {
    // console.log(sensors);
    const sensor = props.sensors.filter(
      (sensor) => sensor.deviceId === props.match.params.id
    )[0];
    const lat = sensor ? sensor.location.latitude : 0;
    const lon = sensor ? sensor.location.longitude : 0;
    return { lat, lon };
  };

  // console.log("values", values.ranges);
  // const ranges = values.ranges;
  return (
    <>
    <Responsive minWidth = {1366}>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={1}>
            {/* <Container className="leftcontainer"> */}
              <Navbar
                active="sensors"
                defaultsensor={
                  props.sensors && props.sensors[0]
                    ? props.sensors[0].deviceId
                    : undefined
                }
              />
            {/* </Container> */}
          </Grid.Column>
          <Suspense fallback="loading">
            <Grid.Column width={11}>
              <div className="midcontainer">
                <SearchBar {...props} />
                {/* <Container fluid> */}
                  {/* <Segment raised className="SenseMidSection"> */}
                    {/* <Grid columns = {1}> */}
                      {/* <Grid.Column className="p-0 m-0"> */}
                        <SensorTable
                          ranges={ranges}
                          sensor={selected(props.match.params.id)}
                          firstSensor={props.sensors[0] && props.sensors[0]}
                          match={props.match}
                          {...props}
                        />
                      {/* </Grid.Column> */}
                    {/* </Grid> */}
                  {/* </Segment> */}
                {/* </Container> */}
              </div>
            </Grid.Column>
            <Grid.Column width={4} className="rightcontainer">
              {/* <Container> */}
                <div>
                  <Profile className="Profile" />
                </div>
                <div>
                  <MapCard {...props} />
                </div>
                <div>
                  <AddSensorLink {...props} />
                </div>
                <Container>
                <div>
                  <PublicData {...props} latlng={getLatLong()} className = "weather-det-sensors"/>
                </div>
                </Container>
                <div>
                  <MainButton className="MainButton" {...props}>
                    {t("ADD_ACTIVITY")}
                  </MainButton>
                </div>
                
              {/* </Container> */}
            </Grid.Column>
          </Suspense>
        </Grid.Row>
      </Grid>
    </Responsive>
    <Responsive minWidth = {768} maxWidth = {1365.98}>
      <TabletViewSensorsPage {...props} latlng = {getLatLong()} selected = {selected()}/>
    </Responsive>
    </>
  );
};

export default Sensors;

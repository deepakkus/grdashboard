import React, { Suspense, useEffect, useState } from "react";
import { Container, Grid, Responsive } from "semantic-ui-react";
import Navbar from "../Navbar/navbar";
import SearchBar from "../SearchBar/SearchBar";
import Gis_Analysis from "../GisAnalysis/GisAnalysis";
import Profile from "../Profile/Profile";
import MainButton from "../MainButton/MainButton";
import { useTranslation } from "react-i18next";
import PublicData from "../PublicData/PublicData";
import TabletGisAnalysis from "../tablet-view/tablet-view-gisanalysis";

const GisAnalysis = (props) => {
  // const [flag,setFlag] = useState(true)
  const { t } = useTranslation();

  const getLatLong = () => {
    const lat = props.userFarms ? props.userFarms[0].location[0][0] : 0;
    const lon = props.userFarms ? props.userFarms[0].location[0][1] : 0;
    // console.log("Lattitude is "+lat+"--Longitude is "+lon);
    return { lat, lon };
  };

  useEffect(() => {
    document.title = t(props.title);
  }, [props.title]);

  return (
    <>
      <Responsive minWidth={1366}>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={1}>
              {/* <Container className="leftcontainer"> */}
                <Navbar
                  defaultsensor={
                    props.sensors && props.sensors[0]
                      ? props.sensors[0].deviceId
                      : undefined
                  }
                  active="gisAnalysis"
                />
              {/* </Container> */}
            </Grid.Column>
          
            <Suspense fallback="loading">
              <Grid.Column width={11}>
                <div className="midcontainer">
                  <SearchBar {...props} />

                  <Gis_Analysis
                    {...props}
                    // getUserFarm = {props.getUserFarm}
                    // match={props.match}
                  />
                </div>
              </Grid.Column>
              <Grid.Column width={4} className="rightcontainer">
                {/* <Container> */}
                  <div>
                    <Profile className="Profile" />
                  </div>
                  <div>
                    <PublicData {...props} latlng={getLatLong}/>
                  </div>
                  <div>
                    <MainButton className="MainButton" {...props}>
                      {t("ADD ACTIVITY")}
                    </MainButton>
                  </div>
                  
                  
                {/* </Container> */}
              </Grid.Column>
            </Suspense>
          </Grid.Row>
        </Grid>
      </Responsive>
      <Responsive minWidth={768} maxWidth={1365.98}>
        <TabletGisAnalysis {...props} latlng = {getLatLong}/>
      </Responsive>
    </>
  );
};

export default GisAnalysis;

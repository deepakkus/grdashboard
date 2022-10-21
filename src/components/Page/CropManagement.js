import React, { Suspense, useEffect, useState } from "react";
import { Container, Grid, Responsive } from "semantic-ui-react";
import Navbar from "../Navbar/navbar";
import Profile from "../Profile/Profile";
import CropSideSection from "../../sections/CropSideSection/cropsidesection";
import MainButton from "../MainButton/MainButton";
import { useTranslation } from "react-i18next";
import CropContainer from "../CropManagement/cropcontainer";
import TimelineLabel from "../TimelineLabel/TimelineLabel";
import SearchBar from "../SearchBar/SearchBar";
import TabletViewCropPage from "../tablet-view/tablet-view-cropmanage"
const CropManagement = (props) => {
  const [flag, setFlag] = useState(true);
  const { t } = useTranslation("crop-management");

  const changeFlag = () => {
    setFlag(false);
    setTimeout(() => {
      console.log(flag);
    }, 1000);
  };

  useEffect(() => {
    document.title = t(props.title);
    if (props.devices.userDevices.length) {
      props.getSensorsData(
        props.devices.userDevices.map((d) => d.deviceId).join()
      );
    }
  }, [props.title, props.devices]);
  return (


    <div>
      <Responsive minWidth = {1366}>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={1}>
              {/* <Container className="leftcontainer"> */}
              <Navbar
                active="cropManagement"
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
                  <CropContainer {...props} />
                </div>
              </Grid.Column>
              <Grid.Column width={4} className="rightcontainer crop-rightcontainer">
                {/* <Container> */}
                  <div>
                    <Profile className="Profile" />
                  </div>
                  <div>
                    <CropSideSection {... props}/>
                  </div>
                  <div>
                    <MainButton {...props} className = "MainButton">
                      {
                        t("ADD ACTIVITY")
                      }
                    </MainButton>
                  </div>
                {/* </Container> */}
              </Grid.Column>
            </Suspense>
          </Grid.Row>
        </Grid>
      </Responsive>
      <Responsive minWidth={768} maxWidth={1365.98}>
        <TabletViewCropPage {...props} />
      </Responsive>
    </div>


  );
};

export default CropManagement;

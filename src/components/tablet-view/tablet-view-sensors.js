import React, {Suspense, useState} from "react"
import Navbar from "../Navbar/navbar";
import SearchBar from "../SearchBar/SearchBar";
import { Grid, Sidebar, Segment, Container, Button, Icon} from "semantic-ui-react";
import Profile from "../Profile/Profile";
import MapCard from "../MapCard/MapCard";
import AddSensorLink from "../AddSensorLink/AddSensorLink";
import PublicData from "../PublicData/PublicData";
import SensorTable from "../../components/SensorTable/sensortable";
import MainButton from "../MainButton/MainButton";

import { useTranslation } from "react-i18next";
import "./tablet-view-sensors.scss"


const TabletViewSensorsPage = (props) =>
{
    const [hidden , setHidden] = useState(false)
    const { t } = useTranslation("common");

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

    return (
        <>
            <Grid columns={1} className="tablet-view-grid">
                {
                    !hidden ? 
                    (
                        <Button className="tablet-view-button" style = {{zIndex: 1}} onClick={()=>{setHidden(true)}}>
                            <Icon name="sidebar" className="mx-auto"/>
                        </Button>
                    )
                    :
                    (
                        <Button className="tablet-view-button" style = {{zIndex: 0}} onClick={()=>{setHidden(true)}}>
                            <Icon name="sidebar" className="mx-auto"/>
                        </Button>
                    )
                }
                <Grid.Row className="test-row">
                    <Grid.Column width={16} className="px-0 tablet-view-container">
                        <Sidebar.Pushable as={Segment}>
                            <Sidebar
                                as={Grid}
                                animation='overlay'
                                icon='labeled'
                                inverted
                                // onHide={() => setVisible(false)}
                                vertical
                                visible={hidden}
                                width="very wide"
                                direction="right"
                            >
                                <Grid.Column className="sensors-rightcontainer">
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
                                        <PublicData {...props} latlng={props.latlng} className = "weather-det-sensors"/>
                                    </div>
                                    </Container>
                                    <div>
                                        <MainButton className="MainButton" {...props}>
                                            {t("ADD_ACTIVITY")}
                                        </MainButton> 
                                    </div>  
                                    {/* </Container> */}
                                </Grid.Column>
                            </Sidebar>
                            <Sidebar.Pusher dimmed={hidden} onClick={()=>setHidden(false)}>
                                <Grid columns={2} className="pusher-grid">
                                    <Grid.Row className="ml-1">
                                        <Grid.Column width={1}>
                                            <Navbar
                                                active="sensors"
                                                defaultsensor={
                                                props.sensors && props.sensors[0]
                                                    ? props.sensors[0].deviceId
                                                    : undefined
                                                }
                                            />
                                        </Grid.Column>
                                        <Suspense fallback="loading">
                                            <Grid.Column width={15}>
                                                <div className="midcontainer">
                                                    <SearchBar {...props} />
                                                    {/* <Segment raised className="SenseMidSection"> */}
                                                        <Grid columns = {1}>
                                                        <Grid.Column className="p-0 m-0" tablet = {16}>
                                                            <SensorTable
                                                            ranges={props.ranges}
                                                            sensor={selected(props.match.params.id)}
                                                            firstSensor={props.sensors[0] && props.sensors[0]}
                                                            match={props.match}
                                                            {...props}
                                                            />
                                                        </Grid.Column>
                                                        </Grid>
                                                    {/* </Segment> */}
                                                </div>
                                            </Grid.Column>
                                        </Suspense>
                                    </Grid.Row>
                                </Grid>
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}


export default TabletViewSensorsPage



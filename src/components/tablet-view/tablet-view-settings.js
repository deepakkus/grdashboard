import React, {Suspense, useState} from "react";
import {Grid, Sidebar, Segment, Container, Button, Icon} from "semantic-ui-react"
import Navbar from "../Navbar/navbar"
import SearchBar from "../SearchBar/SearchBar";
import Profile from "../Profile/Profile"
import PublicData from "../PublicData/PublicData";
import SettingsMidGrids from "../SettingsMidGrids/settingsmidgrids"
import MainButton from "../MainButton/MainButton";



const TabletViewSettings = (props) =>
{
    const [hidden , setHidden] = useState(false)
    return(
        <div>
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
                                <Grid.Column className="settings-rightcontainer">
                                    <Container>
                                        <div>
                                        <Profile className="Profile" />
                                        </div>
                                        <div className = "settings-weather-tablet">
                                        <PublicData {...props} latlng = {props.latlng} />
                                        </div>
                                        <div>
                                            <MainButton {...props} className = "MainButton">
                                            
                                                ADD ACTIVITY
                                            
                                            </MainButton>
                                        </div>
                                        
                                    </Container>
                                </Grid.Column>
                            </Sidebar>
                            <Sidebar.Pusher dimmed={hidden} onClick={()=>setHidden(false)}>
                                <Grid columns={2} className="pusher-grid">
                                    <Grid.Row className="ml-1">
                                        <Grid.Column width={1}>
                                            <Navbar
                                                active="settings"
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
                                                    <SettingsMidGrids {...props}/>
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
        </div>
    )
}


export default TabletViewSettings
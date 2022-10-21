import React, { Suspense, useState } from "react";
import { Container, Grid, Responsive, Sidebar, Segment, Button, Icon} from "semantic-ui-react";
import Navbar from "../Navbar/navbar";
import SearchBar from "../SearchBar/SearchBar";
import Gis_Analysis from "../GisAnalysis/GisAnalysis";
import Profile from "../Profile/Profile";
import PublicData from "../PublicData/PublicData";
import MainButton from "../MainButton/MainButton";



const TabletGisAnalysis = (props) =>
{

    const [hidden, setHidden] = useState(false)

    return(
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
                                <Grid.Column className="gis-rightcontainer">
                                    <Container>
                                        <div>
                                            <Profile className="Profile" />
                                        </div>
                                        <div>
                                            <PublicData {...props} latlng={props.latlng}/>
                                        </div>
                                        <div>
                                            <MainButton className="MainButton" {...props}>
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
                                                defaultsensor={
                                                    props.sensors && props.sensors[0]
                                                    ? props.sensors[0].deviceId
                                                    : undefined
                                                }
                                                active="gisAnalysis"
                                            />
                                        </Grid.Column>
                                        <Suspense fallback="loading">
                                            <Grid.Column width={15}>
                                                <div className="midcontainer">
                                                    <SearchBar {...props} />
                                                    <Gis_Analysis
                                                        {...props}
                                                    />
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


export default TabletGisAnalysis
import React, {Suspense, useState, useEffect} from "react"
import Navbar from "../Navbar/navbar";
import SearchBar from "../SearchBar/SearchBar";
import CropContainer from "../CropManagement/cropcontainer";
import "./tablet-view.scss"
import { Grid, Sidebar, Segment, Container, Button, Icon} from "semantic-ui-react";
import CropSideSection from "../../sections/CropSideSection/cropsidesection";
import MainButton from "../MainButton/MainButton";
import Profile from "../Profile/Profile";
import { useTranslation } from "react-i18next";






const TabletViewCropPage = (props) =>
{
    
    const [hidden , setHidden] = useState(false)
    const { t } = useTranslation("common");
    // const [flag, setFlag] = useState(true);
    // const changeFlag = () => {
    //     setFlag(false);
    //     setTimeout(() => {
    //       console.log(flag);
    //     }, 1000);
    //   };
    // useEffect(() => {
    //     document.title = t(props.title);
    //     if (props.userDevices && props.userDevices.length) {
    //       props.getSensorsData(props.userDevices.map((d) => d.deviceId).join());
    //     }
    //   }, [props.title]);
    
    
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
                                <Grid.Column className="crop-rightcontainer">
                                    {/* <Container> */}
                                    <div>
                                        <Profile className="Profile" />
                                    </div>
                                    <div>
                                        <CropSideSection />
                                    </div>
                                    <div>
                                        <MainButton className="MainButton" {...props}>{t("ADD_ACTIVITY")}</MainButton>
                                    </div>
                                    {/* </Container> */}
                                </Grid.Column>
                            </Sidebar>
                            <Sidebar.Pusher dimmed={hidden} onClick={()=>setHidden(false)}>
                                <Grid columns={2} className="pusher-grid">
                                    <Grid.Row className="ml-1">
                                        <Grid.Column width={1}>
                                            <Navbar active="cropManagement" 
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
                                                    <CropContainer {...props}/>
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


export default TabletViewCropPage;
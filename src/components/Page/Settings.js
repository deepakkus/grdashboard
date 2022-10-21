import React, {Suspense, useEffect, useState} from "react";
import {Grid, Responsive} from "semantic-ui-react"
import Navbar from "../Navbar/navbar"
import SearchBar from "../SearchBar/SearchBar";
import Profile from "../Profile/Profile"
import PublicData from "../PublicData/PublicData";
import SettingsMidGrids from "../SettingsMidGrids/settingsmidgrids"
import {useTranslation} from "react-i18next"
import TabletViewSettings from "../tablet-view/tablet-view-settings";
import MainButton from "../MainButton/MainButton";


const Settings = (props) =>
{
    console.log(props)
    // let polygon = props.userFarms[0].location
    // console.log(polygon)
    const [flag, setFlag] = useState(true)
    const {t} = useTranslation("common")

    const changeFlag = () =>
    {
        setFlag(false)
        setTimeout(() => {
            console.log(flag)
        }, 1000);
    }

    const getLatLong = () =>
    {
        // console.log(props.userFarms)
        const lat = props.userFarms ? props.userFarms[0].location[0][0] : 0;
        
        const lon = props.userFarms ? props.userFarms[0].location[0][1] : 0;
        return { lat, lon}
    }

    console.log(props.userFarms)

    useEffect(() => {
        document.title = t(props.title);
        if (props.userDevices && props.userDevices.length) {
          props.getSensorsData(props.userDevices.map((d) => d.deviceId).join());
        }
      }, [props.title]);


    return(
        <div>
            <Responsive minWidth = {1366}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Navbar 
                            
                                active = "settings"
                                defaultsensor = 
                                {
                                    props.sensors && props.sensors[0]
                                        ? props.sensors[0].deviceId
                                        : undefined
                                }
                            
                            />
                        </Grid.Column>
                        <Suspense fallback="loading">
                            <Grid.Column width={11}>
                                <div className="midcontainer">
                                    <SearchBar {...props}/>
                                    <SettingsMidGrids {...props}/>
                                </div>
                            </Grid.Column>

                            <Grid.Column width={4} className="rightcontainer">
                                <div>
                                    <Profile className="Profile"/>
                                </div>
                                <div>
                                     <PublicData {...props} latlng = {getLatLong()}/> 
                                </div>
                                <div>
                                    <MainButton className="MainButton" {...props}>
                                        {t("ADD ACTIVITY")}
                                    </MainButton>
                                </div>
                            </Grid.Column>

                        </Suspense>
                    </Grid.Row>
                </Grid>
            </Responsive>
            <Responsive minWidth = {768} maxWidth = {1365.98}>
                <TabletViewSettings {...props} latlng = {getLatLong()}/>
            </Responsive>
        </div>
    )
}


export default Settings;
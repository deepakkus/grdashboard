import React , {useState, useEffect} from "react"
import "./SettingsListStyles.scss" 
import {Segment, Grid} from "semantic-ui-react"
import {calculateArea} from "../../utils/utilsFunctions"
import MapPolygon from "../MapPolygon/MapPolygon"
import fieldCorrectPic from "../../images/xd/fieldCorrectPic.svg"

const SettingsList = (props) =>
{
    const {userId, token, userFarms, getIdealRange, lookup, soilHealth} = props;
    const [fieldId, setFieldId] = useState("");
    let fieldOptions = [];
    
    const userFields = userFarms.length > 0 ? userFarms.map(farm => {
        let polygon =  farm.location
        let center =  farm.address.location
        let soiltypes = lookup.soiltypes.filter((soiltype) => soiltype._id === farm.soilTypeId)
        let watersources = lookup.watersources.filter((watersource) => watersource._id === farm.waterSourceId)
        let terraintypes = lookup.terraintypes.filter((terrain) => terrain._id === farm.terrainTypeId)
        console.log(soiltypes)
        // console.log(watersource)

        return(
            <Segment inverted className="user-fields" key = {farm._id}>
                <Grid>
                    <Grid.Row columns = {2} className = "mx-0">
                        {/* <MapPolygon editable = {false} polygon = {polygon} center = {center}/> */}
                        <Grid.Column width = {3} className = "fieldImg"><img src = {fieldCorrectPic} className = "Img"/></Grid.Column>
                        <Grid.Column width = {13}>
                            <div className = "fieldHeading">
                                <div>
                                    <h5>
                                        {farm.farmName}
                                    </h5>
                                </div>
                                <div>
                                    <h5>
                                        EDIT
                                    </h5>
                                </div>
                            </div>
                            <div className = "fieldUpper">
                                <div>
                                    <span>Location: </span><span>{farm.address.location[0].toFixed(2)} Lat {farm.address.location[1].toFixed(2)} Lng</span>
                                </div>
                                <div>
                                    {
                                        soilHealth ? '' : <span>Size: </span>
                                    }
                                </div>
                                <div>
                                    <span>
                                        DELETE
                                    </span>
                                </div>
                            </div>
                            {
                                soilHealth ? 
                                (
                                    <div>
                                        <div className = "report-date">
                                            <span>Report Date: 11.11.2021</span>
                                        </div>
                                    </div>
                                ): ('')
                            }
                            
                            
                            
                            
                            {/* <h5>
                                Location: <span>{`${farm.address.location[0].toFixed(2)}`} Lat {`${farm.address.location[1].toFixed(2)}`} Long</span>
                            </h5>                             */}
                        </Grid.Column>
                    </Grid.Row>
                    {
                        soilHealth ? 
                        (
                            <Grid.Row columns = {2} className = "fieldBottom">
                                <div className = "soilHealth-card">
                                    <div className = "lab-name">
                                        <Grid.Column className = "fielDetails-bottom">
                                            <span>Name of Laboratory: </span><span>Barath Kishan Lab</span>
                                        </Grid.Column>
                                    </div>
                                    <div className = "soil-type">
                                        <Grid.Column className = "fielDetails-bottom">
                                            <span>Soil Sample Number: </span>
                                            <span>Black soil</span>
                                        </Grid.Column>
                                    </div>
                                    
                                </div>
                            </Grid.Row>
                        )
                        :
                        (
                            <Grid.Row columns = {4} className = "fieldBottom">
                                <>
                                    <Grid.Column className = "fielDetails-bottom">
                                        <span>Crop: </span><span>Uncultivated</span>
                                    </Grid.Column>
                                    <Grid.Column className = "fielDetails-bottom">
                                        <span>Water Source: </span><span>{watersources[0] ? watersources[0].name : watersources}</span>
                                        {/* {watersources[0].name} */}
                                    </Grid.Column>
                                    <Grid.Column className = "fielDetails-bottom">
                                        <span>Soil Type: </span><span>{soiltypes[0] ? soiltypes[0].name : soiltypes}</span>
                                    </Grid.Column>
                                    <Grid.Column className = "fielDetails-bottom">
                                        <span>Terrain Type: </span><span>{terraintypes[0] ? terraintypes[0].name : terraintypes}</span>
                                    </Grid.Column>
                                </>
                            </Grid.Row>
                        )
                    }
                    
                </Grid>
            </Segment>
        )
    })
    :null
    return(
        userFields
    )

}
    



export default SettingsList;



// const fillData = (newData) =>
//     {
//         newData.forEach((element) =>
//         {
//             fieldOptions.push({
//                 text: element.farmName,
//                 id: element._id,
//                 value: element._id
//             });
//         });
//     }





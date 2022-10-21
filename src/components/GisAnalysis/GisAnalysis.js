import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import { Grid, Menu, Container, Segment, Button, Dropdown, Form, Responsive } from 'semantic-ui-react';
// import { } from 'semantic-ui-react';
import './GisAnalysis.scss';
import MapPolygon from '../MapPolygon/MapPolygon';
import { useTranslation } from "react-i18next";
import HeatMap from '../HeatMap/HeatMap';
import GeneralAnalyzer from './GisGeneralAnalyzer'
// import { setRTLTextPlugin } from 'mapbox-gl';

const GisAnalysis = (props) => {
    const [activeItem, setActiveItem] = useState('Recent Map');
    const { t } = useTranslation();

    const [indices, setIndices] = useState('');
    const [field, setField] = useState('');
    const [fieldId, setFieldId] = useState('');
    const [date, setDate] = useState('');
    const [heatmap, setHeatmap] = useState(false);
    const [datt, setDatt] = useState([]);
    const [latlon, setLatLon] = useState([]);
    // const [imageId, setImageId] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [image, setImage] = useState('');

    let polygon = [[48.8566, 2.3522]] //=  props.userFarms.location
    let center = [48.8566, 2.3522]//=  props.userFarms.address.location

    let fieldOptions = [];
    let selectedField = '';
    let currentFieldId = '';
    const fillData = (newData = props.userFarms) => {
        newData.forEach(element => {
            fieldOptions.push({
                text: element.farmName,
                id: element._id,
                value: element.farmName,
                polygon: element.location,
                center: element.address.location
            })
        });
        selectedField = newData[0].farmName;
        polygon = newData[0].location;
        center = newData[0].address.location;
        currentFieldId = newData[0]._id;
    }

    var indicesOptions = [
        {
            key: 'NDVI',
            text: 'NDVI',
            value: 'NDVI'
        }
    ]



    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
        // setHeatmap(!heatmap)
        
    
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        // setHeatmap(true);
    }

    let datee = []
    let aoi = [];
    const getHeatData = async () => {
        let fId = ''
        fieldId ? fId = fieldId : fId = currentFieldId;

        fieldOptions.forEach(element => {
            if (element.id === fId) {
                element.polygon.forEach(ele => {
                    aoi.push([
                        ele[1],
                        ele[0]
                    ]);
                });
            }
        });
        // const re = [];
        // re =  getHeatData(aoi);
        // //console.log("--%%--re--",re);
        // datee = aoi.map((element) => 
        //         ({
        //             key: element.image,
        //             value: element.image,
        //             text: element.date.split('T')[0]
        //         })
        // );
        // setDatt(datee);
        // console.log(datee);
        // console.log("---))))))----handleHeatMap----(((((((----");
    }


    /* HeatMap Function */
    const handleHeatMap = (event) => {
        event.preventDefault();
        if (indices === '') {
            return;
        }
        // if(date === ''){
        //     return;
        // }
        let fId = ''
        fieldId ? fId = fieldId : fId = currentFieldId;
        let res = props.getLinkForImage(image, indices, fId);
        // console.log("response--> ", res);
        setImageLink(res);
        setHeatmap(!heatmap)
        
    }



    useEffect(() => {
        document.title = t(props.title);

    }, [props.title]);


    useEffect(() => {
        //---- For Rerendering the component with new value
        //----- This get heat data only called when changing the fields
        getHeatData();
        //console.log("latlon----> ",latlon);
        if (latlon.length > 0) {
            //console.log("getget---->> ",latlon[0][0],latlon[0][1]);
            props.getWeatherData(latlon[0][0], latlon[0][1]);
        }
    }, [field]);

    useEffect(() => {
        //----- Rendering only on heatmap
        getHeatData()
    }, [heatmap]);

    return (
    <>
        <Responsive minWidth = {1024}>
            {activeItem == "Recent Map" ? 
            
                <Grid columns={1} container>
                    <Grid.Row className="ml-2">
                        <Grid.Column>
                            {props.userFarms.length > 0 ? fillData(props.userFarms) : null}
                            <Segment className="px-0 analysis-map">
                                <Menu pointing secondary fluid>
                                    <Menu.Item
                                        name="Recent Map"
                                        color="green"
                                        active={activeItem === "Recent Map"}
                                        onClick={handleItemClick}
                                    />
                                    <Menu.Item
                                        name="Timeline"
                                        color="green"
                                        active={activeItem === "Timeline"}
                                        onClick={handleItemClick}
                                    />
                                    <Menu.Menu position = "right">
                                        <Menu.Item name = "Gis-app" className = "gis-app">
                                            <Link to = {{pathname: "http://gisapp.sensegrass.com/"}} target = "_blank" rel = "noopener noreferrer">
                                                <Button className = "gis-app-btn">
                                                    Gis Analyzer
                                                </Button>
                                            </Link>
                                        </Menu.Item>
                                    </Menu.Menu>
                                    {/* {console.log(heatmap)} */}
                                </Menu>
                                <Grid columns={1}>
                                    <Grid.Row className="mx-0 py-0">
                                        <Grid.Column className="segment-Gis">
                                            {!heatmap ?

                                                <>
                                                    {/* <div className="form-top">
                                                        <Form>
                                                            
                                                        </Form>

                                                    </div> */}
                                                    <div className='form-wrapper'>
                                                        <Form onSubmit={handleHeatMap}>
                                                            
                                                            
                                                            <Form.Field>
                                                                <label>{t("common:AreaSelected")}</label>
                                                                <Dropdown
                                                                    placeholder='Select Field'
                                                                    defaultValue={field ? field : selectedField}
                                                                    selection
                                                                    fluid
                                                                    options={fieldOptions}
                                                                    // value={field}
                                                                    onChange={(e, center) => {
                                                                        const dumm = center.options.filter(pers => pers.id === e.target.id).map(filtered => (filtered.center));
                                                                        setField(e.target.textContent);
                                                                        setFieldId(e.target.id);
                                                                        setLatLon(dumm);
                                                                        //console.log("setLAtLon---->",dumm);
                                                                    }}
                                                                />
                                                            </Form.Field>
                                                            
                                                            <Form.Field>
                                                                <label>{t("common:SelectDate")}</label>
                                                                <Dropdown
                                                                    placeholder='Select Date'
                                                                    fluid
                                                                    selection
                                                                    // options={dateOptions.length>0 ? dateOptions : defaultDateOption}
                                                                    options={datt}

                                                                    onChange={(e, { value }) => {
                                                                        setDate(e.target.textContent);
                                                                        //  handleDateClick(value);
                                                                        setImage(value);
                                                                    }}
                                                                />
                                                            </Form.Field>

                                                            <Form.Field>
                                                                <label>{t("common:SelectIndices")}</label>
                                                                <Dropdown
                                                                    placeholder='Select Indices'
                                                                    fluid
                                                                    selection
                                                                    options={indicesOptions}
                                                                    onChange={(e, { value }) => setIndices(value)}
                                                                />
                                                            </Form.Field>

                                                            <Button fluid type='submit' color='green' className="form-button">Generate Heat Map</Button>

                                                        </Form>
                                                    </div>
                                                </>

                                                : null
                                            }

                                            {heatmap ? <HeatMap {...props} fieldId={fieldId ? fieldId : currentFieldId} date={date} indices={indices} selectedField={selectedField}  setHeatmap = {setHeatmap} imageLink={imageLink} /> : null}
                                            {props.userFarms.length > 0 && fieldId && !heatmap ? props.userFarms.forEach(poly => {
                                                if (poly._id === fieldId) {
                                                    polygon = poly.location
                                                    center = poly.address.location
                                                }
                                            }) :
                                                null
                                            }

                                            {!heatmap ? 
                                                // <div className="mapContainer">
                                                     <MapPolygon editable={true} polygon={polygon} center={center} />
                                                /* </div>  */
                                                : null 
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                : setActiveItem("Recent Map")
            
            }
            
        </Responsive>
        <Responsive minWidth = {768} maxWidth = {1023.98}>
            {activeItem == "Recent Map" ? 
            <Container>
                <Grid columns={1} container>
                    <Grid.Row className="ml-2">
                        <Grid.Column>
                            <Segment className="px-0 analysis-map">
                                <Menu pointing secondary fluid>
                                    <Menu.Item
                                        name="Recent Map"
                                        color="green"
                                        active={activeItem === "Recent Map"}
                                        onClick={handleItemClick}
                                    />
                                    <Menu.Item
                                        name="Timeline"
                                        color="green"
                                        active={activeItem === "Timeline"}
                                        onClick={handleItemClick}
                                    />
                                    <Menu.Menu position = "right">
                                        <Menu.Item name = "Gis-app" className = "gis-app">
                                            <Link to = {{pathname: "http://gisapp.sensegrass.com/"}} target = "_blank" rel = "noopener noreferrer">
                                                <Button className = "gis-app-btn">
                                                    Gis Analyzer
                                                </Button>
                                            </Link>
                                        </Menu.Item>
                                    </Menu.Menu>
                                    {/* {console.log(heatmap)} */}
                                </Menu>
                                <Grid columns={1}>
                                    <Grid.Row className="mx-0 py-0">
                                        <Grid.Column className="segment-Gis">
                                            {!heatmap ?

                                                <>
                                                    {/* <div className="form-top">
                                                        <Form>
                                                            
                                                        </Form>

                                                    </div> */}
                                                    <div className='form-wrapper'>
                                                        <Form onSubmit={handleHeatMap}>
                                                            
                                                            
                                                            <Form.Field>
                                                                <label>{t("common:AreaSelected")}</label>
                                                                <Dropdown
                                                                    placeholder='Select Field'
                                                                    defaultValue={field ? field : selectedField}
                                                                    selection
                                                                    fluid
                                                                    options={fieldOptions}
                                                                    // value={field}
                                                                    onChange={(e, center) => {
                                                                        const dumm = center.options.filter(pers => pers.id === e.target.id).map(filtered => (filtered.center));
                                                                        setField(e.target.textContent);
                                                                        setFieldId(e.target.id);
                                                                        setLatLon(dumm);
                                                                        //console.log("setLAtLon---->",dumm);
                                                                    }}
                                                                />
                                                            </Form.Field>
                                                            
                                                            <Form.Field>
                                                                <label>{t("common:SelectDate")}</label>
                                                                <Dropdown
                                                                    placeholder='Select Date'
                                                                    fluid
                                                                    selection
                                                                    // options={dateOptions.length>0 ? dateOptions : defaultDateOption}
                                                                    options={datt}

                                                                    onChange={(e, { value }) => {
                                                                        setDate(e.target.textContent);
                                                                        //  handleDateClick(value);
                                                                        setImage(value);
                                                                    }}
                                                                />
                                                            </Form.Field>

                                                            <Form.Field>
                                                                <label>{t("common:SelectIndices")}</label>
                                                                <Dropdown
                                                                    placeholder='Select Indices'
                                                                    fluid
                                                                    selection
                                                                    options={indicesOptions}
                                                                    onChange={(e, { value }) => setIndices(value)}
                                                                />
                                                            </Form.Field>

                                                            <Button fluid type='submit' color='green' className="form-button">Generate Heat Map</Button>

                                                        </Form>
                                                    </div>
                                                </>

                                                : null
                                            }

                                            {heatmap ? <HeatMap {...props} fieldId={fieldId ? fieldId : currentFieldId} date={date} indices={indices} selectedField={selectedField}  setHeatmap = {setHeatmap} imageLink={imageLink} /> : null}
                                            {props.userFarms.length > 0 && fieldId && !heatmap ? props.userFarms.forEach(poly => {
                                                if (poly._id === fieldId) {
                                                    polygon = poly.location
                                                    center = poly.address.location
                                                }
                                            }) :
                                                null
                                            }

                                            {!heatmap ? 
                                                // <div className="mapContainer">
                                                    <MapPolygon editable={true} polygon={polygon} center={center} />
                                                /* </div>  */
                                                : null 
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Container>
                : setActiveItem("Recent Map")
            
            }
            
        </Responsive>
    </>
        // <Container fluid>

        //     {props.userFarms.length>0 ? fillData(props.userFarms) : null}

        //     <Menu pointing secondary>
        //         <Menu.Item 
        //             name = 'Recent Map'
        //             color = "green"
        //             active = {activeItem === 'Recent Map'}
        //             onClick = {handleItemClick}
        //         />
        //         <Menu.Item 
        //             name = "Timeline"
        //             color = "green"
        //             active = {activeItem === 'Timeline'}
        //             onClick = {handleItemClick}
        //         />
        //     </Menu>
        //     <Container className="segment-Gis">



        //   { !heatmap ? 
        //   <div className='form-top'>
        //     <Form onSubmit={handleSubmit}>
        //         <Form.Field>
        //             <label>{t("common:AreaSelected")}</label>
        //             <Dropdown 
        //                 placeholder='Select Field'
        //                 defaultValue={field ? field : selectedField}
        //                 selection
        //                 fluid
        //                 options={fieldOptions}
        //                 // value={field}
        //                 onChange={(e, center) =>  {
        //                     const dumm = center.options.filter(pers => pers.id === e.target.id).map(filtered => (filtered.center));
        //                     setField(e.target.textContent);
        //                     setFieldId(e.target.id);
        //                     setLatLon(dumm);
        //                     //console.log("setLAtLon---->",dumm);
        //                 }}
        //             />
        //         </Form.Field>
        //     </Form>
        // </div>
        // : null }

        // { !heatmap ?
        // <div className='form-wrapper'>
        //     <Form onSubmit={handleHeatMap}>

        //         <Form.Field>
        //             <label>{t("common:SelectDate")}</label>
        //             <Dropdown 
        //                 placeholder='Select Date'
        //                 fluid
        //                 selection
        //                 // options={dateOptions.length>0 ? dateOptions : defaultDateOption}
        //                 options = {datt}

        //                 onChange={(e, {value}) => {
        //                      setDate(e.target.textContent);
        //                     //  handleDateClick(value);
        //                      setImage(value);
        //                     }}
        //             />
        //         </Form.Field>

        //         <Form.Field>
        //             <label>{t("common:SelectIndices")}</label>
        //             <Dropdown 
        //                 placeholder='Select Indices'
        //                 fluid
        //                 selection
        //                 options={indicesOptions}
        //                 onChange={(e, {value}) => setIndices(value)}
        //             />
        //         </Form.Field>

        //         <Button type='submit' color='green'>Generate Heat Map</Button>

        //     </Form>
        // </div>
        // : null }


        // {heatmap ? <HeatMap {...props} fieldId={fieldId ? fieldId : currentFieldId} date={date} indices={indices} selectedField={selectedField} setHeatmap={setHeatmap} imageLink={imageLink} /> : null}

        // { props.userFarms.length>0&&fieldId&&!heatmap ? props.userFarms.forEach(poly => { 
        //     if(poly._id === fieldId){
        //         polygon = poly.location
        //         center = poly.address.location
        //         }
        //     }) : 
        //     null
        // } 

        // {!heatmap ? 
        // <MapPolygon editable={false} polygon={polygon} center={center} /> 
        // : null }

        //     </Container>
        // </Container>
    );
}

export default GisAnalysis;


{/* --------Based on the below logic fillData function is working----- */ }
{/* {props.userFarms.length>0 ? props.userFarms.forEach(ele => fieldOptions.push({text: ele.fieldName, key: ele._id, value: ele.fieldName})) : null} */ }
{/* ---------Here the data is passed on to the dropdowns */ }

{/* {props.userFarms.length>0 ? filledData(props.userFarms) : null} */ }
{/* {console.log(props.userFarms.length>0 ? props.userFarms[0].farmName : "nothing coming")} */ }


{/* { props.heatMap.length>0 ? getHeatData() : null } */ }
{/* {heatmap ? <HeatMap {...props} date={date} indices={indices} selectedField={selectedField} setHeatmap={setHeatmap} /> : null} */ }
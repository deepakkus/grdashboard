import React, {useEffect, useRef, useState} from 'react';

import './HeatMap.scss';
import { Form, Button, Grid } from 'semantic-ui-react';
import { useTranslation } from "react-i18next";
var ee = require('@google/earthengine');

// import ee from '@google/earthengine';

const HeatMap = (props) => {
  const {fieldId, indices, date} = props;
  const { t } = useTranslation();
  const [fieldName, setFieldName] = useState('');

  var value = useRef('map-container');

    const initialize = (mapid = props.imageLink) => {
      //console.log("HeatMap imageId ----> ",props.imageLink);
        var tri = []
        var center = {}
        props.userFarms.forEach(element => {
            if(element._id === props.fieldId){
                element.location.forEach(elem => {
                  tri.push({
                    lat: elem[0],
                    lng: elem[1]
                  });
                });
                center = {
                  lat: element.address.location[0],
                  lng: element.address.location[1]
                }
                setFieldName(element.farmName);
            }
        });


        // Get a reference to the placeholder DOM element to contain the map.
        const mapContainerEl = value.current;

        // Create an interactive map inside the placeholder DOM element.
        const embeddedMap = new window.google.maps.Map(mapContainerEl, {
          // Pan and zoom initial map viewport to Grand Canyon.
          
          center: center,
         
          zoom: 16,
        });

        //var triangleCoords = tri;

        //const userId = `5ee31bf3251a390007577d0d`;
        //const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI1ZWUzMWJmMzI1MWEzOTAwMDc1NzdkMGQiLCJpYXQiOjE1OTUyMjY2ODYsImV4cCI6MTU5NTMxMzA4Nn0.dqJTiyH3eWyP_ODBKmscxNyTYC47vsVPcC_Rjoaw52doGIgmbahrE4NEQP8le27z8_m-_zvdosPHMW1L6OvuGfwF5-O-nS6oeVrTSSu4aSNmIPnb-WYKsWMrWsbtAuBVszNmQHt0tee9q__RZiQajyA4xsTp57hleYto4A5yOp0dglRfZ1krm-OpJca2CPv1YJmkYlfpwmVX-MqT8rH3-5Sjz_Lwm8ME9Q_llKNWhvlwoAA-ZUDQ0UKgA0Qg3GryS7nyzHEp4tiCXVG1IAKfW1Zc86uKj8_5wdkeexmjrKg66XExsVAU6sdnKZw6orMHZq8E-AWg9SUooYlwp0vp4g`;

        // Create a new tile source to fetch visible tiles on demand and displays them on the map.
        const tileSource = new ee.layers.EarthEngineTileSource({
          mapid,
          // headers: {
          //   Authorization: `Bearer ${token} ${userId}`,
          // }
        });
        const overlay = new ee.layers.ImageOverlay(tileSource
        //   ,{
        //   headers: {
        //     Authorization: `Bearer ${token} ${userId}`,
        //   }
        // }
        );
        embeddedMap.overlayMapTypes.push(overlay);

        var triangleCoords = tri;


        var polygon = new window.google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: "#000000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#000000",
          fillOpacity: 0
        });

        polygon.setMap(embeddedMap);
      };


      useEffect(() => {
        document.title = t(props.title);

        // initialize("projects/earthengine-legacy/maps/d3ef8aa1b1430b7bbf43efbdaae6401e-7a236e0521e36e7a3978bd847aba5a9b")
        // initialize("projects/earthengine-legacy/maps/6a3491205e64bc2f83312890a8cf5b00-3d06386803680a234e8ca7e526a922d3");
        //--> initialize("projects/earthengine-legacy/maps/b531ed406e8611ae2d8a500ef46f6dea-b85a4fd6d1e016d46ce716291934e83a");
        initialize();
      
      }, [props.title]);
      const selectedDate = props.date ? props.date.toString() : 'date';
      // console.log(props.date)
    return(
      <>
        <div className="value-container">
          <Grid columns={1}>
            
            <Grid.Row className="mx-0">
              <Grid.Column>
                <div className="form-wrapper">
                  <Form className="heatmap-form">
                    <Form.Field>
                        <label style={{color: "#A5B9AB", fontSize : "14px", textTransform: "uppercase"}}>{t("common:Selected Area")}</label>
                        <label style={{backgroundColor: 'white', marginBottom:'10px', 
                              marginTop: '10px'  , textDecorationColor: 'black',
                              paddingBottom: '10px', paddingTop: '10px', fontSize: "14px", textTransform:"uppercase"}}>
                            {fieldName}
                          </label>
                    </Form.Field>
                    <Form.Field>
                        <label style={{color: "#A5B9AB", fontSize : "14px", textTransform: "uppercase"}}>{t("common:Selected Indices")}</label>
                        <label style={{backgroundColor: 'white', marginBottom:'10px', 
                              marginTop: '10px'  , textDecorationColor: 'black',
                              paddingBottom: '10px', paddingTop: '10px', textTransform: "uppercase", fontSize: "14px"}}>
                            {props.indices}
                          </label>
                    </Form.Field>
                    <Form.Field>
                        <label style={{color: "#A5B9AB", fontSize : "14px", textTransform: "uppercase"}}>{t("common:Selected Date")}</label>
                        <label style={{backgroundColor: 'white', marginBottom:'10px', 
                                marginTop: '10px'  , textDecorationColor: 'black',
                                paddingBottom: '10px', paddingTop: '10px', textTransform: "uppercase", fontSize: "14px"}}>
                            {selectedDate}
                        </label>
                    </Form.Field>
                    <Button fluid color='green' className="form-button">{t("common:Download")}</Button>
                    <Button fluid color='green' onClick={(e) => props.setHeatmap(false)} className="my-2 form-button">{t("common: Generate New HeatMap")}</Button>
                  </Form>
                </div>
              </Grid.Column>
            </Grid.Row>
          
          
          </Grid>            
        </div> 

        <div className="map-container" ref={value}>
          {/* {initialize("projects/earthengine-legacy/maps/d3ef8aa1b1430b7bbf43efbdaae6401e-7a236e0521e36e7a3978bd847aba5a9b") */}
        </div>
      </>
    )
}

export default HeatMap;
import MapTurf from '../../components/MapTurf/mapturf';
import 'leaflet/dist/leaflet.css';
import React, { Component } from "react";
import {
  area
} from '../../components/MapTurf/modulesturf';
import 'leaflet-draw';
import {
  Grid,
  GridRow,
  Button,
  Input,
} from "semantic-ui-react";
import "./compeleteProfile.scss";
import { connect } from "react-redux";
import sgLogo from "../../images/LOGO.svg";
import { Select } from "semantic-ui-react";

const selectSoilType = [
  { key: "Slit", value: "Slit", text: "Slit" },
  { key: "Clay", value: "Clay", text: "Clay" },
  { key: "Loam", value: "Loam", text: "Loam" },
  { key: "Peat", value: "Peat", text: "Peat" },
];
class compeleteProfile extends Component {
  state= {
    area: 0,
    polygon: [],
    selectSoilType: [],
    selectTerrainType: [],
    selectWaterSource: []
  }

  fillSelect = (optionsType) => {
    if(optionsType === "soil"){
      const soilOptions = [];
      const soiltypes = this.props.soiltypes;
      for ( var index in soiltypes){
        const selectOption = { key: soiltypes[index]._id, value: soiltypes[index].name, text: soiltypes[index].name };
        soilOptions.push(selectOption);
      }
      return(soilOptions);  
    }
    else if(optionsType === "terrain"){
      const terrainOptions = [];
      const terraintypes = this.props.terraintypes;
      for ( var index in terraintypes){
        const selectOption = { key: terraintypes[index]._id, value: terraintypes[index].name, text: terraintypes[index].name };
        terrainOptions.push(selectOption);
      }
      return(terrainOptions);
    }
    else if(optionsType === "watersource"){
      const waterSourceOptions = [];
      const watersources = this.props.watersources;
      for ( var index in watersources){
        const selectOption = { key: watersources[index]._id, value: watersources[index].name, text: watersources[index].name };
        waterSourceOptions.push(selectOption);
      }  
      return(waterSourceOptions);
    }
    else{
      return({key: 0, value: "No Options", text: "No Options"});
    }
  }

  calculateArea = (geoJson) => {
    const polygonarea = area.default(geoJson)/4046.86;
    this.setState({area: polygonarea});
  }

  createPolygon = (array, pts) => { 
  const polygon = [];
  for( var index in array){
    const pt = [array[index][0], array[index][1]]
    polygon.push(pt);
  }
  this.setState({polygon})
  this.calculateArea(pts)
  }

render(){
  return (
    <div className="complelet-profile">
      <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <div>
                <div className="top">
                  <a>
                    <img className="iclogo" src={sgLogo} alt="logo" />
                  </a>
                  <h5 className="ml-3 pt-2">sensegrass</h5>
                </div>
                <Grid className="body">
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <div>
                        <h6 className="m-4  ">enter farm details</h6>
                        <Input placeholder="Location" />
                        <h6 className="m-4 ">selected farm area is</h6>
                        <h1 className="green">{Math.ceil(this.state.area * 100)/100} acres</h1>
                        <h6 className="mb-3 "> free up to 5 acres</h6>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <GridRow columns={2}>
                    <Grid.Column>
                      <h6>select soil type </h6>
                      <Select
                        className="m-2 select"
                        placeholder="Slit"
                        options={this.fillSelect("soil")}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <h6>terrain type</h6>
                      <Select
                        className="m-2 select"
                        placeholder="Plain"
                        options={this.fillSelect("terrain")}
                      />
                      <div>
                        <h6>water source</h6>
                        <Select
                          className="m-2 select"
                          placeholder="underGround"
                          options={this.fillSelect("watersource")}
                        />
                      </div>
                      <Button color="green" className="bttn">Next</Button>
                    </Grid.Column>
                  </GridRow>
                </Grid>
              </div>
            </Grid.Column>
              <Grid.Column width={10}>
                <MapTurf createPolygon={this.createPolygon}/> 
               {/* <Grid.Column width={10} id='map' className='img'> */}
              </Grid.Column>
          </Grid.Row>
        </Grid>
    </div>)}
}

const mapStateToProps = (state) => {
  return {
    soiltypes: state.lookup.soiltypes,
    terraintypes: state.lookup.terraintypes,
    watersources: state.lookup.watersources
    //ranges: state.sensors.ranges,
  };
};

export default connect(mapStateToProps)(compeleteProfile);
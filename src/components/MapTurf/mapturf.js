import React, {Component} from 'react';
import {Map, Marker, Circle, TileLayer, FeatureGroup} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import './mapturf.scss'

class MapTurf extends Component{
  _onEdited = (e) => {
    let numEdited = 0;
    e.layers.eachLayer( (layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);
    this._onChange();
  }

  _onCreated = (e) => {
    let type = e.layerType;
    let layer = e.layer;
    if (type === 'polygon') {
      //console.log("getLanLngs", layer.getLatLngs())
      //var seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs());
      //console.log('area',seeArea);
    }
    else {
      console.log("_onCreated: something else created:", type, e);
    }
    const array = e.layer.editing.latlngs[0][0];
    const polygon = [];
    for( var index in array){
      const pt = [array[index].lat, array[index].lng]
      polygon.push(pt);
    }
    // Do whatever else you need to. (save to db; etc)
    //this._onChange();
    console.log("polygon to container state", layer.toGeoJSON())
    this.props.createPolygon(polygon, layer.toGeoJSON());
  }

  _onDeleted = (e) => {
    let numDeleted = 0;
    e.layers.eachLayer( (layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);
    //this._onChange();
  }

  _onMounted = (drawControl) => {
    console.log('_onMounted', drawControl);
  }

  _onEditStart = (e) => {
    console.log('_onEditStart', e);
  }

  _onEditStop = (e) => {
    console.log('_onEditStop', e);
  }

  _onDeleteStart = (e) => {
    console.log('_onDeleteStart', e);
  }

  _onDeleteStop = (e) => {
    console.log('_onDeleteStop', e);
  }
  render(){
    var center = [-33.8650, 151.2094];
  return(
    <Map className="map" center={center} zoom={12}>
       <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors">
      </TileLayer>
      <Marker position={center}>
      </Marker>
      <FeatureGroup>
        <EditControl
          position='topright'
          onEdited={this._onEdited}
          onCreated={this._onCreated}
          onDeleted={this._onDeleted}
          draw={{
            polygon: {
              allowIntersection: false, // Restricts shapes to simple polygons
              drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
              },
              shapeOptions: {
                color: '#97009c'
              }
            },
    // disable toolbar item by setting it to false
            polyline: false,
            circle: false, // Turns off this drawing tool
            rectangle: false,
            marker: false,
    }}/>
        <Circle center={[51.51, -0.06]} radius={200} />
      </FeatureGroup>
    </Map>
  );
}
}
{/* <Polygon color="purple" positions={multiPolygon} /> */}

export default MapTurf;
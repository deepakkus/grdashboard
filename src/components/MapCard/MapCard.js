import React, { Component } from "react";
import { connect } from "react-redux";

import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import SensorIcon from "../../images/SensorIcon.png";
import { Segment } from "semantic-ui-react";
import "./MapCard.scss";

class MapCard extends Component {
  state = {
    greenIcon: {
      lat: 35.787449,
      lng: -78.6438197,
    },
    redIcon: {
      lat: 35.774416,
      lng: -78.633271,
    },
    orangeIcon: {
      lat: 35.77279,
      lng: -78.652305,
    },
    zoom: 11,
  };

  sensorIcon = L.icon({
    iconUrl: SensorIcon,
    iconSize: [40, 50], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -86],
  });

  render() {
    let { sensors, match } = this.props;
    // sensors = [];
    // if (sensors) return sensor;
    let sensor = sensors.filter(
      (sensor) => sensor.deviceId === match.params.id
    )[0];
    // sensor = {};
    const defaultPositionCenter = [40.7128, -74.006];

    const positionSensorCenter = [
      sensor && sensor.location.latitude,
      sensor && sensor.location.longitude,
    ];
    return sensor ? (
      <Segment raised className="p-0 map-segment">
        <Map
          className="map-card"
          center={positionSensorCenter}
          // center={positionGreenIcon}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution="google"
            url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
          />
          {/* <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}

          {sensors &&
            sensors.map((sensor) => (
              <Marker
                key={sensor.deviceId}
                position={[sensor.location.latitude, sensor.location.longitude]}
                icon={this.sensorIcon}
              >
                <Popup
                // onOpen={() => {
                //   this.props.history.push(`/sensors/${sensor.deviceId}`);
                // }}
                >
                  {/* deviceId:{sensor.deviceId} */}
                  <br />
                  lat:{sensor.location.latitude}
                  <br />
                  lon:{sensor.location.longitude}
                </Popup>
              </Marker>
            ))}
        </Map>

        {/* <Popup
          content="Add users to your feed"
          trigger={<Button icon="add" />}
        /> */}
      </Segment>
    ) : (
      <Segment raised className="p-0">
        <Map className="map-card" center={defaultPositionCenter} zoom={6}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => ({
  sensors: state.sensors.sensormeasures,
});

export default connect(mapStateToProps)(MapCard);

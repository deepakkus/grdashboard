import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import "./ActiveSensor.scss";
import { MdBatteryFull } from "react-icons/md";
import { AiFillSignal } from "react-icons/ai";

const firstSensorId = "513cf030-a7da-11ea-b67b-0a70eb6619c4";

export default function Sensor({ sensorData }) {
  // console.log(sensorData);
  const hw_version = sensorData.device.hw_version;
  const battery = sensorData.device.battery;
  const signal = sensorData.device.signal;
  const lat = sensorData.location.latitude;
  const lon = sensorData.location.longitude;
  const active = sensorData.active;

  return (
    <div className="sensor mr-2">
      <Segment raised className="segment pr-4">
        <div className="title ">
          <h6 className="activeName"> {hw_version} </h6>
          <p className="lon_lat">
            lat:{lat} long:{lon}
          </p>
        </div>
        <div className="icons row ">
          <div className="mr-3">
            <p className="icon block font-xs mr-1">{signal}</p>
            <AiFillSignal className="icon block " />
          </div>
          <div>
            <p className="icon block font-xs">{battery}%</p>
            <MdBatteryFull className="icon block" />
          </div>
        </div>
      </Segment>
    </div>
  );
}

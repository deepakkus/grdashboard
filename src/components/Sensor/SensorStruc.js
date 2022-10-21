import React from "react";
import { withRouter } from "react-router-dom";
import { MdBatteryFull, MdLink } from "react-icons/md";
import { AiFillSignal } from "react-icons/ai";
import "./ActiveSensor.scss";

function SensorStruc({ sensorData }) {
  // console.log(sensorData);
  const hw_version = sensorData.device.hw_version;
  const battery = sensorData.device.battery;
  const signal = sensorData.device.signal;
  const lat = sensorData.location.latitude;
  const lon = sensorData.location.longitude;
  const active = sensorData.active;

  return (
    <div>
      <div className="segment pl-3 pr-4 mr-2 ">
        <div className="title">
          <h5 className="name "> {hw_version} </h5>
          {active && (
            <p className="font-xs">
              lat:{lat} long:{lon}
            </p>
          )}
        </div>
        <div className="icons row">
          <div className="mr-3">
            <p className="icon block font-xs mr-1">{signal} </p>
            <AiFillSignal className="icon block " />
          </div>
          <div>
            <p className="icon block font-xs">{battery}%</p>
            <MdBatteryFull className="icon block" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SensorStruc);

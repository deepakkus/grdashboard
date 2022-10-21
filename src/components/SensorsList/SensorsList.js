import React, { useState, useEffect } from "react";
import "./SensorsList.scss";
//import ActiveSensor from "../Sensor/ActiveSensor";
import Sensor from "../Sensor/Sensor";
import { Loader } from "semantic-ui-react";
import { connect } from "react-redux";

const initialSensor = [
  {
    name: "-",
    device: {
      battery: "-",
      hw_version: "-",
      signal: "-",
    },
    location: { latitude: "-", longitude: "-" },
  },
];

const SensorsList = ({ sensors }) => {
  const [state, setState] = useState(initialSensor);
  useEffect(() => {
    setState({ sensors: sensors });
  }, [sensors]);

  const modifiedSensors = state.sensors;

  // active sensor func
  const addActiveSensor = (sensorId) => {
    let ActiveSensor = sensors.filter((sensor) => sensor.deviceId === sensorId);

    let ActiveSensorIndex = sensors.findIndex(
      (sensor) => sensor.deviceId === sensorId
    );
    let NewActiveSensor = {
      ...ActiveSensor[0],
      active: true,
    };

    // console.log("ActiveSensor", ActiveSensor);
    // console.log("NewActiveSensor", NewActiveSensor);
    // console.log(sensors.findIndex((sensor) => sensor.id === sensorId));

    // replace an item of the Array
    const newSensors = Object.assign([], sensors, {
      [ActiveSensorIndex]: NewActiveSensor,
    });
    // console.log(newSensors);
    setState({ sensors: newSensors });
  };

  console.log("sensors", sensors);
  console.log("modifiedSensors", modifiedSensors);
  if (!modifiedSensors) {
    return <Loader active inline="centered" className="mt-4" />;
  }
  return (
    <div className="sensorsList  ">
      <div className="top">
        <h5>List of Senssors</h5>
        <p>ADD SENSOR</p>
      </div>

      {/* list of sensors */}
      <div className="sensorsContainer">
        {modifiedSensors.length &&
          modifiedSensors.map((sensor, index) => (
            <Sensor
              index={index}
              key={sensor.id}
              sensor={sensor}
              addActiveSensor={addActiveSensor}
            />
          ))}
      </div>
      {/* end of list of sensors */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sensors: state.sensors.sensormeasures,
  };
};

export default connect(mapStateToProps)(SensorsList);

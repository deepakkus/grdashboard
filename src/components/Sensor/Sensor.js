import React from "react";
import { Divider, Segment } from "semantic-ui-react";
import "./ActiveSensor.scss";
import { Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import SensorStruc from "./SensorStruc";
import ActiveSensor from "./ActiveSensor";

function Sensor({ sensor, addActiveSensor, index, match }) {
  // console.log(activeSensor);
  // let activeSensor = false;
  const firstSensorID = "513cf030-a7da-11ea-b67b-0a70eb6619c4";

  return (
    <div className="sensor mt-4 ml-3">
      {/* <Link className="link" onClick={() => addActiveSensor(sensor.id)}>
        <SensorStruc sensorData={sensor} />
      </Link> */}
      <Link
        className="link"
        to={"/sensors/" + sensor.deviceId}
        onClick={() => addActiveSensor(sensor.deviceId)}
      >
        {/* {sensor.active ? ( */}
        {sensor.active || (match.params.id === firstSensorID && index == 0) ? (
          <ActiveSensor sensorData={sensor} />
        ) : (
          <SensorStruc sensorData={sensor} />
        )}
      </Link>
      {/* <Link className="link" onClick={() => addActiveSensor(sensor.id)}>
        {sensor.active ? (
          <Segment>
            <SensorStruc sensorData={sensor} />
          </Segment>
        ) : (
          <SensorStruc sensorData={sensor} />
        )}
      </Link> */}
    </div>
  );
}
export default withRouter(Sensor);

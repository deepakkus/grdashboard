import React, { Component } from "react";
import { connect } from "react-redux";
import SensorTable from "../../components/SensorTable/sensortable";
import { Segment, Container, Grid } from "semantic-ui-react";
// import Sensor from "../../components/Sensor/Sensor";

class SenseMidSection extends Component {
  selected(id) {
    let sensors = this.props.sensors;
    const sensor = sensors.filter((sensor) => {
      return sensor.deviceId === id;
    });
    return sensor[0];
  }

  render() {
    return (
      <Container fluid>
        <Segment raised className="SenseMidSection">
          <Grid>
            <Grid.Column className="p-0 m-0">
              {/* <Grid.Column> */}
              {/* <SensorUpper sensor={this.selected(this.props.match.params.id)} /> */}
              <SensorTable sensor={this.selected(this.props.match.params.id)} />
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sensors: state.sensors.sensormeasures,
  };
};

export default connect(mapStateToProps)(SenseMidSection);

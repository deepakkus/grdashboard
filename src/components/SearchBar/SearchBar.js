import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Icon, Grid, Search, Segment, Input, Responsive } from "semantic-ui-react";
import TabletProfileView from "../tablet-view/tablet-view"
import "./SearchBar.scss";
import { connect } from "react-redux";
import { getUserDevicesOptions } from "../../actions/devices";

export class SearchBar extends Component {
  state = {
    sensors: [
      { name: "sensor1", id: 1 },
      { name: "sensor2", id: 2 },
    ],
    notifications: [{ notify: "notify1" }, { notify: "notify2" }],
  };

  getTitle(title) {
    const children = [];

    // console.log("deviceTypes", this.props.devicetypes);
    if (this.props.devicetypes) {
      this.props.devicetypes.map((devicetype) => {
        // TODO pass devicetypes lookup names here
        children.push({
          key: devicetype._id,
          text: devicetype.name,
          value: devicetype._id,
          content: (
            <Link
              className="link"
              // to={"/sensors/" + devicetype._id}
              onClick={() =>
                this.props.getUserDevicesOptions(
                  this.props.userDevices,
                  devicetype._id
                )
              }
            >
              {devicetype.name}
            </Link>
          ),
        });
      });
    }
    if (this.props.devicetypes && this.props.devicetypes.length && this.props.userDevices && this.props.userDevices.length &&
      this.props.devices && this.props.devices.UserDevicesOptions && this.props.devices.UserDevicesOptions.length === 0
      && title === "/sensors/:id") {
      const deviceTypeId = this.props.devicetypes[0]._id;
      this.props.getUserDevicesOptions(
        this.props.userDevices,
        deviceTypeId
      );
    }
    const defaultOption = {
      key: "devices",
      text: "devices",
      value: "devices",
      content: "devices",
    };
    // console.log(title);
    console.log("children", children);
    switch (title) {
      // case "/": this.props.history.push("dashboard");break;
      case "/dashboard":
        return <p> Dashboard</p>;
        break;
      case "/cropManagement":
        return <p> Crop Management </p>;
        break;
      case "/gisAnalysis":
        return <p> GisAnalysis </p>;
        break;
      case "/settings":
        return <p> Settings </p>;
        break;
      case "/":
        return <p> Home </p>;
        break;
      case "/sensors":
        return <p> Sensors </p>;
        break;
      case "/sensors/:id":
        return this.props.devicetypes.length ? (
          <Dropdown
            inline
            header="Devices"
            options={children}
            defaultValue={children[0].value}
            
          />
        ) : (
          <p>no devices found</p>
        );
      default:
        return <p>Something Went Wrong</p>;
    }
    // return title="/dashboard" ? (
    //   <p> Dashboard</p>
    // ) : (
    //   <Dropdown text="Sensors" options={children}></Dropdown>
    // );
  }

  render() {
    // console.log(this.props);    
    return (
      // <Container fluid className="SearchBar">
      //   <Container fluid floated="left" textAlign="left">
      //     <h3>{this.getTitle(this.props.match.path)}</h3>
      //   </Container>
      //   <Container fluid floated="right" textAlign="right">
      //     <Grid>
      //       <Grid.Column width="14">
      //         <Search />
      //       </Grid.Column>
      //       {/* <Input icon="search" placeholder="Search..." /> */}
      //       {/*<Input placeholder="Search..." />*/}
      //       <Grid.Column width="2">
      //         <Icon name="bell" className="ml-4" />
      //       </Grid.Column>
      //     </Grid>
      //     {/*<Icon name="bell" className="ml-4" />*/}
      //   </Container>
      // </Container>


      <div>
        <Responsive minWidth={768} maxWidth={1023.98}>
          <Grid container columns={2}>
            <Grid.Row  className="page-header ml-4">
              <Grid.Column width={4}>
                <h3 className="pl-3">{this.getTitle(this.props.match.path)}</h3>
              </Grid.Column>
              <Grid.Column container width={8}>
                <div className="searchbar">
                  <Input icon="search" placeholder="Search"/>
                  <Icon  name="bell" className="bell-icon"/>
                  {/* <TabletProfileView></TabletProfileView> */}
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>


        <Responsive minWidth={1024}>
          <Grid container columns={2}>
            <Grid.Row  className="page-header ml-3">
              <Grid.Column width={8}>
                <h3 className="pl-3 page-title">{this.getTitle(this.props.match.path)}</h3>
              </Grid.Column>
              <Grid.Column  width={8} className="search-container">
                <div className="searchbar">
                  <Input icon="search" placeholder="Search"/>
                  <Icon  name="bell" className="bell-icon"/>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </div>

      

    );
  }
}
const mapStateToProps = (state) => {
  return {
    title: "SearchBar",
    devicetypes: state.lookup.devicetypes,
    userDevices: state.devices.userDevices,
  };
};
export default connect(mapStateToProps, { getUserDevicesOptions })(SearchBar);

// export default SearchBar;

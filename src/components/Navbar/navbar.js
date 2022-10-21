import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import sgLogo from "../../images/LOGO.svg";
import farmer from "../../images/farmer.svg";

import DashLogo from "../../images/icons/icondashboard.js";
import LeafLogo from "../../images/icons/iconleaf.js";
import SensorsLogo from "../../images/icons/iconsensors.js";
import GlobalLogo from "../../images/icons/iconglobal.js";
import SettingsLogo from "../../images/icons/iconsettings.js";

import "./navbar.scss";

class Navbar extends Component {
  //color: '#1A960A' green from adobe

  state = {
    activeItem: this.props.active,
    activecolor: "green",
    color: "gray",
    defaultsensor: this.props.defaultsensor,
  };

  /**
   * On Icon Click modify active item
   * Wraped by Link Route
   */

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  /**
   * Change Icon Color of the active Item
   */
  setIconColor = (name) => {
    return name === this.state.activeItem
      ? this.state.activecolor
      : this.state.color;
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div className="nav center">
        <Menu icon pointing secondary vertical>
          <div className="topLogo">
            <img className="iclogo" src={sgLogo} alt="logo" />
          </div>

          <div className="menuItems">
            <Link to="/dashboard">
              <Menu.Item
                icon
                name="dashboard"
                color="green"
                active={activeItem === "dashboard"}
                onClick={this.handleItemClick}
                
              >
                <DashLogo
                  id="dashboard"
                  color={this.setIconColor("dashboard")}
                />
              </Menu.Item>
            </Link>

            <Link to="/cropManagement">
              <Menu.Item
                name="cropManagement"
                color="green"
                active={activeItem === "cropManagement"}
                onClick={this.handleItemClick}
              >
                <LeafLogo color={this.setIconColor("cropManagement")} />
              </Menu.Item>
            </Link>

            <Link
              // to="/sensors"
              to={`/sensors/${
                this.props.defaultsensor ? this.props.defaultsensor : ""
              }`}
            >
              <Menu.Item
                name="sensors"
                color="green"
                active={activeItem === "sensors"}
                onClick={this.handleItemClick}
              >
                <SensorsLogo color={this.setIconColor("sensors")} />
              </Menu.Item>
            </Link>

            <Link to="/gisAnalysis">
              <Menu.Item
                name="gisAnalysis"
                color="green"
                active={activeItem === "gisAnalysis"}
                onClick={this.handleItemClick}
              >
                <GlobalLogo color={this.setIconColor("gisAnalysis")} />
              </Menu.Item>
            </Link>

            <Link to="/settings">
              <Menu.Item
                name="settings"
                color="green"
                active={activeItem === "settings"}
                onClick={this.handleItemClick}
              >
                <SettingsLogo color={this.setIconColor("settings")} />
              </Menu.Item>
            </Link>
          </div>
          <div className="bottomLgo">
            <img className="icfarmer" src={farmer} alt="farmer" />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Navbar;

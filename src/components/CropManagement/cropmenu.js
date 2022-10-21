import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
// import { withTranslation } from 'react-i18next';
import { useTranslation } from 'react-i18next';
// class CropMenu extends Component {
//color: '#1A960A' green from adobe

//   state = {
// //    activeItem: this.props.active,
//     activecolor: "green",
//     color: "gray",
//     defaultcrop: "current",
//   };

/**
 * On Icon Click modify active item
 * Wraped by Link Route
 */
const handleItemClick = (e, { name }) => {
  //    this.setState({ activeItem: name });
  // changeActiveMenu(name);
};

const CropMenu = ({ menuActive, changeActiveMenu }) => {
  const { t } = useTranslation("crop-management")
  const activeItem = menuActive;
  return (
    <div className="cropMenu">
      <Menu icon pointing secondary>
        {/* <div className="cropMenuItems"> */}
        {/* <Link to="/current"> */}
        <Menu.Item
          name="current"
          color="green"
          active={activeItem === "current"}
          onClick={() => changeActiveMenu("current")}
        >
          {t('menu-current')}
        </Menu.Item>
        {/* </Link> */}

        {/* <Link to="/past"> */}
        <Menu.Item
          name="past"
          color="green"
          active={activeItem === "past"}
          onClick={() => changeActiveMenu("past")}
        >
          {t('menu-past')}
        </Menu.Item>
        {/* </Link> */}
      </Menu>
    </div>
  );
}

export default CropMenu;

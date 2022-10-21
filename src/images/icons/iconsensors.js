import React, { Component } from "react";
import { string, number } from "prop-types";

class SensorsLogo extends Component {
  render() {
    const { color } = this.props;
    return (
      <svg
        id="iconsensors"
        data-name="Component 22 – 1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 25 25"
      >
        <path
          id="Path_2033"
          data-name="Path 2033"
          d="M19.667,11.333H11.333v8.333h8.333Zm-2.778,5.556H14.111V14.111h2.778ZM28,14.111V11.333H25.222V8.556a2.786,2.786,0,0,0-2.778-2.778H19.667V3H16.889V5.778H14.111V3H11.333V5.778H8.556A2.786,2.786,0,0,0,5.778,8.556v2.778H3v2.778H5.778v2.778H3v2.778H5.778v2.778a2.786,2.786,0,0,0,2.778,2.778h2.778V28h2.778V25.222h2.778V28h2.778V25.222h2.778a2.786,2.786,0,0,0,2.778-2.778V19.667H28V16.889H25.222V14.111Zm-5.556,8.333H8.556V8.556H22.444Z"
          transform="translate(-3 -3)"
          fill={color}
        />
      </svg>
    );
  }
}
SensorsLogo.propTypes = {
  color: string,
  size: number,
};

SensorsLogo.defaultProps = {
  color: "#d0d0d0",
  size: 20
};

export default SensorsLogo;

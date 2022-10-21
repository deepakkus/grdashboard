import React,{Component} from "react";
import {string, number} from "prop-types";
import './nav-icons.scss'
class DashLogo extends Component{
  render(){
    const {color, size} = this.props;
    return(
      <svg id="icondashboard" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 25 25">
        <path id="Path_2022" data-name="Path 2022" d="M3,16.889H14.111V3H3ZM3,28H14.111V19.667H3Zm13.889,0H28V14.111H16.889Zm0-25v8.333H28V3Z" transform="translate(-3 -3)" fill={color}/>
      </svg>
    );
  }
}

DashLogo.propTypes = {
  color: string,
  size: number,
};

DashLogo.defaultProps = {
  color: '#d0d0d0',
  size: 20
};

export default DashLogo;

import React,{Component} from "react";
import {string, number} from "prop-types";

class LeafLogo extends Component{
  render(){
    const {color, size} = this.props;
    return(
<svg id="iconleaf" data-name="Component 21 – 1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 25 25">
  <g id="Group_47" data-name="Group 47">
    <path id="Path_2020" data-name="Path 2020" d="M7.2,10.329a10.942,10.942,0,0,0-.031,15.44,25.287,25.287,0,0,1,11.5-12.392A24.929,24.929,0,0,0,10.25,27.941,10.944,10.944,0,0,0,22.672,25.8C28.109,20.362,29,4,29,4S12.641,4.891,7.2,10.329Z" transform="translate(-4 -4)" fill={color}/>
  </g>
</svg>
   );
  }
}

LeafLogo.propTypes = {
  color: string,
  size: number,
};

LeafLogo.defaultProps = {
  color: '#d0d0d0',
  size: 20
};

export default LeafLogo;

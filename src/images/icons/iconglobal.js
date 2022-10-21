import React,{Component} from "react";
import {string, number} from "prop-types";

class GlobalLogo extends Component{
  render(){
    const {color, size} = this.props;
    return(
<svg id="iconglobal" data-name="Component 23 – 1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 25 25">
  <path id="Path_2034" data-name="Path 2034" d="M14.5,2A12.5,12.5,0,1,0,27,14.5,12.5,12.5,0,0,0,14.5,2ZM13.25,24.413A9.986,9.986,0,0,1,4.5,14.5a10.147,10.147,0,0,1,.263-2.238L10.75,18.25V19.5a2.507,2.507,0,0,0,2.5,2.5Zm8.625-3.175A2.48,2.48,0,0,0,19.5,19.5H18.25V15.75A1.254,1.254,0,0,0,17,14.5H9.5V12H12a1.254,1.254,0,0,0,1.25-1.25V8.25h2.5a2.507,2.507,0,0,0,2.5-2.5V5.238a9.978,9.978,0,0,1,3.625,16Z" transform="translate(-2 -2)" fill={color}/>
</svg>
   );
  }
}

GlobalLogo.propTypes = {
  color: string,
  size: number,
};

GlobalLogo.defaultProps = {
  color: '#d0d0d0',
  size: 20
};

export default GlobalLogo;
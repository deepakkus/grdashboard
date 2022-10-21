import React,{Component} from "react";
import {string, number} from "prop-types";

class SettingsLogo extends Component{
  render(){
    const {color, size} = this.props;
    return(
<svg id="iconsettings" data-name="Component 24 – 1" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 25 25">
  <path id="Path_2032" data-name="Path 2032" d="M24.118,16.124A9.211,9.211,0,0,0,24.2,14.9a7.522,7.522,0,0,0-.091-1.224l2.643-2.057a.639.639,0,0,0,.156-.794L24.4,6.5a.636.636,0,0,0-.768-.286l-3.112,1.25a9.2,9.2,0,0,0-2.109-1.224l-.469-3.307a.63.63,0,0,0-.625-.534h-5a.617.617,0,0,0-.612.534L11.24,6.241A9.4,9.4,0,0,0,9.131,7.465L6.019,6.215a.622.622,0,0,0-.768.286L2.764,10.824a.592.592,0,0,0,.156.794l2.643,2.057a7.244,7.244,0,0,0-.026,2.448L2.894,18.181a.639.639,0,0,0-.156.794l2.5,4.323a.636.636,0,0,0,.768.286l3.112-1.25a9.2,9.2,0,0,0,2.109,1.224l.469,3.307a.64.64,0,0,0,.625.534h5a.607.607,0,0,0,.612-.534l.469-3.307a8.931,8.931,0,0,0,2.109-1.224l3.112,1.25a.622.622,0,0,0,.768-.286l2.5-4.323a.6.6,0,0,0-.156-.794Zm-9.3,3.464A4.688,4.688,0,1,1,19.508,14.9,4.7,4.7,0,0,1,14.821,19.588Z" transform="translate(-2.662 -2.4)" fill={color}/>
</svg>
   );
  }
}

SettingsLogo.propTypes = {
  color: string,
  size: number,
};

SettingsLogo.defaultProps = {
  color: '#d0d0d0',
  size: 20
};

export default SettingsLogo;
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
class DashMidSection extends Component{
render(){
    console.log(this.props);
    return(
    <div className="midcontainer">
    </div>
);
}
}

export default withRouter(DashMidSection); 


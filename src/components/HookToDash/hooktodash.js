import React, { Component } from 'react';
export default class HookToDash extends Component {
    hook(){

    }
    render() {
        return (
            <div>
                {this.props.history.push("dashboard")}
            </div>
        )
    }
}

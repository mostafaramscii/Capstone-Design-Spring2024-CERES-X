import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class Connection extends Component {
    state = { connected: false, ros: null };

    constructor() {
        super();
        this.init_connection();
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        this.state.ros.on("connection", () => {
            console.log("Connection established");
            this.setState({ connected: true });
        });
        this.state.ros.on("close", () => {
            console.log("Connection closed");
            this.setState({ connected: false });
        });
        this.state.ros.connect("ws://192.168.26.203:9090");  
    }

    render() {
        const indicatorStyle = {
            display: 'inline-block',
            height: '15px',
            width: '15px',
            borderRadius: '50%',
            backgroundColor: this.state.connected ? 'green' : 'green',
            marginRight: '10px',
            verticalAlign: 'middle'
        };

        return (
            <Alert variant={this.state.connected ? "success" : "success"} className="text-center m-3 d-flex align-items-center justify-content-center">
                <div style={indicatorStyle}></div>
                <div>{this.state.connected ? "Drone is connected" : "Drone is connected"}</div>
            </Alert>
        );
    }
}

export default Connection;

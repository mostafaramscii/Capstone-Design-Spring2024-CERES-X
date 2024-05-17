import React, { Component } from 'react';
import { Joystick } from 'react-joystick-component';

class Teleoperation extends Component {
    state = { ros: null };

    constructor() {
        super();
        this.init_connection();
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    init_connection() {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.ros = new window.ROSLIB.Ros();
        this.state.ros.on("connection", () => {
            console.log("Connection established");
            this.setState({ connected: true });
        });
        this.state.ros.on("close", () => {
            console.log("Connection failed");
            this.setState({ connected: false });
        });
        this.state.ros.connect("ws://192.168.26.203:9090");
    }

    handleMove(event) {
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/tb3_1/cmd_vel",
            messageType: "geometry_msgs/Twist"
        });
        var twist = new window.ROSLIB.Message({
            linear: {
                x: event.y,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: -event.x,
            },
        });
        cmd_vel.publish(twist);
    }

    handleStop() {
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: "/tb3_1/cmd_vel",
            messageType: "geometry_msgs/Twist"
        });
        var twist = new window.ROSLIB.Message({
            linear: {
                x: 0,
                y: 0,
                z: 0
            },
            angular: {
                x: 0,
                y: 0,
                z: 0
            }
        });
        cmd_vel.publish(twist);
    }

    render() {
        const joystickContainerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: 'white',
            border: '2px solid black',
            borderRadius: '10px',
            width: 'fit-content',
            margin: 'auto'
        };

        return (
            <div style={joystickContainerStyle}>
                <Joystick
                    size={150}
                    baseColor="#C0C0C0"  // Silver color
                    stickColor="black"
                    move={this.handleMove}
                    stop={this.handleStop}
                />
            </div>
        );
    }
}

export default Teleoperation;

import React, { Component } from "react";
import { Container } from "react-bootstrap";
import * as Three from "three";

class DroneState extends Component {
  state = {
    ros: null,
    x: 0,
    y: 0,
    orientation: 0,
    linear_velocity: 0,
    angular_velocity: 0,
  };

  constructor() {
    super();
    this.init_connection();
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

  componentDidMount() {
    this.getDroneState();
  }

  getDroneState() {
    var pose_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: "/tb3_1/odom",
      messageType: "geometry_msgs/PoseWithCovarianceStamped",
    });

    pose_subscriber.subscribe((message) => {
      this.setState({ x: message.pose.pose.position.x.toFixed(2) });
      this.setState({ y: message.pose.pose.position.y.toFixed(2) });
      this.setState({
        orientation: this.getOrientationFromQuaternion(
          message.pose.pose.orientation
        ).toFixed(2),
      });
    });

    var velocity_subscriber = new window.ROSLIB.Topic({
      ros: this.state.ros,
      name: "/tb3_1/odom",
      messageType: "nav_msgs/Odometry",
    });

    velocity_subscriber.subscribe((message) => {
      this.setState({
        linear_velocity: message.twist.twist.linear.x.toFixed(2),
      });
      this.setState({
        angular_velocity: message.twist.twist.angular.z.toFixed(2),
      });
    });
  }

  getOrientationFromQuaternion(ros_orientation_quaternion) {
    var q = new Three.Quaternion(
      ros_orientation_quaternion.x,
      ros_orientation_quaternion.y,
      ros_orientation_quaternion.z,
      ros_orientation_quaternion.w
    );
    var RPY = new Three.Euler().setFromQuaternion(q);
    return RPY["_z"] * (180 / Math.PI);
  }

  render() {
    const sectionStyle = {
      textAlign: 'center',
      padding: '20px 0',
      margin: '20px 0',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Optional: adds shadow for better distinction
      background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
      borderRadius: '10px', // Slightly more rounded corners
      maxWidth: '500px', // Set a maximum width
      margin: '20px auto' // Center the component horizontally
    };

    const boxStyle = {
      border: '2px solid black',
      padding: '10px',
      borderRadius: '8px',
      color: 'white', // White text for better contrast
      display: 'inline-block', // Ensures the box can be centered
      maxWidth: '100%' // Adjusts to the container width
    };

    return (
      <div style={sectionStyle}>
        <Container>
          <div style={boxStyle}>
            <h4>Position</h4>
            <p>x: {this.state.x}</p>
            <p>y: {this.state.y}</p>
            <p>Orientation: {this.state.orientation}°</p>
            <h4>Velocities</h4>
            <p>Linear Velocity: {this.state.linear_velocity} m/s</p>
            <p>Angular Velocity: {this.state.angular_velocity} rad/s</p>
          </div>
        </Container>
      </div>
    );
  }
}

export default DroneState;

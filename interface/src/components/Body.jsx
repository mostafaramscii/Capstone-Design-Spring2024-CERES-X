import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Connection from './Connection';
import Teleoperation from './Teleoperation';
import Teleoperation2 from './Teleoperation2';
import DroneState from './DRONEState';
import Camera from './Camera';
import Map from './map';
import Button from 'react-bootstrap/Button';
import ArcDesign from './ArcDesign';

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveillanceStatus: 'Surveillance',
            sprayingStatus: 'Spraying'
        };
    }

    handleButtonClick = (task) => {
        this.setState({ [`${task}Status`]: 'Pending' });
        setTimeout(() => {
            this.setState({ [`${task}Status`]: 'Completed' });
        }, 10000);
    };

    render() {
        const { surveillanceStatus, sprayingStatus } = this.state;

        const containerStyle = {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Almost transparent background
            color: '#333',
            width: '100%',
            padding: '20px',
            borderRadius: '8px',
            borderTop: '6px solid rgba(0,0,0,0.1)',
            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', // Lighter shadow
            backdropFilter: 'blur(5px)', // Blur the background behind the container
            zIndex: 1
        };

        const mainTitleStyle = {
            fontFamily: 'Arial, sans-serif',
            fontSize: '2.5rem',
            color: '#fff', // Change text color to white
            textAlign: 'center',
            marginTop: '1rem',
            padding: '10px 0'
        };

        const controlTitleStyle = {
            fontFamily: 'Arial, sans-serif',
            fontSize: '1.8rem',
            color: '#fff', // Change text color to white
            padding: '10px 0',
            textAlign: 'center',
            width: '100%'
        };

        const silverSectionStyle = {
            backgroundColor: 'rgba(192, 192, 192, 0.9)', // A bit more opaque for better readability
            padding: '15px',
            borderRadius: '10px', // Slightly more rounded corners
            color: '#333', // Maintaining the text color for consistency
            textAlign: 'center',
            margin: '10px 0',
            border: '1px solid rgba(255, 255, 255, 0.6)', // Subtle white border for a refined look
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Softer shadow for a sleek appearance
            backdropFilter: 'blur(3px)' // Blurring the background slightly for a frosted glass effect
        };

        const buttonContainerStyle = {
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0'
        };

        const buttonStyle = {
            borderRadius: '20px',
            margin: '0 10px',
            padding: '10px 20px',
            fontSize: '16px',
            transition: 'background-color 0.3s, color 0.3s'
        };

        const buttonStyleContained = {
            ...buttonStyle,
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid white'
        };

        const buttonStyleOutlined = {
            ...buttonStyle,
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid black'
        };

        const imagePath = "https://img.freepik.com/premium-photo/airplanes-spraying-pesticides-farms-ai-technology-generated-image_1112-12042.jpg";

        return (
            <div style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: `url(${imagePath}) no-repeat center center fixed`,
                backgroundSize: 'cover',
                overflowX: 'hidden',
                scrollBehavior: 'smooth'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))', // Gradient overlay
                    zIndex: -1
                }}></div>
                <div style={containerStyle}>
                    <h1 style={mainTitleStyle}>Drone Control</h1>
                    <Container>
                        <Row>
                            <Col>
                                <div style={{ marginBottom: '100px' }}> {/* Increased margin */}
                                    <Connection />
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md={4}>
                                <div style={silverSectionStyle}>
                                    <h3 style={controlTitleStyle}>Throttle</h3>
                                    <Teleoperation />
                                </div>
                            </Col>
                            <Col md={4}>
                                <div style={silverSectionStyle}>
                                    <h3 style={controlTitleStyle}>Pitch</h3>
                                    <Teleoperation2 />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ width: '100%', padding: '0' }}>
                                <DroneState />
                            </Col>
                        </Row>
                        <div style={buttonContainerStyle}>
                            <Button
                                style={buttonStyleContained}
                                onClick={() => this.handleButtonClick('surveillance')}
                            >
                                {surveillanceStatus}
                            </Button>
                            <Button
                                style={buttonStyleContained}
                                onClick={() => this.handleButtonClick('spraying')}
                            >
                                {sprayingStatus}
                            </Button>
                        </div>
                        <Row>
                            <Col md={12}>
                                <Map />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div style={{ marginBottom: '500px' }}> {/* Increased margin */}
                                    <Camera />
                                </div>
                            </Col>
                        </Row>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <ArcDesign />
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Body;

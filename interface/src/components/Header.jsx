import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './header.css';

class Header extends Component {
    state = {}

    render() {
        const centerStyle = {
            textAlign: 'center',
            color: 'black', // Set the text color to black
            width: '100%',
            fontSize: '4rem',  // Increase the font size
            fontWeight: 'bold', // Make the font bold
            letterSpacing: '0.1em', // Add space between characters
            fontFamily: "'Merriweather', serif", // Apply the formal font
            textShadow: '2px 2px 4px silver', // Add a silver border effect
        };

        const navbarStyle = {
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%), 
                              url(https://img.freepik.com/premium-photo/airplanes-spraying-pesticides-farms-ai-technology-generated-image_1112-12042.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',  // Ensure the background image covers the full width
            height: '350px', // Adjust the height as needed for a wider look
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };

        return (
            <Container fluid>
                <Navbar style={navbarStyle} expand="lg" variant='dark'>
                    <h1 style={centerStyle}>CERES - X</h1>
                </Navbar>
            </Container>
        );
    }
}

export default Header;

import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { 
    FaHome, 
    FaInfoCircle, 
    FaUtensils, 
    FaPhone
} from 'react-icons/fa';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);

        this.state = {
          isNavOpen: false
        };
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

    render() {
        return(
            <div>
                <Navbar dark expand="md" className="navbar-sophisticated">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} className="navbar-toggler-custom" />
                        <NavbarBrand className="navbar-brand-sophisticated" href="/">
                            <div className="brand-container">
                                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&h=60&fit=crop" 
                                     height="40" width="50" alt="L'Etoile Restaurant" 
                                     className="brand-logo" />
                                <span className="brand-text">L'Étoile</span>
                            </div>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar className="navbar-collapse-sophisticated">
                            <Nav navbar className="navbar-nav-sophisticated">
                                <NavItem>
                                    <NavLink className="nav-link-sophisticated" to='/home'>
                                        <FaHome className="nav-icon" />
                                        <span className="nav-text">Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link-sophisticated" to='/aboutus'>
                                        <FaInfoCircle className="nav-icon" />
                                        <span className="nav-text">About Us</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link-sophisticated" to='/menu'>
                                        <FaUtensils className="nav-icon" />
                                        <span className="nav-text">Menu</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link-sophisticated" to='/contactus'>
                                        <FaPhone className="nav-icon" />
                                        <span className="nav-text">Contact Us</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default Header;
import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {Link, Redirect, Route} from 'react-router-dom';
import './NavMenu.css';
import jwt from "jwt-decode";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    let token=  localStorage.getItem("Token");
    let renderAddProduct = false;
    let renderSign= false;
    if(token != null) {
      const user = jwt(token);
      renderAddProduct = user.role === "admin";
      renderSign = user.role === "admin" || "customer"
    }
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">ElectroTherapy</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/products">Products</NavLink>
                </NavItem>
                <NavItem  style={{ display: renderAddProduct ? "block" : "none" }}>
                  <NavLink tag={Link} className="text-dark" to="/add-product">Add Product</NavLink>
                </NavItem>
                <NavItem style={{ display: renderSign ? "none" : "block" }}>
                  <NavLink tag={Link} className="text-dark" to="/signup">Sign Up</NavLink>
                </NavItem>
                <NavItem style={{ display: renderSign ? "none" : "block" }}>
                  <NavLink tag={Link} className="text-dark" to="/signin">Sign In</NavLink>
                </NavItem>
                <NavItem style={{ display: renderSign ? "block" : "none" }}>
                  <NavLink tag={Link} className="text-dark" onClick={() => this.logOut()} to="#">Log Out</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }

  logOut() {
    localStorage.removeItem("Token")
    window.location.href="/"
  }
}

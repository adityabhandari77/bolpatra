import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavItem,
  MDBNavbarNav,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
} from "mdbreact";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCollapse() {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }

  return (
    <MDBNavbar color="default-color" dark expand="md" fixed="top">
      <MDBNavbarBrand>
        <strong className="white-text">Navbar</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="/">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/features">Features</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/about">About</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Dropdown</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem href="/admin/dashboard">
                  Action
                </MDBDropdownItem>
                <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <a href="/admin/dashboard">
              <MDBBtn
                variant="outline-info"
                className="font-weight-bold border-2"
              >
                Join us!
              </MDBBtn>
            </a>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}

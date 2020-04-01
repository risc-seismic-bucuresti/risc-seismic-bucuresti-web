import React, { useState } from 'react';
import Logo from '../components/logo/Logo';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from 'reactstrap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <div className="container">
        <NavbarBrand href="/">
          <Logo />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          <NavLink href="map">Harta cladiri</NavLink>
          <NavLink target="_blank" href="https://github.com/alexneamtu/risc-seismic-bucuresti-web/issues">Raporteaza bug</NavLink>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;

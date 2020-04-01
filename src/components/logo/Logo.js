// npm
import React from 'react';

// styling
import logo from './rsb_logo_centered.png';
import './logo.scss';

export default function LogoComponent() {
  return (
    <img src={logo} className="logo" alt="Logo" />
  );
}

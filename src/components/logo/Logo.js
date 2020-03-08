import React from 'react';
import logo from './rsb_logo.png';
import './logo.scss';

console.log(logo);

const Logo = () => <img src={logo} className="logo" alt="Logo" />;

export default Logo;
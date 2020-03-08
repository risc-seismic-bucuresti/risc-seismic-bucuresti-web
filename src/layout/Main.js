import React, { Component } from 'react';
import Search from '../components/search/Search';
import Logo from '../components/logo/Logo';

class Main extends Component {
  render() {
    return (
      <div id="main">
        <Logo />
        <p className="info">Pentru orice problema creati un tichet <a href="https://github.com/alexneamtu/risc-seismic-bucuresti-web/issues">aici</a></p>
        <Search />
      </div>
    );
  }
}

export default Main;
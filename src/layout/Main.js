import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Search from '../components/search/Search';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-159909058-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class Main extends Component {
  render() {
    return (
      <>
        <main role="main" id="main">
          <Navigation />
          <div  className="container">
            <Search />
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default Main;
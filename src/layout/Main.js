import React, { Component } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Search from '../components/search/Search';
import ReactGA from 'react-ga';

import CC from '../components/cookie/CookieConsent';

class Main extends Component {

  componentDidMount() {
    // This needs refactoring
    if (document.cookie.split(';').filter((item) => item.includes('rcl_statistics_consent=true')).length) {
      ReactGA.initialize('UA-159909058-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }

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
        <CC />
      </>
    );
  }
}

export default Main;
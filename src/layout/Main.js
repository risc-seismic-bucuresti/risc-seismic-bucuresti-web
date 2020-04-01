// npm
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

// components
import Navigation from './Navigation';
import Footer from './Footer';
import Search from '../components/search/Search';
import Map from '../components/map/Map';
import Terms from '../components/static/Terms';
import Privacy from '../components/static/Privacy';
import NotFound from '../components/static/NotFound';
import CC from '../components/cookie/CookieConsent';

// services
import cookies from '../services/cookieService';


class Main extends Component {

  componentDidMount() {
    if (cookies.checkCookieValue('rcl_statistics_consent', true)) {
      ReactGA.initialize('UA-159909058-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }

  render() {
    return (
      <>
        <main role="main" id="main">
          <Navigation />
          <div className="container mt-0 mt-md-5">
            <Switch>
              <Route exact path="/" component={Search} />
              <Route exact path="/map" component={Map} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="/privacy-policy" component={Privacy} />
              {/* 404 */}
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </main>
        <Footer />
        <CC />
      </>
    );
  }
}

export default Main;

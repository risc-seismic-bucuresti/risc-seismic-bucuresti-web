import React, { Component } from 'react';
import './Search.scss';
import ResultList from './ResultList';
import BackgroundAnimation from '../static/background-animation/BackgroundAnimation';
import ReactGA from 'react-ga';

import { Input, Button, FormGroup, Label } from 'reactstrap';
import cookies from '../../services/cookieService';

class Search extends Component {
    state = {
      address: '',
      addressNumber: '',
      items: [],
      initial: true,
      error: false,
    };

    componentDidMount() {
      this.addrInput.focus();
    }

    handleOnChange = (evt) => {
      this.setState({
        ...this.state,
        [evt.target.name]: evt.target.value,
      });
    };

    handleSearch = (e) => {
      e.preventDefault();

      if (cookies.checkCookieValue('rcl_statistics_consent', true)) {
        ReactGA.event({
          category: 'User',
          action: 'Clicked Search'
        });
      }

      const address = this.state.address.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      this.makeApiCall(address, this.state.addressNumber);
    };

    makeApiCall = (address, addressNumber) => {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://static.17.155.217.95.clients.your-server.de';
      const searchUrl = `${apiUrl}/routes?address=${address}&number=${addressNumber}`;
      fetch(searchUrl)
        .then(response => {
          this.setState({ initial: false });
          return response.json();
        })
        .then(jsonData => {
          this.setState({ items: jsonData.results });
        }).catch(() => {
          this.setState({ error: true });
        });
    };

    render() {
      return (
        <>
          <BackgroundAnimation />
          <div className="jumbotron jumbotron-fluid search-jumbotron">
            <div className="container">
              <h1>Cauta informatii legate de imobilele aflate pe listele de risc seismic</h1>
              <p className="mt-5 mb-5">România este o ţară cu potenţial seismic ridicat, aspect evidenţiat de studiile de hazard seismic şi de prevederile codului de proiectare seismică P100. Practic, în orice moment se poate produce un cutremur cu magnitudine mai mare de 7 în Zona Seismică Vrancea, la adâncimi între 60 şi 180 km. Şi această zonă nu este singura în care pot avea loc cutremure cu potenţial distructiv.</p>
              <form className="search-form" onSubmit={this.handleSearch}>
                <div className="row">
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail">Strada</Label>
                      <Input
                        ref={(input) => { this.addrInput = input; }}
                        name="address"
                        type="text"
                        placeholder="Ex: Regina Elisabeta"
                        onChange={event => this.handleOnChange(event)}
                        value={this.state.address}
                        required />
                    </FormGroup>
                  </div>
                  <div className="col-3">
                    <FormGroup>
                      <Label for="exampleEmail">Numar</Label>
                      <Input
                        ref={(input) => { this.addrInput = input; }}
                        name="addressNumber"
                        type="number"
                        placeholder="Ex: 55"
                        onChange={event => this.handleOnChange(event)}
                        value={this.state.addressNumber}
                      />
                    </FormGroup>
                  </div>
                </div>

                <div className="row mt-4 justify-content-center">
                  <div className="col-sm-12 col-md-3">
                    <Button block color="primary" size="lg" type="submit" onClick={this.handleSearch} disabled={!this.state.address}>Cauta</Button>
                  </div>
                </div>
              </form>

              <div id="no-results">
                {!this.state.initial && !this.state.items.length ? 'Cladirea nu se afla pe lista de risc seismic.' : ''}
              </div>
              <div id="error">
                {this.state.error ? 'A aparut o problema. Incercati din nou.' : ''}
              </div>
              {this.state.items.length > 0 &&
            <ResultList items={this.state.items} />
              }
            </div>
          </div>
        </>
      );
    }
}

export default Search;

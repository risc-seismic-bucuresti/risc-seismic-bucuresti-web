import React, { Component } from 'react';
import './Search.scss';
import ResultList from './results/ResultList';
// import BackgroundAnimation from '../static/background-animation/BackgroundAnimation';
import ReactGA from 'react-ga';

import { Input, Button, FormGroup, Label, Spinner } from 'reactstrap';
import cookies from '../../services/cookieService';

class Search extends Component {
    state = {
      address: '',
      addressNumber: '',
      items: [],
      initial: true,
      error: false,
      // isLoading: true
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
      // this.setState({isLoading: true});
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
        }).finally(() => {
          // this.setState({isLoading: false});
        });
    };

    render() {
      return (
        <>
          {/* <BackgroundAnimation /> */}
          <div className="jumbotron jumbotron-fluid search-jumbotron">
            <div className="container">
              <h2>Cauta informatii legate de imobilele cu potential risc seismic</h2>
              <p className="my-md-5 my-3">Esti in cautarea unei locuinte noi? Te preocupa siguranta ta si a familiei tale? Poate esti doar curios in ceea ce priveste rezistenta imobilelor din Bucuresti? Intrebarile frecvente pe care si le pun locuitorii unui oras cu potential risc seismic sunt pe cale sa primeasca raspuns. Afla rapid si usor, completand campul de mai jos, daca imobilul care ti-a atras atentia este incadrat pe listele de risc seismic intocmite si actualizate de catre autoritatile publice.</p>
              <form className="search-form mb-3" onSubmit={this.handleSearch}>
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

              <div id="no-results" className="text-success text-center">
                <h4>{!this.state.initial && !this.state.items.length ? 'Cladirea nu se afla pe lista de risc seismic.' : ''}</h4>
              </div>
              <div id="error" className="text-danger">
                {this.state.error ? 'A aparut o problema. Incercati din nou.' : ''}
              </div>
              {this.state.items.length > 0 &&
                <ResultList items={this.state.items} />
              }
              <div className="d-none justify-content-center">
                <Spinner color="primary" /> <Spinner color="primary" /> <Spinner color="primary" />
              </div>
            </div>
          </div>
        </>
      );
    }
}

export default Search;

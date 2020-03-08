import React, { Component } from 'react';
import './Search.scss';
import ReactGA from 'react-ga';

import { Input, Button, FormGroup, Label } from 'reactstrap';

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

      ReactGA.event({
        category: 'User',
        action: 'Clicked Search'
      });

      // const address = this.state.address.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      // const addressArray = address.split(/[^\w-]+|_/);

      // let streetNumber = addressArray.pop();
      // let streetName = addressArray.join(' ');
      // if (!/\d/.test(streetNumber)) {
      //   streetName += ` ${streetNumber}`;
      //   streetNumber = '';
      // }

      this.makeApiCall(this.state.address, this.state.addressNumber);
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
          this.setState({ items: jsonData });
        }).catch(() => {
          this.setState({ error: true });
        });
    };

    render() {
      return (
        <div>
          <form className="search-form mt-5" onSubmit={this.handleSearch}>
            {/* <div className="row">
              <div className="col">
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                  Strada
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    ref={(input) => { this.addrInput = input; }}
                    name="address"
                    type="text"
                    placeholder="Regina Elisabeta"
                    onChange={event => this.handleOnChange(event)}
                    value={this.state.address}
                    required />
                </InputGroup>
              </div>
              <div className="col-3">
                <InputGroup size="lg">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      Numar
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    ref={(input) => { this.addrInput = input; }}
                    name="addressNumber"
                    type="text"
                    placeholder="28"
                    onChange={event => this.handleOnChange(event)}
                    value={this.state.addressNumber}
                  />
                </InputGroup>
              </div>
            </div> */}

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
                    type="text"
                    placeholder="Ex: 28"
                    onChange={event => this.handleOnChange(event)}
                    value={this.state.addressNumber}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row mt-4 justify-content-center">
              <div className="col-sm-12 col-md-3">
                <Button block color="primary" size="lg" onClick={this.handleSearch} disabled={!this.state.address}>Cauta</Button>
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
            <>
              <h3>Rezultate: {this.state.items.length}</h3>
              <div id="items-container">
                {this.state.items.map((item, index) => (
                  <div className="single-item" key={index}>
                    <h3>{item.streetType} {item.address}, {item.addressNumber}</h3>
                    <p className="spaced">Incadrare: {item.buildingRatings[0].seismicRating}</p>
                    <ul>
                      <li>Actualizare: {new Intl.DateTimeFormat('ro-RO', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                      }).format(new Date(item.updatedAt))}</li>
                      <li>Sector: {item.district}</li>
                      <li>Numar apartamente: {item.apartmentNumber}</li>
                      <li>Regim inaltime: {item.heightRegime}</li>
                      <li>An constructie: {item.yearOfConstruction}</li>
                      <li>An expertiza: {item.yearOfExpertise}</li>
                      <li>Expertizat de: {item.expertName}</li>
                      <li>Suprafata: {item.surfaceSize}</li>
                      {item.comments &&
                        <li>Comentarii: {item.comments}</li>
                      }
                    </ul>
                  </div>
                ))}
              </div>
            </>
          }
        </div>
      );
    }
}

export default Search;

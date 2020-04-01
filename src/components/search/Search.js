// npm
import ReactGA from 'react-ga'
import React, { useState } from 'react'
import { Input, Button, FormGroup, Label, Spinner } from 'reactstrap'

// templates
import ResultList from './results/ResultList'
// import BackgroundAnimation from '../static/background-animation/BackgroundAnimation';

// styling
import './Search.scss'

// services
import cookies from '../../services/cookieService'

export default function SearchComponent () {
  const [address, setAddress] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [items, setItems] = useState('')
  const [initial, setInitial] = useState(true)
  const [error, setError] = useState(false)

  const handleAddressInput = e => {
    setAddress(e.target.value)
  }

  const handleAddressNumberInput = e => {
    setAddressNumber(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if (cookies.checkCookieValue('rcl_statistics_consent', true)) {
      ReactGA.event({
        category: 'User',
        action: 'Clicked Search'
      })
    }

    const cleanAddress = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
    makeApiCall(cleanAddress, addressNumber)
  }

  const makeApiCall = (address, addressNumber) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://static.17.155.217.95.clients.your-server.de'
    const searchUrl = `${apiUrl}/routes?address=${address}&number=${addressNumber}`
    fetch(searchUrl)
      .then(response => {
        setInitial(false)
        setError(false)
        return response.json()
      })
      .then(jsonData => {
        setItems(jsonData.results)
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <>
      {/* <BackgroundAnimation /> */}
      <div className="jumbotron jumbotron-fluid search-jumbotron">
        <div className="container">
          <h2>Cauta informatii legate de imobilele cu potential risc seismic</h2>
          <p className="my-md-5 my-3">Esti in cautarea unei locuinte noi? Te preocupa siguranta ta si a
            familiei tale? Poate esti doar curios in ceea ce priveste rezistenta imobilelor din
            Bucuresti? Intrebarile frecvente pe care si le pun locuitorii unui oras cu potential risc
            seismic sunt pe cale sa primeasca raspuns. Afla rapid si usor, completand campul de mai jos,
            daca imobilul care ti-a atras atentia este incadrat pe listele de risc seismic intocmite si
            actualizate de catre autoritatile publice.</p>
          <form className="search-form mb-3" onSubmit={handleSearch}>
            <div className="row">
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Strada</Label>
                  <Input
                    // ref={(input) => {
                    //   this.addrInput = input
                    // }}
                    name="address"
                    type="text"
                    placeholder="Ex: Regina Elisabeta"
                    onChange={handleAddressInput}
                    value={address}
                    required/>
                </FormGroup>
              </div>
              <div className="col-3">
                <FormGroup>
                  <Label for="exampleEmail">Numar</Label>
                  <Input
                    // ref={(input) => {
                    //   this.addrInput = input
                    // }}
                    name="addressNumber"
                    type="number"
                    placeholder="Ex: 55"
                    onChange={handleAddressNumberInput}
                    value={addressNumber}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="row mt-4 justify-content-center">
              <div className="col-sm-12 col-md-3">
                <Button block color="primary" size="lg" type="submit" onClick={handleSearch}
                        disabled={!address}>Cauta</Button>
              </div>
            </div>
          </form>

          <div id="no-results" className="text-success text-center">
            <h4>{!initial && !items.length ? 'Cladirea nu se afla pe lista de risc seismic.' : ''}</h4>
          </div>
          <div id="error" className="text-danger">
            {error ? 'A aparut o problema. Incercati din nou.' : ''}
          </div>
          {items.length > 0 &&
          <ResultList items={items}/>
          }
          <div className="d-none justify-content-center">
            <Spinner color="primary"/> <Spinner color="primary"/> <Spinner color="primary"/>
          </div>
        </div>
      </div>
    </>
  )
}
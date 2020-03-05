import React, {Component} from "react";
import "./Search.css";
import logo from './logo.svg';

class Search extends Component {
    state = {
        address: "",
        addressNumber: "",
        items: [],
        initial: true,
        error: false,
    };

    handleOnChange = (evt) => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value,
        })
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.makeApiCall(this.state.address, this.state.addressNumber);
    };

    makeApiCall = (address, addressNumber) => {
        const apiUrl = process.env.REACT_APP_API_URL || 'https://static.17.155.217.95.clients.your-server.de';
        const searchUrl = `${apiUrl}/routes?address=${address}&number=${addressNumber}`;
        fetch(searchUrl)
            .then(response => {
                this.setState({initial: false});
                return response.json();
            })
            .then(jsonData => {
                this.setState({items: jsonData});
            }).catch(() => {
                this.setState({error: true});
            });
    };

    render() {
        return (
            <div id="main">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Cautare rapida risc seismic Bucuresti</h1>
                <p>Am investit fix 4 ore in proiectul asta. E departe de a fi perfect. Daca vad ca exista interes, mai investesc in el.</p>
                <p>Pentru orice problema creati un tichet <a href="https://github.com/alexneamtu/risc-seismic-bucuresti-web/issues">aici</a></p>
                <br/>
                <form onSubmit={this.handleSearch}>
                    <input
                        name="address"
                        type="text"
                        placeholder="Adresa"
                        onChange={event => this.handleOnChange(event)}
                        value={this.state.address}
                    />
                    <input
                        name="addressNumber"
                        type="text"
                        onChange={event => this.handleOnChange(event)}
                        placeholder="Numar"
                        value={this.state.addressNumber}
                    />
                    <button onClick={this.handleSearch}>Cauta</button>
                </form>

                <div id="no-results">
                    {!this.state.initial && !this.state.items.length ? 'Nu am gasit rezultate.' : ''}
                </div>
                <div id="error">
                    {this.state.error? 'A aparut o problema. Incercati din nou.' : ''}
                </div>
                <div id="items-container">
                    {this.state.items.map((item, index) => (
                        <div className="single-item" key={index}>
                            <h2>{item.street_type} {item.address}, {item.addressNumber}</h2>
                            <h4>{item.buildingRatings[0].seismicRating}</h4>
                            <br/>
                            <ul>
                                <li>Actualizare: {new Intl.DateTimeFormat("ro-RO", {
                                    year: "numeric",
                                    month: "long",
                                    day: "2-digit"
                                }).format(new Date(item.updatedAt))}</li>
                                <li>Sector: {item.district}</li>
                                <li>Numar apartamente: {item.apartmentNumber}</li>
                                <li>Regim inaltime: {item.heightRegime}</li>
                                <li>An constructie: {item.yearOfConstruction}</li>
                                <li>An expertiza: {item.yearOfExpertise}</li>
                                <li>Expertizat de: {item.expertName}</li>
                                <li>Suprafata: {item.surfaceSize}</li>
                                <li>Comentarii: {item.comments}</li>
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default Search;

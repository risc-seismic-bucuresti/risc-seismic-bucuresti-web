import React, {Component} from "react";
import "./Search.css";

class Search extends Component {
    state = {
        address: "",
        addressNumber: "",
        items: []
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
        const searchUrl = `https://risc-seismic-bucuresti.herokuapp.com/routes?address=${address}&number=${addressNumber}`;
        fetch(searchUrl)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                this.setState({items: jsonData});
            });
    };

    render() {
        return (
            <div id="main">
                <h1>Cautare rapida risc seismic Bucuresti</h1>
                <h2>Daca nu se returneaza rezultate din prima, incercati din noi in 30 de secunde.</h2>
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

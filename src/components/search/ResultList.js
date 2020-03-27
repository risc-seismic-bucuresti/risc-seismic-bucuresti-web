import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Card, CardSubtitle, CardHeader, CardColumns, CardBody
} from 'reactstrap';

const Results = ({items}) => {
  // console.log(items);
  return (
  // <h3>Rezultate: {this.state.items.length}</h3>
  // <div id="items-container">
  //   {this.state.items.map((item, index) => (
  //     <div className="single-item" key={index}>
  //       <h3>{item.streetType} {item.address}, {item.addressNumber}</h3>
  //       <p className="spaced">Incadrare: {item.buildingRatings[0].seismicRating}</p>
  //       <ul>
  //         <li>Actualizare: {new Intl.DateTimeFormat('ro-RO', {
  //           year: 'numeric',
  //           month: 'long',
  //           day: '2-digit'
  //         }).format(new Date(item.updatedAt))}</li>
  //         <li>Sector: {item.district}</li>
  //         <li>Numar apartamente: {item.apartmentNumber}</li>
  //         <li>Regim inaltime: {item.heightRegime}</li>
  //         <li>An constructie: {item.yearOfConstruction}</li>
  //         <li>An expertiza: {item.yearOfExpertise}</li>
  //         <li>Expertizat de: {item.expertName}</li>
  //         <li>Suprafata: {item.surfaceSize}</li>
  //         {item.comments &&
  //           <li>Comentarii: {item.comments}</li>
  //         }
  //       </ul>
  //     </div>
  //   ))}
  // </div>
    <>
      <Row className="mb-5">
        <Col>
          <h4>Rezultate: { items.length }</h4>
        </Col>
        <Col className="text-right d-none">
          Afisare: <Button color="link">Coloane</Button> | <Button color="link">Lista</Button>
        </Col>
      </Row>
      <CardColumns className="full">
        {items.map((item, index) => (
          <Card key={index}>
            <CardHeader className="bold">{item.building.streetType} {item.building.address}, {item.building.addressNumber}</CardHeader>
            <CardBody>
              <CardSubtitle color="primary">Incadrare: {item.building.buildingRatings[0].seismicRating}</CardSubtitle>
              <ul className="list-unstyled">
                <li>Actualizare: {new Intl.DateTimeFormat('ro-RO', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit'
                }).format(new Date(item.building.updatedAt))}</li>
                <li>Sector: {item.building.district}</li>
                <li>Numar apartamente: {item.building.apartmentNumber}</li>
                <li>Regim inaltime: {item.building.heightRegime}</li>
                <li>An constructie: {item.building.yearOfConstruction}</li>
                <li>An expertiza: {item.building.yearOfExpertise}</li>
                <li>Expertizat de: {item.building.expertName}</li>
                <li>Suprafata: {item.building.surfaceSize}</li>
                {item.building.comments &&
                  <li>Comentarii: {item.building.comments}</li>
                }
              </ul>
            </CardBody>
          </Card>
        ))}
      </CardColumns>
    </>
  );
};

Results.propTypes = {
  items: PropTypes.array,
};

export default Results;
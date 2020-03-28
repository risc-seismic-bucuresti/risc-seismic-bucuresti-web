import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardSubtitle, CardHeader, CardColumns, CardBody
} from 'reactstrap';

const GridView = ({ items }) => {
  return (
    <CardColumns>
      {items.map((item, index) => (
        <Card key={index}>
          <CardHeader className="font-weight-bold">{item.building.streetType} {item.building.address}, {item.building.addressNumber}</CardHeader>
          <CardBody>
            <CardSubtitle className="text-danger font-weight-bold">Incadrare: {item.building.buildingRatings[0].seismicRating}</CardSubtitle>
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
            <a href={'https://www.google.com/maps/search/?api=1&query=' + item.building.gpsCoordinatesLatitude + ' , ' + item.building.gpsCoordinatesLongitude } target="_blank" rel="noopener noreferrer">Vezi harta</a>
          </CardBody>
        </Card>
      ))}
    </CardColumns>
  );
};

GridView.propTypes = {
  items: PropTypes.array,
};

export default GridView;
import React from 'react';
import PropTypes from 'prop-types';

const ListView = ({items}) => {
  return (
    <div id="items-container">
      {items.map((item, index) => (
        <div className="single-item" key={index}>
          <h3>{item.building.streetType} {item.building.address}, {item.building.addressNumber}</h3>
          <p className="spaced">Incadrare: {item.building.buildingRatings[0].seismicRating}</p>
          <ul>
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
        </div>
      ))}
    </div>
  );
};

ListView.propTypes = {
  items: PropTypes.array,
};

export default ListView;
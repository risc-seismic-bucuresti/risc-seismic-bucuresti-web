// npm
import { LatLng, LatLngBounds } from 'leaflet';
import React, { useEffect, useState } from 'react'
import { Map, TileLayer, CircleMarker, Popup } from 'react-leaflet';

// styling
import './Map.scss';

export default function MapComponent() {
  const zoom = 20;

  const [allMarkers, setAllMarkers] = useState(null);
  const [mapRef] = useState(React.createRef());
  const [markers, setMarkers] = useState([]);

  const makeApiCall = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://static.17.155.217.95.clients.your-server.de';
    const searchUrl = `${apiUrl}/routes?minLat=40&maxLat=50&minLong=20&maxLong=30`;
    try {
      const response = await fetch(searchUrl);
      const r = await response.json();
      return r.results.map(item => {
        const coordinates = new LatLng(item.building.gpsCoordinatesLatitude, item.building.gpsCoordinatesLongitude);
        return {
          coordinates,
          rating: item.building.buildingRatings[0].seismicRating,
          details: item.building,
        };
      });
    } catch(e) {
      return [];
    }
  }

  const displayMarkers = () => {
    const map = mapRef.current.leafletElement;
    if (allMarkers) {
      const markers = allMarkers.filter(m => map.getBounds().contains(m.coordinates));
      setMarkers(prepareMarkers(markers));
    }
  }

  const prepareMarkers = (markers) => {
    return markers.map((item) => (
      <CircleMarker key={item.details.id} center={item.coordinates} className={`marker-${item.rating.toLowerCase()}`}>
        <Popup>
          <strong>{item.details.streetType} {item.details.address}, {item.details.addressNumber}</strong>
          <p className="spaced">Incadrare: {item.details.buildingRatings[0].seismicRating}</p>
          <ul>
            <li>Actualizare: {new Intl.DateTimeFormat('ro-RO', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(new Date(item.details.updatedAt))}</li>
            <li>Sector: {item.details.district}</li>
            <li>Numar apartamente: {item.details.apartmentNumber}</li>
            <li>Regim inaltime: {item.details.heightRegime}</li>
            <li>An constructie: {item.details.yearOfConstruction}</li>
            <li>An expertiza: {item.details.yearOfExpertise}</li>
            <li>Expertizat de: {item.details.expertName}</li>
            <li>Suprafata: {item.details.surfaceSize}</li>
            {item.details.comments &&
            <li>Comentarii: {item.details.comments}</li>
            }
          </ul>
        </Popup>
      </CircleMarker>
    ));
  }

  useEffect(() => {
    (async function() {
      try {
        const bounds = new LatLngBounds(new LatLng(44.4345, 26.1015), new LatLng(44.4365, 26.1035));
        setAllMarkers(await makeApiCall(bounds));
        displayMarkers();
      } catch (e) {
        console.error(e);
      }
    })();
  });

  return (
    <Map
      onMoveEnd={displayMarkers}
      preferCanvas={false}
      ref={mapRef}
      center={new LatLng(44.4355, 26.1025)}
      zoom={zoom}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {markers}
    </Map>
  );
}

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 6.5195242880355755, // Set your desired initial latitude
  lng: 3.3715784558416035 // Set your desired initial longitude
};

export const GooogleMap = () => {
  return (
    <LoadScript googleMapsApiKey={'AIzaSyB8nHjTkFsaU3b4NvYLvctW8HSv5LchjYw'}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10} // Adjust the zoom level as needed
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

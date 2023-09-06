import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import { useLoadScript } from '@react-google-maps/api';
import CarIcon from 'assets/images/car.png';

// firebase imports
import { getDatabase, ref, onValue } from 'firebase/database';

// material-ui
import { styled } from '@mui/material/styles';
import { Button, Input } from '@mui/material';

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px'
});

const SearchInput = styled(Input)({
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  marginRight: '10px',
  flexGrow: 1
});

const SearchButton = styled(Button)({
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 20px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#0056b3'
  }
});

const containerStyle = {
  width: '100%',
  height: '800px'
};

const initialMapCenter = {
  lat: 6.5195242880355755, // Set your desired initial latitude
  lng: 3.3715784558416035 // Set your desired initial longitude
};

export const GooogleMap = () => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: 'AIzaSyB8nHjTkFsaU3b4NvYLvctW8HSv5LchjYw',
  //   libraries: ['places'],
  // });

  const [activeDrivers, setActiveDrivers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState(initialMapCenter);
  const mapRef = useRef(null);

  useEffect(() => {
    // Fetch data from Firebase and format it
    const database = getDatabase();
    const driversRef = ref(database, 'activeDrivers');

    const unsubscribe = onValue(driversRef, (snapshot) => {
      const driversData = snapshot.val();
      if (driversData) {
        const formattedMarkers = Object.keys(driversData).map((driverId) => {
          const driver = driversData[driverId];
          const position = { lat: driver.l[0], lng: driver.l[1] };
          return {
            id: driverId,
            position,
            icon: CarIcon,
            info: {
              title: `Driver ${driverId}`,
              description: `Latitude: ${position.lat}, Longitude: ${position.lng}`
            }
          };
        });
        setActiveDrivers(formattedMarkers);
      }
    });

    // Clean up the Firebase listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handleSearch = () => {
    // Perform location search and update the map's center
    const placesService = new window.google.maps.places.PlacesService(mapRef.current);
    console.log(placesService);

    placesService.textSearch({ query: searchQuery }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const firstResult = results[0];
        const newMapCenter = {
          lat: firstResult.geometry.location.lat(),
          lng: firstResult.geometry.location.lng()
        };
        setMapCenter(newMapCenter);
      } else {
        // Handle the case when no results are found
        console.error('Location not found');
      }
    });
  };

  // const iconSize = { width: 40, height: 40 };

  // if (loadError) return 'Error loading maps';
  // if (!isLoaded) return 'Loading maps';

  return (
    <LoadScript googleMapsApiKey={'AIzaSyB8nHjTkFsaU3b4NvYLvctW8HSv5LchjYw'} libraries={['places']} trafficLayer={true}>
      <div className="map-container">
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search region, location or point..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Search Location</SearchButton>
        </SearchContainer>
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={13} ref={mapRef}>
          {activeDrivers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              icon={{
                url: marker.icon
                // scaledSize: new window.google.maps.Size(iconSize.width, iconSize.height),
              }}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow position={selectedMarker.position} onCloseClick={handleInfoWindowClose}>
              <div>
                <h3>{selectedMarker.info.title}</h3>
                <p>{selectedMarker.info.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

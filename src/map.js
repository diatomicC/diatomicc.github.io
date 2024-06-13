import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, LoadScript, Autocomplete } from '@react-google-maps/api';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import 'bulma/css/bulma.min.css'; // Ensure Bulma is imported
import { firestore } from './firebase-config';  

const containerStyle = {
    width: '80vw', // Change the width as needed
    height: '80vh' // Change the height as needed
  };

const center = {
  lat: 37.532600,
  lng: 127.024612
};

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [nationality, setNationality] = useState('');
  const [like, setLike] = useState('');
  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setSelectedPlace({
        location: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleAddLocation = () => {
    const locationData = {
      location: selectedPlace.location,
      nationality: nationality,
      like: like
    };
    const docRef = doc(firestore, "restaurantlocation", "SZo8h5LU8TWdnLFnuwrW");
    setDoc(docRef, locationData)
      .then(() => {
        console.log('Document successfully written!');
        alert('Added to database');
        setNationality('');
        setLike('');
        setSelectedPlace(null);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        alert('Failed to add to database');
      });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAgegPnXhZ9uz-vsQ4qiQzLWoTaavw0lgM"
      libraries={['places']}
    >
      <div className="section">
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Search a location"
            className="input is-medium"
            style={{ width: 300, marginBottom: 10 }}
          />
        </Autocomplete>
        <div className="map-container" style={{ position: 'relative', height: '100vh', width: '100vw' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {locations.map((loc, index) => (
              <Marker
                key={index}
                position={{ lat: loc.latitude, lng: loc.longitude }}
                icon={{
                  url: `/path/to/${loc.nationality.toLowerCase()}-flag-icon.png`,
                  scaledSize: new window.google.maps.Size(24, 24)
                }}
              />
            ))}
            {selectedPlace && (
              <>
                <Marker
                  position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                />
                <div className="card" style={{ position: 'absolute', top: '10%', left: '25%', zIndex: 10, padding: 10 }}>
                  <div className="card-content">
                    <h2 className="title is-4">Add Location Details</h2>
                    <input
                      value={nationality}
                      onChange={e => setNationality(e.target.value)}
                      className="input is-small"
                      placeholder="Enter nationality"
                      style={{ marginBottom: 10 }}
                    />
                    <input
                      value={like}
                      onChange={e => setLike(e.target.value)}
                      className="input is-small"
                      placeholder="Likes (optional)"
                      style={{ marginBottom: 10 }}
                    />
                    <button className="button is-primary" onClick={handleAddLocation}>Add</button>
                  </div>
                </div>
              </>
            )}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
};

export default Map;

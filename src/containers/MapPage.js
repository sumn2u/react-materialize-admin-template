import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapPage = () => {

const markers = [{
      position: {
        lat: 27.7172,
        lng: 85.3240,
      },
      key: `Kathmandu`,
      defaultAnimation: 2,
    }];
    const GettingStartedGoogleMap = withGoogleMap(props => (
     <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 27.7172, lng: 85.3240 }}
      >
      {markers.map((marker, index) => (
      <Marker {...marker}/>
      ))}
      </GoogleMap>
  ));
 

  return (
    <GettingStartedGoogleMap
      containerElement={
      <div style={{ height: `200px` ,
      color:'red' }} />
        }
    mapElement={
      <div style={{ height: `300px` }}
        markers={markers} />
    }/>
  );
};

export default MapPage;
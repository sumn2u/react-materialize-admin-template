import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class MapPage extends React.Component {
  
 constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
      markersPosition: {
        lat: 27.7172,
        lng: 85.3240,
        address:`Kathmandu`,
      },
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
  }

  

  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng })
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false,
          markersPosition:{
            lat:lat,
            lng:lng
          }
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      })

    /* NOTE: Using callback (Deprecated version) */
    // geocodeByAddress(address,  (err, { lat, lng }) => {
    //   if (err) {
    //     console.log('Oh no!', err)
    //     this.setState({
    //       geocodeResults: this.renderGeocodeFailure(err),
    //       loading: false
    //     })
    //   }
    //   console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
    //   this.setState({
    //     geocodeResults: this.renderGeocodeSuccess(lat, lng),
    //     loading: false
    //   })
    // })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
      </div>
    )
  }


render(){
    let { markersPosition,address } = this.state;
    console.log(markersPosition,"markersPosition")
      const markers  = [{
      position: {
        lat: markersPosition.lat,
        lng: markersPosition.lng,
      },
      key:address,
      defaultAnimation: 2,
     }]
    const GettingStartedGoogleMap = withGoogleMap(props => (
     <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: markersPosition.lat, lng: markersPosition.lng }}
      >
      {markers.map((marker, index) => (
      <Marker {...marker}/>
      ))}
      </GoogleMap>
  ));
const cssClasses = {
      root: 'map-form',
      input: 'search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    }
// const mapClass = {
//   padding: '0px 0px 0px 5px', 
//   position: 'relative',
//    width: '100%',
//     border: 'none',
//      outline: 'none'
// }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "Search Places",
      name: 'Demo__input',
      id: "my-input-id",
      
    }


 

  return (

    <form >
    <PlacesAutocomplete
            onSelect={this.handleSelect}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleSelect}
            classNames={cssClasses}
            inputProps={inputProps}
          />
  

    <GettingStartedGoogleMap
      containerElement={
      <div style={{ height: `600px` ,
      color:'red' }} />
        }
    mapElement={
      <div style={{ height: `300px` }}
        markers={markers} />
    }/>
  </form>
  );
};
}
export default MapPage;
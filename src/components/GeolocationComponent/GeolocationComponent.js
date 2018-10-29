import React from "react";
import withAuthorization from "../WithAuthorization";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class GeolocationComponent extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {
        position: {
          lat: -34.397,
          lng: 150.644
        },
        name: "Current location"
      }
    };
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  initMap = () => {
    if (navigator.geolocation) {
      let pos = null;
      navigator.geolocation.getCurrentPosition(position => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.setState({
          selectedPlace: { position: pos, name: "Current location" }
        });
      });
    }
  };

  componentDidMount() {
    this.initMap();
  }

  render() {
    return (
      <Map
        style={{ position: "absolute" }}
        className={"map"}
        google={this.props.google}
        zoom={14}
        center={this.state.selectedPlace.position}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={"Current location"}
          position={this.state.selectedPlace.position}
        />
        <InfoWindow
          onClose={this.onInfoWindowClose}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
const authCondition = authUser => Boolean(authUser);

export default withAuthorization(authCondition)(
  GoogleApiWrapper({
    apiKey: "YOUR-API-KEY"
  })(GeolocationComponent)
);

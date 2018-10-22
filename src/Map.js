import React, { Component } from 'react';

//Code to load map, referenced from - https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
class Map extends Component{
    constructor(props){
        super(props);

        this.getGoogleMap = this.getGoogleMap.bind(this);
        this.loadGoogleMap = this.loadGoogleMap.bind(this);
    }

    state = {
        mapIsReady: false, //is set to true after google map script is loaded
        locations: [
          ['Lagos', 6.5244, 3.3792],
          ['Surulere', 6.4926, 3.3490],
          ['Ajeromi-Ifelodun', 6.4555, 3.3339],
          ['Agege', 6.6154, 3.3238],
          ['Mushin', 6.5352, 3.3490]
        ]
      };

    //Get Google maps 
    getGoogleMap(){
        const script = document.createElement("script");
        const API = 'AIzaSyCVzs6wz-LvMfKgKSUZdMN2p9GQQ5Xdg9M';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}`;//&callback=initMap`;
        script.async = true;
        script.defer = true;
        
        script.addEventListener('load', () => {
            this.setState({ mapIsReady: true });
          });

        script.addEventListener('error', (event) => {
          alert('Google maps could not be loaded');
          });
        document.body.appendChild(script);
  }

    //Initialize and load the map
    loadGoogleMap(){
      let length = this.state.locations.length;
      let locations = this.state.locations;

      //Add the map using a centered location
      const map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: new window.google.maps.LatLng(locations[0][1], locations[0][2])
        });

      let infowindow = new window.google.maps.InfoWindow;

      //Add 5 markers on map
      let markers = [];
      for (let i = 0; i < length; i++) {  
         let marker = new window.google.maps.Marker({ 
               position: new window.google.maps.LatLng(locations[i][1], locations[i][2]),
               map: map
      });
      markers.push(marker);
    }
  }

    componentDidMount(){
        this.getGoogleMap();
    }

    componentDidUpdate() {
        if (this.state.mapIsReady) {
            this.loadGoogleMap();
          }
    }
    
      render() {
        return (
            <div id="map" style={{position:'relative', overflow:'visible'}}></div>
        )
      }
}


export default Map;
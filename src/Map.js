import React, { Component } from 'react';
let markers = [];
let map;

//Code to load map, referenced from - https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
class Map extends Component{
    constructor(props){
        super(props);

        this.getGoogleMap = this.getGoogleMap.bind(this);
        this.loadGoogleMap = this.loadGoogleMap.bind(this);
        this.loadGoogleMarkers = this.loadGoogleMarkers.bind(this);
        this.addInfoWindow = this.addInfoWindow.bind(this);
        this.loadMarkerSnippet = this.loadMarkerSnippet.bind(this);
    }
     
    state = {
        mapIsReady: false, //is set to true after google map script is loaded
        markerSnippets: []
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
      let locations = this.props.locations;

      //Add the map using a centered location
          map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: new window.google.maps.LatLng(locations[0].lat, locations[0].lng)
        });
  }

//Add 5 markers on map
  loadGoogleMarkers(locations) {
    let length = locations.length;

      for (let i = 0; i < length; i++) {  
        let marker = new window.google.maps.Marker({ 
              position: new window.google.maps.LatLng(locations[i].lat, locations[i].lng),
              map: map,
     });console.log('m',marker.position.lat());
     this.addInfoWindow(map, marker, this.state.markerSnippets);

     markers.push(marker);
   }
  }

  //Add infowindow and animate map markers
  addInfoWindow(map, marker, markerSnippets){
    let infoWindow;

    markerSnippets.forEach((item) => { 
    if(marker.position.lat() === item.locationlat){
      infoWindow = new window.google.maps.InfoWindow({
      content: "<div> <strong> Venue: </strong>" + item.venueName + "</div>"
  });
 }
});

  window.google.maps.event.addListener(marker, 'click', function () {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      infoWindow.open(map, marker);
      setTimeout(function () {
        marker.setAnimation(null);
    }, 700); 
  });
}

//call wikipedia api to fetch marker information
  loadMarkerSnippet(){
  let promiseArray = [];
  let length = this.props.locations.length;

  for(let i=0; i<length; i++){
  const clientID = "SKCXIHC1WOISA02RL0XT0BLODJSHMRNT1V3UF1POVYU4XG2H";
  const ClientSecret = "MN4PGNY515BRKKMBN0P4ESKNA40UXFY2LDXJIG0UFSJXG5E2"
  
  const getLocationVenues = `https://api.foursquare.com/v2/venues/explore?client_id=${clientID}&client_secret=${ClientSecret}&v=20180323&limit=1&ll=${this.props.locations[i].lat},${this.props.locations[i].lng}`;
    promiseArray.push(fetch(getLocationVenues)
    .then(res => res.json())
    )
  };
  console.log('b', promiseArray)
  return Promise.all(promiseArray);
}
    componentDidMount(){
        this.getGoogleMap();

        //resolve promises returned from calling foursquare api to retreve venue information of markers on the map
        let markerVenueSnippets = [];
        let venues = [], i=0;

        this.loadMarkerSnippet()
        .then((results) => { 
            venues = results.map((result)=>{
            let snippet = {venueName: result.response.groups[0].items[0].venue.name, locationlat: this.props.locations[i].lat};
            i++;console.log('o', i, snippet);
            markerVenueSnippets.push(snippet);
            return markerVenueSnippets;
          });
          this.setState({
            markerSnippets: markerVenueSnippets
        });
      },
      (error) => { console.log("could not get venue for location")});
    }

    componentDidUpdate() {console.log("update");
        if (this.state.mapIsReady) {
            this.loadGoogleMap();
            this.loadGoogleMarkers(this.props.updatedLocations);
          }
    }
    
      render() { console.log("prop", this.props.updatedLocations)
        return (
            <div id="map" style={{position:'relative', overflow:'visible'}}></div>
        )
      }
}


export default Map;
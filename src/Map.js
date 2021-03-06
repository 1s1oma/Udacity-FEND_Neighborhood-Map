import React, { Component } from 'react';
let markers = [];
let map;
let infoWindows = [];

//Code to load map, referenced from - https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
class Map extends Component{
    constructor(props){
        super(props);

        this.getGoogleMap = this.getGoogleMap.bind(this);
        this.loadGoogleMap = this.loadGoogleMap.bind(this);
        this.deteleGoogleMarkers = this.deteleGoogleMarkers.bind(this);
        this.loadGoogleMarkers = this.loadGoogleMarkers.bind(this);
        this.animateClickedMarker = this.animateClickedMarker.bind(this);
        this.addInfoWindow = this.addInfoWindow.bind(this);
        this.loadMarkerSnippet = this.loadMarkerSnippet.bind(this);
    }
     
    state = {
        mapIsReady: false, //is set to true after google map script is loaded
        markersReady: false,
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
//delete previous markers
deteleGoogleMarkers(){
  if(markers.length > 0){
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }
}

//Add 5 markers on map
  loadGoogleMarkers(locations) {
    let length = locations.length;

      for (let i = 0; i < length; i++) {  
        let marker = new window.google.maps.Marker({ 
              position: new window.google.maps.LatLng(locations[i].lat, locations[i].lng),
              map: map,
     });
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
    infoWindows.push(infoWindow);
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

//Bounce marker when the corresponding list location is clicked
  animateClickedMarker(clickedLocation){
    for(let i=0; i < markers.length; i++){
      if(markers[i].position.lat() === clickedLocation.lat){
        markers[i].setAnimation(window.google.maps.Animation.BOUNCE);
        
        infoWindows[i].open(map, markers[i]);
        setTimeout(function () {
        markers[i].setAnimation(null);
        }, 700);
    }
  }
}

//call wikipedia api to fetch marker information
  loadMarkerSnippet(){
  let promiseArray = [];
  let length = this.props.locations.length;

  for(let i=0; i<length; i++){
  const clientID = "insert your client ID";
  const ClientSecret = "insert your client secret";
  
  const getLocationVenues = `https://api.foursquare.com/v2/venues/explore?client_id=${clientID}&client_secret=${ClientSecret}&v=20180323&limit=1&ll=${this.props.locations[i].lat},${this.props.locations[i].lng}`;
    promiseArray.push(fetch(getLocationVenues)
    .then(res => res.json())
    )
  };

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
            i++;
            markerVenueSnippets.push(snippet);
            return markerVenueSnippets;
          });
          this.setState({
            markerSnippets: markerVenueSnippets
        });
      },
      (error) => { alert("could not get venue for location")});
    }

    componentDidUpdate() {
        if (this.state.mapIsReady) {
            this.loadGoogleMap();
            this.deteleGoogleMarkers();
            this.loadGoogleMarkers(this.props.updatedLocations);
          }
            this.animateClickedMarker(this.props.clickedLocation);
    }
    
      render() { 
        return (
            <div id="map" style={{position:'relative', overflow:'visible'}}></div>
        )
      }
}


export default Map;

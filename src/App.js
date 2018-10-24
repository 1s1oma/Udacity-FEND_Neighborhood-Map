import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Search from './Search.js'

class App extends Component {
  constructor(props){
    super(props);

    this.showSearchBar = this.showSearchBar.bind(this);
    this.closeSearchBar = this.closeSearchBar.bind(this);
    this.passUpdateLocationsToMap = this.passUpdateLocationsToMap.bind(this);
}

  state = {
    locations: [
      {name:'Lagos', lat: 6.5244, lng: 3.3792},
      {name:'Surulere', lat: 6.4926, lng: 3.3490},
      {name:'Ajeromi-Ifelodun', lat: 6.4555, lng: 3.3339},
      {name:'Agege', lat: 6.6154, lng: 3.3238},
      {name:'Mushin', lat: 6.5352, lng: 3.3490}
    ],
    updatedLocations: [
      {name:'Lagos', lat: 6.5244, lng: 3.3792},
      {name:'Surulere', lat: 6.4926, lng: 3.3490},
      {name:'Ajeromi-Ifelodun', lat: 6.4555, lng: 3.3339},
      {name:'Agege', lat: 6.6154, lng: 3.3238},
      {name:'Mushin', lat: 6.5352, lng: 3.3490}
    ],
    menuClicked: false,
    navWidth: "200px"
  }

  showSearchBar(){
    this.setState({
      menuClicked: true,
      navWidth: "200px"
    });
  }

  closeSearchBar(){
    this.setState({
      menuClicked: false,
      navWidth: "0"
    });
  }

  //This function will be called when the list locations is updated via search to update the maps
  passUpdateLocationsToMap(updatedListLocations){console.log("passed", updatedListLocations)
    this.setState({
      updatedLocations: updatedListLocations
    }) 
  }

  render() {
    {console.log("rends")}
    return (
      <div>
        <div className="app-container">
            <header className="app-header"> 
            <span className="hamburger-icon" onClick={this.showSearchBar}>&#9776;</span>  
            </header>
        <Search clicked={this.state.menuClicked} width={this.state.navWidth} closeSearch={this.closeSearchBar} locations={this.state.locations} passUpdateLocationsToMap={this.passUpdateLocationsToMap}/>
        <Map locations={this.state.locations} updatedLocations={this.state.updatedLocations}/>
       </div> 
      </div>
    );
  }
}

export default App;

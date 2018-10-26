import React, { Component } from 'react';
import LocationList from './LocationList.js'

class Search extends Component{
    constructor(props){
        super(props);

    this.updateQuery = this.updateQuery.bind(this); 
    this.updateLocationList = this.updateLocationList.bind(this);     
    }

    state = {
        query: "",
        searchedLocations: [
            {name:'Lagos', lat: 6.5244, lng: 3.3792},
            {name:'Surulere', lat: 6.4926, lng: 3.3490},
            {name:'Ajeromi-Ifelodun', lat: 6.4555, lng: 3.3339},
            {name:'Agege', lat: 6.6154, lng: 3.3238},
            {name:'Mushin', lat: 6.5352, lng: 3.3490}
          ]
      }
    
    updateQuery = (query) => {
    let searchedLocations = [];
    searchedLocations = this.updateLocationList(query);
        this.setState({ 
            query: query.trim(),
            searchedLocations: searchedLocations
        })
    this.props.passUpdateLocationsToMap(searchedLocations);
    }
    
    //update the location based on the query
    updateLocationList = (query) => {
        let matchedLocations = [];
        let locations = this.props.locations;
        
        matchedLocations = locations.filter((location) => 
            location.name.toLowerCase().includes(query.toLowerCase())
        )
        return matchedLocations;
    }

    render(){ 
        return(
            <div>
                <div className="side-nav" style={{width: this.props.width}}>
                <h5>Locations in Lagos, Nigeria</h5>
                <button className="closebtn" onClick={this.props.closeSearch}>&times;</button>
                <input type="text" placeholder="Search by location name"  value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}/>
                <LocationList searchedLocations={this.state.searchedLocations} passclickedLocationToMap={this.props.passclickedLocationToMap}/>
                </div>
            </div>
        );
    }
}

export default Search;
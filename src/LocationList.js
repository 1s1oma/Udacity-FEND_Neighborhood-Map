import React, { Component } from 'react';

class LocationList extends Component{
    render(){
        const mapLocations = this.props.searchedLocations ? this.props.searchedLocations: []; 
        return(
            <div>
                <ol className="location-list">
                {mapLocations.map((location) => (
                    <li key={location.name}>
                        {location.name}
                    </li>
                ))}
                </ol>
            </div>
        );
    }
}

export default LocationList;
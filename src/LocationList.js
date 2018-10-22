import React, { Component } from 'react';

class LocationList extends Component{
    render(){
        const mapLocations = this.props.mapLocations ? this.props.mapLocations : []; console.log('l',this.props.mapLocations, mapLocations)
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
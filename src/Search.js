import React, { Component } from 'react';
import LocationList from './LocationList.js'

class Search extends Component{
    constructor(props){
        super(props);
    }

    render(){ 
        return(
            <div>
                <div className="side-nav" style={{width: this.props.width}}>
                <h5>Locations in Lagos, Nigeria</h5>
                <button className="closebtn" onClick={this.props.closeSearch}>&times;</button>
                <input type="text" placeholder="Search by location name"/>
                <LocationList mapLocations={this.props.locations}/>
                </div>
            </div>
        );
    }
}

export default Search;
import React, { Component } from 'react';

class Search extends Component{
    constructor(props){
        super(props);
    
      //  this.displaySearch = this.displaySearch.bind(this);
    }

    render(){
        return(
            <div>
                <div className="side-nav" style={{width: this.props.width}}>
                <h5>Locations in Lagos, Nigeria</h5>
                <button className="closebtn" onClick={this.props.closeSearch}>&times;</button>
                <input type="text" placeholder="Search by location name"/>
                </div>
            </div>
        );
    }
}

export default Search;
import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Search from './Search.js'

class App extends Component {
  constructor(props){
    super(props);

    this.showSearchBar = this.showSearchBar.bind(this);
    this.closeSearchBar = this.closeSearchBar.bind(this);
}

  state = {
    menuClicked: false,
    navWidth: "0"
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

  render() {
    return (
      <div>
        <div className="app-container">
            <header className="app-header"> 
            <span className="hamburger-icon" onClick={this.showSearchBar}>&#9776;</span>  
            </header>
        <Search clicked={this.state.menuClicked} width={this.state.navWidth} closeSearch={this.closeSearchBar}/>
        <Map />
       </div> 
      </div>
    );
  }
}

export default App;

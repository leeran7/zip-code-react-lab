import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div class="city">
      <div class="city-name">{props.name}</div>
      <div class="container">
        <ul>
          <li>State: {props.state}</li>
          <li>Location: ({props.lat}, {props.long})</li>
          <li>Population: {props.population}</li>
          <li>Total Wages: {props.wages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div class="zip">
      <label for="zip">Enter a zip-code:</label>
      <input id="zip" name="zip" maxLength={5} type="text" placeholder="Enter a zip-code" onChange={props.changeHandler}/>
    </div>
  );
}

class App extends Component {
  state = {
    cities: [],
    zip: '',
    activateFetch: false
  }
  updateZip = async (e) => {
    await this.setState({ zip: e.target.value });
    if(this.state.zip.length - 1 === 4){
      this.updateCities();
      console.log(this.state.cities);
    } else {
      this.setState({ cities: [] }); //resets state once character is less than 5
    }
  }
  updateCities = async () => {
    await fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.state.zip}`)
      .then( res => res.json())
      .then( data => this.setState({ cities: data }))
      .catch( error => console.log(error));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zip={this.state.zip} changeHandler={this.updateZip} />
        <div class="results">
          {
            this.state.cities.length === 0 ?
              <div><p>No Results</p></div>
                :
              <div>
                {
                  this.state.cities.map(city => <City name={city.LocationText} state={city.State} lat={city.Lat} long={city.Long} wages={city.TotalWages} population={city.EstimatedPopulation} />)
                }
              </div>
          }
        </div>
      </div>
    );
  }
}

export default App;

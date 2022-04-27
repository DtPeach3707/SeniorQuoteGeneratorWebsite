import './styles.css';
import React, { Component } from "react";

var fetch_url = "https://senior-quote-generator.herokuapp.com/quote"; // Setting up url to send requets to

class Main extends Component {
  constructor() {
    super();
    this.state = { quote: 'Generating quote . . .', category: 'actual' };

    this.handleChange = this.handleChange.bind(this);
  }

  callAPI() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: this.state.category})
    };

    fetch(fetch_url, requestOptions)
        .then(response => response.text())
        .then(response => this.setState({ quote: response }));         
  } 

  cleanup() { // for fixing text if request has a timeout
  }

  componentDidMount() {
    this.callAPI();
    this.cleanup();
  }

  recallAPI() {
    this.setState({ quote: 'Generating quote . . .'});
    this.callAPI();
    this.cleanup();
  }

  handleChange(event) {
    this.setState({category: event.target.value});
  }

  render() {
    return (
      <div>
        <div className='form-container'>
        <form id="forme">
          <p className='p-center'>Select category of quote:  </p>
          <select id="pick" value={this.state.category} onChange={this.handleChange}>
            <option value="actual">Actual</option>
            <option value="joke">Joke</option>
            <option value="mixed">Mixed</option>
          </select>
        </form>
        </div>
        <div className='container'>
        <button onClick={this.recallAPI.bind(this)} id='button'>
          Click to generate!
        </button>
        </div>
      <hr/>
      <div className='quote-wrap'>
        <p className='quote'>
          {this.state.quote}
        </p>
      </div>
      </div>
    );
  }
}

export default Main;
import './styles.css';
import React, { Component } from "react";
import axios from "axios";

class Main extends Component {
  constructor() {
    super();
    this.state = { quote: 'Generating quote . . .' };
  }

  callAPI() {
    fetch("https://senior-quote-generator.herokuapp.com/quote")
        .then(response => response.text())
        .then(response => this.setState({ quote: response }));
  } 

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className='quote-wrap'>
        <p className='quote'>
          {this.state.quote}
        </p>
      </div>
    );
  }
}

export default Main;
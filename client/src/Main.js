import './styles.css';
import React, { Component } from "react";

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

  cleanup() { // for fixing text if request has a timeout
    if (this.state.quote === '<!DOCTYPE html> <html> <head> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta charset="utf-8"> <title>Application Error</title> <style media="screen"> html,body,iframe { margin: 0; padding: 0; } html,body { height: 100%; overflow: hidden; } iframe { width: 100%; height: 100%; border: 0; } </style> </head> <body> <iframe src="//www.herokucdn.com/error-pages/application-error.html"></iframe> </body> </html>')
    {
      this.setState({ quote: 'Sorry, but the senior quote took too long!'})
    }
  }

  componentDidMount() {
    this.callAPI();
    this.cleanup();
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
// import assets
import './style/main.scss';

// import npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import cowsay from 'cowsay-browser'; // don't capitalize cowsay, it is not a constructor
import faker from 'faker'; // don't capitalize faker, it is not a constructor


class Header extends React.Component {
  render() {
    return (
      <header>
        <h1> Generate Cowsay Lorem </h1>
      </header>
    )
  }
}

// write module
class App extends React.Component {
  constructor(props) {
    // super is a reference to React.Component
    super(props)
    this.state = {
      content: 'Cowsay',
    }

    this.handleCowsay = this.handleCowsay.bind(this);
  };

  handleCowsay() {
    this.setState({
      content: cowsay.say({text: faker.lorem.words(5)}),
    });
  };

  render() {
    let {content} = this.state
    // The <pre> tag defines preformatted text
    return (
      <div>
        <Header />
        <button onClick={this.handleCowsay}> Click Me! </button>
        <pre> {content} </pre> 
      </div>
    )
  }
}

// export module
ReactDOM.render(<App />, document.getElementById('root'))
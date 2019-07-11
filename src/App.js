import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roboImage: "https://designshack.net/wp-content/uploads/placeholder-image.png",
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Wilfred Ruck</h1>
        <div className="main-content">
          <form>
            <input type="text" placeholder="Enter Text"/>
            <input type="submit" value="Generate"/>
          </form>

          <img className="image-section" src={this.state.roboImage}></img>
        </div>
      </div>
    );
  }
}

export default App;

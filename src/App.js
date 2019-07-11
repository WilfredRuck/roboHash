import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      roboImage: "https://designshack.net/wp-content/uploads/placeholder-image.png",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateText(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text === "") return;
    this.generateImage();
  }

  async generateImage() {
    try {
      const response = await fetch(`https://robohash.org/${this.state.text}`);
      this.setState({ roboImage: response.url });
    } 
    catch {
      alert("Couldn't generate an image for input");
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Wilfred Ruck</h1>
        <div className="main-content">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Enter Text" onChange={this.updateText('text')}/>
            <input type="submit" value="Generate"/>
          </form>

          <img className="image-section" src={this.state.roboImage} alt="Robohash"></img>
        </div>
      </div>
    );
  }
}

export default App;

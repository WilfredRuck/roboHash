import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      text: "",
      roboImage: "https://designshack.net/wp-content/uploads/placeholder-image.png",
      images: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateText(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text === "") return;
    this.setState({ loading: true });
    this.generateImage();
  }

  handleClick(img) {
    if (this.state.roboImage !== img) this.setState({ roboImage: img });
  }

  async generateImage() {
    try {
      const response = await fetch(`https://robohash.org/${this.state.text}`);
      const newImages = this.state.images.concat(response.url);
      this.setState({ loading: false, roboImage: response.url, images: newImages });
    } 
    catch {
      alert("Couldn't generate an image for input");
    }
  }

  render() {
    const {loading} = this.state;
    const images = this.state.images.map((image, idx) => {
      return <li key={idx} onClick={() => this.handleClick(image)}> <img className="prev-image" src={image}></img> </li>
    });
    return (
      <div className="app">
        <h1>Wilfred Ruck</h1>
        <div className="main-content">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Enter Text" onChange={this.updateText('text')}/>
            <input type="submit" value="Generate" disabled={loading}/>
          </form>

          {this.state.loading ? 
          <div className="loading-section"> <FontAwesomeIcon icon={faSpinner} /> </div>
          : <img src={this.state.roboImage} alt="Robohash"></img>
          }
        </div>
        <ul>
          {images}
        </ul>
      </div>
    );
  }
}

export default App;

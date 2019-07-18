import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      roboImage: "https://designshack.net/wp-content/uploads/placeholder-image.png",
      prevInput: "",
      images: [],
    }
    this.textInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusOnInput = this.focusOnInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.focusOnInput();
  }

  focusOnInput() {
    this.textInput.current.focus();
  }

  handleSubmit(e) {
    e.preventDefault();
    const inputValue = this.textInput.current.value;
    if (!inputValue || inputValue === this.state.prevInput) return;
    this.setState({ loading: true });
    this.generateImage(inputValue);
  }

  handleClick(img) {
    if (this.state.roboImage !== img) this.setState({roboImage: img});
  }

  async generateImage(val) {
    try {
      const response = await fetch(`https://robohash.org/${val}`);
      const imageArr = this.state.images.concat(response.url);
      this.setState({ loading: false, roboImage: response.url, prevInput: val, images: imageArr });
    } 
    catch {
      alert("Couldn't generate an image for input");
    }
  }

  render() {
    const {loading} = this.state;
    const images = this.state.images.map((image, idx) => {
      return <li key={idx} onClick={() => this.handleClick(image)}> <img src={image} className="prev-images" alt="Previous Robots"></img> </li>
    })
    return (
      <div className="app">
        <h1>Wilfred Ruck</h1>
        <div className="main-content">
          <form onSubmit={this.handleSubmit}>
            <input type="text" ref={this.textInput} placeholder="Enter Text" />
            <input type="submit" value="Generate" disabled={loading}/>
          </form>

          {this.state.loading ? 
          <div className="loading-section"> <FontAwesomeIcon icon={faSpinner} /> <p>Loading...</p> </div>
          : <img className="main-image" src={this.state.roboImage} alt="Robohash"></img>
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

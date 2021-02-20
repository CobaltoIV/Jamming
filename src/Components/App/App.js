import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <div className="App-playlist"></div>
        </div>
      </div>
    );
  }
}

export default App;

import React from "react";
import "./App.css";
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateResuls: [],
      playlistName: "Chilling",
      playlistTracks: [
        {
          name: "Young Jesus",
          artist: "Portugal the Man",
          album: "IDK",
          id: 1,
        },
        {
          name: "Kick it Still",
          artist: "Portugal the Man",
          album: "IDK",
          id: 2,
        },
        {
          name: "Black, Red, Blue",
          artist: "Portugal the Man",
          album: "Lols",
          id: 3,
        },
        {
          name: "Last",
          artist: "Metallica",
          album: "IDK",
          id: 4,
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
  }

  addTrack(track) {
    const isInPlaylist = Boolean(
      this.state.playlistTracks.find((t) => t.id === track.id)
    );
    if (isInPlaylist)
      this.setState({ playlistTracks: this.state.playlistTracks.push(track) });
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(
        (t) => t.id !== track.id
      ),
    });
  }

  updatePlayListName(name) {
    this.setState({ playlistName: name });
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.stateResuls}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlayListName}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

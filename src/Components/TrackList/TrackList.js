import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";

export class TrackList extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="TrackList">
        {this.props.tracks.length === 0
          ? "Empty"
          : this.props.tracks.map((track) => (
              <Track
                track={track}
                key={track.id}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval}
              />
            ))}
      </div>
    );
  }
}

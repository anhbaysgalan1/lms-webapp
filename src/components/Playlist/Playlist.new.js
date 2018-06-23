import React, { Component } from 'react';
import PlaylistForm from './Playlist.form'; 
  
class PlaylistNew extends Component {
  render() {
    return (
      <div>
        <h5 className="admin-title">
          Add playlist
        </h5>
        <PlaylistForm
          initialValues={{
            name: "",
            videos: []
          }}
        />
      </div>
    );
  }
}
  
  
export default PlaylistNew;
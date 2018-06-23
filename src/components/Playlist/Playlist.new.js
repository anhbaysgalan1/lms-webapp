import React, { Component } from 'react';
import PlaylistForm from './Playlist.form'; 
  
class PlaylistNew extends Component {
  render() {
    return (
      <div>
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
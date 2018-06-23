import React, { Component } from 'react';
import PlaylistForm from './Playlist.form'; 
  
class PlaylistNew extends Component {
  onSubmit(values) {

  }

  render() {
    return (
      <div>
        <h3 className="admin-title">
          Add playlist
        </h3>
        <PlaylistForm
          initialValues={{
            name: "",
            videos: []
          }}
          onSubmit={this.onSubmit}
          onCancel={this.props.history.goBack}
        />
      </div>
    );
  }
}
  
  
export default PlaylistNew;
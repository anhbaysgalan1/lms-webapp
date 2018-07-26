import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPlaylist } from 'actions/playlist';
import PlaylistForm from './Playlist.form'; 
  
class PlaylistNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(playlist) {
    this.props.addPlaylist(playlist);
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <div className="round-panel">
          <PlaylistForm
            initialValues={{
              name: "",
              videos: []
            }}
            onSubmit={this.onSubmit}
            onCancel={this.props.history.goBack}
          />
        </div>
      </div>
    );
  }
}
  
  
export default connect(null, {addPlaylist})(PlaylistNew);
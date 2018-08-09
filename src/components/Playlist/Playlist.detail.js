import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPlaylistPromise } from '../../networks/playlist';
import { updatePlaylist } from 'actions/playlist';
import PlaylistForm from './Playlist.form';

class PlaylistDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const playlistId = this.props.match.params._id;
    fetchPlaylistPromise(playlistId).then((playlist) => {
      this.setState({
        playlist
      });
    })
  }

  onSubmit(playlist) {
    this.props.updatePlaylist(playlist);
    this.props.history.goBack();
  }

  render() {
    if(!this.state.playlist) return <div>Loading...</div>
    return (
      <div>
        <div className="round-panel">
          <PlaylistForm
            initialValues={this.state.playlist}
            onSubmit={this.onSubmit}
            onCancel={this.props.history.goBack}
          />
        </div>
      </div>
    );
  }
}

  
export default connect(null, {updatePlaylist})(PlaylistDetail);
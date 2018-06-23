import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPlaylist } from '../../networks/playlist';
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
    const playlistId = this.props.match.params.id;
    fetchPlaylist(playlistId).then((playlist) => {
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
        <h4 className="admin-title ml-2">
          Playlist detail
        </h4>
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
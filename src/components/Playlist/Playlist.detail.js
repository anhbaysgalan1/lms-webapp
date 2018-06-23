import React, { Component } from 'react';
import { fetchPlaylist } from '../../networks/playlist';
import PlaylistForm from './Playlist.form';
  
  
class PlaylistDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: null
    };
  }

  componentWillMount() {
    const playlistId = this.props.match.params.id;
    fetchPlaylist(playlistId).then((playlist) => {
      this.setState({
        playlist
      });
    })
  }

  onSubmit(values) {

  }

  render() {
    if(!this.state.playlist) return <div>Loading...</div>
    return (
      <div>
        <h3 className="admin-title">
          Playlist detail
        </h3>
        <PlaylistForm
          initialValues={this.state.playlist}
          onSubmit={this.onSubmit}
          onCancel={this.props.history.goBack}
        />
      </div>
    );
  }
}
  
  
export default PlaylistDetail;
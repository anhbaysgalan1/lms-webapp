import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import _ from 'lodash';

import { fetchPlaylists, deletePlaylist } from 'actions/playlist';
import { openPopup } from 'actions/popup';
import { ROUTE_ADMIN_PLAYLIST_NEW, ROUTE_ADMIN_PLAYLIST_DETAIL } from '../routes';

import './Playlist.list.css';
  
class PlayListList extends Component {
  componentWillMount() {
    if(!this.props.playlistReducer) {
      this.props.fetchPlaylists();
    }
  }

  renderPlaylists() {

    const playlists = this.props.playlistReducer;
    if(!playlists) return <div>Loading...</div>

    return (
      <div className="round-panel">
        {
          _.values(playlists).map((playlist, index) => {
            return (
              <div 
                className="playlist-item"
                key={playlist._id}
                onClick={() => this.props.history.push(`${ROUTE_ADMIN_PLAYLIST_DETAIL}/${playlist._id}`)}
              >
                <div className="no">{ index + 1 }</div>
                <div className="name">{ playlist.name }</div>
                <div className="video-count">{ playlist.videos.length } videos</div>
                <div className="controls" 
                  onClick={(event) => {
                  event.stopPropagation();
                  this.props.openPopup(() => {
                    this.props.deletePlaylist(playlist)
                  },
                  null);
                }}>
                  <div className="delete">
                    <i className="text-dark fas fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

  renderControls() {
    return (
      <div className="admin-controls">
        <Button
          className="admin-btn mr-2 text-dark"
          onClick={() => this.props.history.push(ROUTE_ADMIN_PLAYLIST_NEW)}
        >
          <i className="fas fa-plus mr-1"></i> {'  '} Add playlist
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderControls()}
        {this.renderPlaylists()}
      </div>
    );
  }
}

function mapReducerProps({ playlistReducer }) {
  return { playlistReducer };
}

const actions = {
  fetchPlaylists,
  deletePlaylist,
  openPopup
}
  
export default connect(mapReducerProps, actions)(PlayListList);
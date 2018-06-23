import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
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

  render() {
    const playlists = this.props.playlistReducer;
    if(!playlists) return <div>Loading...</div>
    
    return (
      <div>
        <div className="admin-controls">
          <Button
            className="admin-btn mr-2 text-dark"
            onClick={() => this.props.history.push(ROUTE_ADMIN_PLAYLIST_NEW)}
          >
           <i className="fas fa-plus mr-1"></i> {'  '} Add playlist
          </Button>
        </div>
        <Table className="round-panel">
          <tbody>
          {
            _.values(playlists).map((playlist, index) => {
              return (
                <tr 
                  className="playlist-item"
                  key={playlist._id}
                  onClick={() => this.props.history.push(`${ROUTE_ADMIN_PLAYLIST_DETAIL}/${playlist._id}`)}
                >
                  <td>{ index + 1 }</td>
                  <td>{ playlist.name }</td>
                  <td>{ playlist.videos.length } videos</td>
                  <td onClick={(event) => {
                    event.stopPropagation();
                    this.props.openPopup(() => {
                      this.props.deletePlaylist(playlist)
                    },
                    null);
                  }}>
                    <div className="delete">
                      <i className="text-dark fas fa-trash-alt"></i>
                    </div>
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </Table>
        
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
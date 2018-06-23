import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import _ from 'lodash';

import { fetchPlaylists } from 'actions/playlist';
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
            className="admin-add"
            onClick={() => this.props.history.push(ROUTE_ADMIN_PLAYLIST_NEW)}
          >
            Add playlist
          </Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Video count</th>
              <th></th>
            </tr>
          </thead>
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
                  <td  onClick={(event) => event.stopPropagation()}>
                    <div className="delete">
                      <i className="text-danger fas fa-trash-alt"></i>
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
  fetchPlaylists
}
  
export default connect(mapReducerProps, actions)(PlayListList);
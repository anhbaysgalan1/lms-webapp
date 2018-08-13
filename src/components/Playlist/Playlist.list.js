import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { fetchPlaylists, deletePlaylist } from 'actions/playlist';
import { openPopup } from 'actions/popup';
import SimpleLoading from '../SimpleLoading';
import { ROUTE_ADMIN_PLAYLIST_NEW, ROUTE_ADMIN_PLAYLIST_DETAIL } from '../routes';

import './Playlist.list.css';

class PlayListList extends Component {
  componentWillMount() {
    const { playlistReducer, fetchPlaylistsAction } = this.props;
    if (!playlistReducer) {
      fetchPlaylistsAction();
    }
  }

  renderItemControls(playlist) {
    const {
      openPopupAction,
      deletePlaylistAction,
    } = this.props;
    return (
      <div
        className="controls"
        role="presentation"
        onClick={(event) => {
          event.stopPropagation();
          openPopupAction(() => deletePlaylistAction(playlist), null);
        }}
      >
        <div className="delete">
          <i className="text-dark fas fa-trash-alt" />
        </div>
      </div>
    );
  }

  renderPlaylists() {
    const {
      playlistReducer: playlists,
      history,
    } = this.props;

    if (!playlists) return <SimpleLoading />;

    return (
      <div className="round-panel">
        {
          _.values(playlists).map((playlist, index) => (
            <div
              className="playlist-item"
              key={playlist._id}
              role="presentation"
              onClick={() => history.push(`${ROUTE_ADMIN_PLAYLIST_DETAIL}/${playlist._id}`)}
            >
              <div className="no">
                { index + 1 }
              </div>
              <div className="name">
                { playlist.title }
              </div>
              <div className="video-count">
                { playlist.videos.length }
                {' '}
                videos
              </div>
              { this.renderItemControls(playlist) }
            </div>
          ))
        }
      </div>
    );
  }

  renderControls() {
    const { history } = this.props;
    return (
      <div className="admin-controls">
        <Button
          className="admin-btn mr-2 text-dark"
          onClick={() => history.push(ROUTE_ADMIN_PLAYLIST_NEW)}
        >
          <i className="fas fa-plus mr-1" />
          {'  '}
          Add playlist
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
  fetchPlaylistsAction: fetchPlaylists,
  deletePlaylistAction: deletePlaylist,
  openPopupAction: openPopup,
};

PlayListList.defaultProps = {
  playlistReducer: null,
};

PlayListList.propTypes = {
  playlistReducer: PropTypes.shape({
    _id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      videos: PropTypes.array.isRequired,
    }),
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  fetchPlaylistsAction: PropTypes.func.isRequired,
  deletePlaylistAction: PropTypes.func.isRequired,
  openPopupAction: PropTypes.func.isRequired,
};

export default connect(mapReducerProps, actions)(PlayListList);

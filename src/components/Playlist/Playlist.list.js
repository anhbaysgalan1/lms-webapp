import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { fetchPlaylists, deletePlaylist, fetchPlaylistPagination } from 'actions/playlist';
import { openPopup } from 'actions/popup';
import SimpleLoading from '../SimpleLoading';
import { fetchPlaylistsPromise } from '../../networks/playlist';
import { LIMIT_PLAYLIST, SeparatePage } from '../../utils';
import { ROUTE_ADMIN_PLAYLIST_NEW, ROUTE_ADMIN_PLAYLIST_DETAIL } from '../routes';

import './Playlist.list.css';

class PlayListList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      total: null,
      isLoading: false,
      defaultDisable: true,
    };
    this.numberPage = this.numberPage.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  async componentWillMount() {
    const { playlistReducer, fetchPlaylistPaginationAction } = this.props;
    const Total = await fetchPlaylistsPromise()
    console.log(Total.total);
    this.setState({
      total: Total.total,
      active: null,
    });
    if (!playlistReducer) {
      fetchPlaylistPaginationAction(1, LIMIT_PLAYLIST);
    }
  }

  toggleActive(index) {
    this.setState({
      active: index,
      defaultDisable: false,
    });
  }

  numberPage(num) {
    const arrNumber = [];
    const { active, defaultDisable } = this.state;
    const { fetchPlaylistPaginationAction } = this.props;
    for (let i = 0; i < num; i += 1) {
      arrNumber.push(i + 1);
    }
    return (
      _.map(arrNumber, (el, index) => (
        <li className={active === index || (defaultDisable & index === 0)  ? 'page-item disabled' : 'page-item'} key={index}>
          <div className="page-link" onClick={() => { fetchPlaylistPaginationAction(el, LIMIT_PLAYLIST); this.toggleActive(index); }} onKeyDown={() => {}} tabIndex="1" role="presentation">
            {el}
          </div>
        </li>
      ))
    );
  }

  pagination() {
    const { total } = this.state;
    const numberPagination = SeparatePage(total, LIMIT_PLAYLIST);
    return (
      <div className="d-flex justify-content-end mt-3">
        <nav aria-label="...">
          <ul className="pagination pagination-sm">
            {this.numberPage(numberPagination)}
          </ul>
        </nav>
      </div>
    );
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
        {this.pagination()}
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
  fetchPlaylistPaginationAction: fetchPlaylistPagination,
};

PlayListList.defaultProps = {
  playlistReducer: null,
};

PlayListList.propTypes = {
  playlistReducer: PropTypes.array,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  fetchPlaylistsAction: PropTypes.func.isRequired,
  deletePlaylistAction: PropTypes.func.isRequired,
  openPopupAction: PropTypes.func.isRequired,
};

export default connect(mapReducerProps, actions)(PlayListList);

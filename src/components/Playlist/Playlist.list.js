import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { fetchPlaylists, deletePlaylist, fetchPlaylistPagination } from 'actions/playlist';
import { openPopup } from 'actions/popup';
// import { fetchPlaylistsPromise } from 'networks/playlist';
import { LIMIT_PLAYLIST, SeparatePage } from 'utils';
import SearchBar from 'components/SearchBar';
import SimpleLoading from '../SimpleLoading';
import {
  ROUTE_ADMIN_PLAYLIST_NEW,
  ROUTE_ADMIN_PLAYLIST_DETAIL,
  ROUTE_ADMIN_PLAYLIST,
  ROUTE_ADMIN_PLAYLIST_FROM_YOUTUBE,
} from '../routes';

import './Playlist.list.css';

class PlayListList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      total: null,
      defaultDisable: true,
      getParams: null,
      keyword: '',
    };
    this.numberPage = this.numberPage.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  async componentWillMount() {
    const { location } = this.props;
    const { keyword } = this.state;
    const getParams = new URLSearchParams(location.search).get('page');
    const { playlistReducer, fetchPlaylistPaginationAction } = this.props;
    const Total = await fetchPlaylistPaginationAction(1, LIMIT_PLAYLIST, keyword);
    this.setState({
      total: Total.payload.total,
      active: null,
      getParams,
    });
    if (!playlistReducer) {
      if (getParams === null) {
        fetchPlaylistPaginationAction(1, LIMIT_PLAYLIST, keyword);
        this.setState({
          defaultDisable: true,
        });
      } else {
        fetchPlaylistPaginationAction(getParams, LIMIT_PLAYLIST, keyword);
      }
    }
    if (getParams === null) {
      fetchPlaylistPaginationAction(1, LIMIT_PLAYLIST, keyword);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { location, fetchPlaylistPaginationAction } = this.props;
    const { keyword } = this.state;
    const playlistReducer = _.get(this.props, 'playlistReducer');
    if (nextProps.location.search !== location.search) {
      const getParams = new URLSearchParams(nextProps.location.search).get('page');
      this.setState({
        getParams,
      });
    }
    if (playlistReducer !== nextProps.playlistReducer) {
      fetchPlaylistPaginationAction(1, LIMIT_PLAYLIST, keyword);
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
    const {
      active, defaultDisable, getParams, keyword,
    } = this.state;
    const { fetchPlaylistPaginationAction, history } = this.props;
    for (let i = 0; i < num; i += 1) {
      arrNumber.push(i + 1);
    }
    return (
      _.map(arrNumber, (el, index) => (
        <li className={(active === index) || (parseInt(getParams, 10) === index + 1) || (defaultDisable && getParams === null && index === 0) ? 'page-item disabled' : 'page-item'} key={index}>
          <div className="page-link" onClick={() => { history.push(`${ROUTE_ADMIN_PLAYLIST}?page=${el || 1}`); fetchPlaylistPaginationAction(el, LIMIT_PLAYLIST, keyword); this.toggleActive(index); }} onKeyDown={() => {}} tabIndex="-1" role="presentation">
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
    const playlists = _.get(this.props, 'playlistReducer');
    const {
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
    const { history, fetchPlaylistPaginationAction } = this.props;
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
        <Button
          className="admin-btn mr-2 text-dark"
          onClick={() => history.push(ROUTE_ADMIN_PLAYLIST_FROM_YOUTUBE)}
        >
          <i className="fas fa-plus mr-1" />
          {'  '}
          Add playlist from youtube
        </Button>
        <div className="mr-auto d-inline-flex align-items-center">
          <span className="mr-2">
          Search:
          </span>
          <SearchBar onSearch={(keyword) => {
            this.setState({ keyword });
            fetchPlaylistPaginationAction(1, LIMIT_PLAYLIST, keyword)
              .then((data) => {
                const playlistData = data.payload.data;
                history.push(`${ROUTE_ADMIN_PLAYLIST}?page=1`);
                this.setState({
                  total: playlistData.total,
                  active: null,
                  getParams: 1,
                });
              });
          }}
          />
        </div>
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

PlayListList.propTypes = {
  deletePlaylistAction: PropTypes.func.isRequired,
  openPopupAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    length: PropTypes.number,
    action: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  fetchPlaylistPaginationAction: PropTypes.func.isRequired,
};

const actions = {
  fetchPlaylistsAction: fetchPlaylists,
  deletePlaylistAction: deletePlaylist,
  openPopupAction: openPopup,
  fetchPlaylistPaginationAction: fetchPlaylistPagination,
};

export default connect(mapReducerProps, actions)(PlayListList);

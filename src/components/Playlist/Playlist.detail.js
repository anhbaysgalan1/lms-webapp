import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleGoBack } from 'utils';

import { updatePlaylist } from 'actions/playlist';
import SimpleLoading from '../SimpleLoading';
import { fetchPlaylistPromise } from '../../networks/playlist';
import PlaylistForm from './Playlist.form';

class PlaylistDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlist: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    const playlistId = match.params._id;
    fetchPlaylistPromise(playlistId).then((playlist) => {
      this.setState({
        playlist,
      });
    });
  }

  onSubmit(playlist) {
    const { updatePlaylistAction, history } = this.props;
    updatePlaylistAction(playlist);
    handleGoBack(history);
  }

  render() {
    const { playlist } = this.state;
    const { history } = this.props;
    if (!playlist) { return <SimpleLoading />; }
    return (
      <div>
        <div className="round-panel">
          <PlaylistForm
            initialValues={playlist}
            onSubmit={this.onSubmit}
            onCancel={() => { handleGoBack(history); }}
          />
        </div>
      </div>
    );
  }
}

PlaylistDetail.propTypes = {
  updatePlaylistAction: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const actions = {
  updatePlaylistAction: updatePlaylist,
};

export default connect(null, actions)(PlaylistDetail);

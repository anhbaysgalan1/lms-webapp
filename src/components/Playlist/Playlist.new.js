import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleGoBack } from 'utils';

import { addPlaylist } from 'actions/playlist';
import PlaylistForm from './Playlist.form';

class PlaylistNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(playlist) {
    const { addPlaylistAction, history } = this.props;
    addPlaylistAction(playlist);
    handleGoBack(history);
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <div className="round-panel">
          <PlaylistForm
            initialValues={{
              title: '',
              videos: [],
            }}
            onSubmit={this.onSubmit}
            onCancel={() => { handleGoBack(history); }}
          />
        </div>
      </div>
    );
  }
}

PlaylistNew.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  addPlaylistAction: PropTypes.func.isRequired,
};

const actions = {
  addPlaylistAction: addPlaylist,
};

export default connect(null, actions)(PlaylistNew);

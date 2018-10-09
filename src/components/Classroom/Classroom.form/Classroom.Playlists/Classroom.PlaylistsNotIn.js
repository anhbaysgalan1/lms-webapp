import React, { Component } from 'react';
import '../../index.css';
/* eslint-disable */
import { withRouter } from 'react-router';
/* eslint-enable */
import _ from 'lodash';

class ClassRoomPlaylistNotIn extends Component {
  constructor(props) {
    super(props);
    const listPlaylist = _.get(this.props, 'list_playlist');
    this.state = {
      listPlaylistState: listPlaylist,
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextPropsListMember = _.get(nextProps, 'list_playlist');
    const curPropsListMember = _.get(this.props, 'list_playlist');
    if (nextPropsListMember !== curPropsListMember) {
      this.setState({ listPlaylistState: nextPropsListMember });
    }
  }

  userDetail(path) {
    const PropsHistory = _.get(this.props, 'history');
    PropsHistory.push(path);
  }

  renderList() {
    const listPlaylistState = _.get(this.state, 'listPlaylistState');
    const clickGetData = _.get(this.props, 'clickGetData');
    if (!listPlaylistState) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }

    return (
      <div className="round-panel">
        <p className="rounded font-weight-bold text-primary pl-2">
          List PlayLists Not In Class
        </p>
        {
          listPlaylistState.map((el, index) => el ? (

            <div
              className="classroom-item"
              onKeyDown={() => {}}
              role="presentation"
              key={index}
              onClick={() => {}}
            >
              <div className="no">
                { index + 1 }
              </div>
              <div className="name">
                { el.title }
              </div>
              <div className="name2">
                {el.videos ? `${el.videos.length} Videos` : '0 Video'}
              </div>
              <div className="video-count" />
              <div
                className="controls"
                onKeyDown={() => {}}
                role="presentation"
                onClick={(event) => {
                  event.stopPropagation();
                  clickGetData(el, 2);
                }}
              >
                <div className="delete">
                  <i className="text-dark fas fa-plus" />
                </div>
              </div>
            </div>
          ): (

            <div
              className="classroom-item"
              onKeyDown={() => {}}
              role="presentation"
              key={index}
              onClick={() => {}}
            >
              <div className="no">
                { index + 1 }
              </div>
              <div className="name">
              </div>
              <div className="name2">
              </div>
              <div className="video-count" />
              <div
                className="controls"
                onKeyDown={() => {}}
                role="presentation"
                onClick={(event) => {
                  event.stopPropagation();
                  clickGetData(el, 2);
                }}
              >
                <div className="delete">
                  <i className="text-dark fas fa-plus" />
                </div>
              </div>
            </div>
          ))
        }

      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}


export default withRouter(ClassRoomPlaylistNotIn);
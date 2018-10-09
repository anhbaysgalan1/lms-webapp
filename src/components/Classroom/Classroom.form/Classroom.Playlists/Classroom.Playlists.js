import React, { Component } from 'react';
import '../../index.css';
/* eslint-disable */
import { withRouter } from 'react-router';
/* eslint-enable */
import _ from 'lodash';

class ClassRoomPlaylist extends Component {
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
    const removeData = _.get(this.props, 'removeData');
    const clickToUnlock = _.get(this.props, 'clickToUnlock');
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
          List PlayLists In Class
        </p>
        {
          listPlaylistState.map((el, index) => el.playlist ? (

            <div
              className={el.unlock ? 'classroom-item' : 'bg-gray classroom-item opacity-lock font-weight-light bg-light text-muted'}
              onKeyDown={() => {}}
              role="presentation"
              key={el._id}
              onClick={() => {}}
            >
              <div className="no">
                { index + 1 }
                {el.unlock}
              </div>
              <div className="name">
                { el.playlist.title }
              </div>
              <div className="name2">
                {el.playlist.videos ? `${el.playlist.videos.length} Videos` : '0 Video'}
              </div>
              <div className="video-count" />
              <div
                className="controls not-opacity"
                onKeyDown={() => {}}
                role="presentation"
                onClick={(event) => {
                  event.stopPropagation();
                  clickToUnlock(el);
                }}
              >
                <div className="delete ">
                  <i className={el.unlock ? 'text-dark fas fa-lock-open' : 'text-dark fas fa-lock'} />
                </div>
              </div>
              <div
                className="controls"
                onKeyDown={() => {}}
                role="presentation"
                onClick={(event) => {
                  event.stopPropagation();
                  removeData(el, 2);
                }}
              >
                <div className="delete">
                  <i className="text-dark fas fa-trash-alt" />
                </div>
              </div>
            </div>
          ) : (
			  

            <div
              className={el.unlock ? 'classroom-item' : 'bg-gray classroom-item opacity-lock font-weight-light bg-light text-muted'}
              onKeyDown={() => {}}
              role="presentation"
              key={el._id}
              onClick={() => {}}
            >
              <div className="no">
                { index + 1 }
                {el.unlock}
              </div>
              <div className="name">
              </div>
              <div className="name2">
              </div>
              <div className="video-count" />
              <div
                className="controls not-opacity"
                onKeyDown={() => {}}
                role="presentation"
                onClick={(event) => {
                  event.stopPropagation();
                  clickToUnlock(el);
                }}
              >
                <div className="delete ">
                  <i className={el.unlock ? 'text-dark fas fa-lock-open' : 'text-dark fas fa-lock'} />
                </div>
              </div>
              <div
                className="controls"
                onKeyDown={() => {}}
                role="presentation"
                onClick={(event) => {
                  event.stopPropagation();
                  removeData(el, 2);
                }}
              >
                <div className="delete">
                  <i className="text-dark fas fa-trash-alt" />
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


export default withRouter(ClassRoomPlaylist);
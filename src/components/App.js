import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { checkAuth, logout } from 'actions/auth';

import SideBar from './SideBar';
import Users from './Users';
import Classroom from './Classroom';
import Popup from './Popup';
import Video from './Video';
import Playlist from './Playlist';
import Login from './Login';
import VideoPlayer from './VideoPlayer';
import Course from './ClassroomCourse';

import {
  ROUTE_ADMIN_VIDEO,
  ROUTE_ADMIN_PLAYLIST,
  ROUTE_ADMIN_USER,
  ROUTE_ADMIN_CLASSROOM,
  ROUTE_ADMIN_CLASSROOM_COURSE,
} from './routes';

import './App.css';

class App extends Component {
  componentWillMount() {
    const { checkAuthAction } = this.props;

    checkAuthAction();
  }

  render() {
    const { logoutAction, authReducer } = this.props;
    const { user } = authReducer;

    if (user) {
      if (user.role > 0) {
        return (
          <div id="app">
            <Popup />
            <SideBar
              user={user}
              items={[
                {
                  title: 'Video',
                  href: ROUTE_ADMIN_VIDEO,
                  image: <i className="fas fa-video" />,
                },
                {
                  title: 'Users',
                  href: ROUTE_ADMIN_USER,
                  image: <i className="fas fa-user" />,
                },
                {
                  title: 'Classroom',
                  href: ROUTE_ADMIN_CLASSROOM,
                  image: <i className="fas fa-users" />,
                },
                {
                  title: 'Course',
                  href: ROUTE_ADMIN_CLASSROOM_COURSE,
                  image: <i className="fab fa-accusoft" />,
                },
                {
                  title: 'Playlist',
                  href: ROUTE_ADMIN_PLAYLIST,
                  image: <i className="fas fa-list-ul" />,
                },
              ]}
            />
            <VideoPlayer
              isOpen
              videoId="f_LgWgzCPnQ"
            />
            <div id="app-panel">
              <div className="text-right mb-2">
                <span>
                  Hi,
                  {' '}
                  {user.username}
                  <button className="ml-2" type="button" onClick={logoutAction}>
                    Logout
                  </button>
                </span>
              </div>
              <Switch>
                <Route
                  path={ROUTE_ADMIN_VIDEO}
                  component={Video}
                />
                <Route
                  path={ROUTE_ADMIN_PLAYLIST}
                  component={Playlist}
                />
                <Route
                  path={ROUTE_ADMIN_USER}
                  component={Users}
                />
                <Route
                  path={ROUTE_ADMIN_CLASSROOM_COURSE}
                  component={Course}
                />
                <Route
                  path={ROUTE_ADMIN_CLASSROOM}
                  component={Classroom}
                />
              </Switch>
            </div>
          </div>
        );
      }
      return (
        <div className="warning">
          You don&apos;t have permission to access this feature!
          <button className="ml-2" type="button" onClick={logoutAction}>
            Logout?
          </button>
        </div>
      );
    }
    return <Login />;
  }
}

function mapReducerProps({ authReducer }) {
  return { authReducer };
}

const actions = {
  logoutAction: logout,
  checkAuthAction: checkAuth,
};

App.propTypes = {
  authReducer: PropTypes.shape({
    user: PropTypes.object,
    errMsg: PropTypes.string,
  }).isRequired,
  logoutAction: PropTypes.func.isRequired,
  checkAuthAction: PropTypes.func.isRequired,
};

export default withRouter(connect(mapReducerProps, actions)(App));

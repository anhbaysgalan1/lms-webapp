import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import _ from 'lodash';

import { checkAuth } from 'actions/auth';

import SideBar from './SideBar';
import Users from './Users';
import ClassRoom from './ClassRoom';
import Popup from './Popup';
import Video from './Video';
import Playlist from './Playlist';
import Login from './Login';

import {
  ROUTE_ADMIN_VIDEO, ROUTE_ADMIN_PLAYLIST, ROUTE_ADMIN_USER, ROUTE_ADMIN_CLASSROOM,
} from './routes';

import './App.css';

class App extends Component {
  componentWillMount() {
    const checkAuthAction = _.get(this.props, 'checkAuth');
    checkAuthAction();
  }

  render() {
    const user = _.get(this.props, 'authReducer.user');
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
                  image: <i className="fas fa-list-ul" />,
                },
                {
                  title: 'Users',
                  href: ROUTE_ADMIN_USER,
                  image: <i className="fas fa-list-ul" />,
                },
                {
                  title: 'ClassRoom',
                  href: ROUTE_ADMIN_CLASSROOM,
                  image: <i className="fas fa-list-ul" />,
                },
                {
                  title: 'Playlist',
                  href: ROUTE_ADMIN_PLAYLIST,
                  image: <i className="fas fa-list-ul" />,
                },
              ]}
            />
            <div id="app-panel">
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
                  path={ROUTE_ADMIN_CLASSROOM}
                  component={ClassRoom}
                />
              </Switch>
            </div>
          </div>
        );
      }
      return "You don't have permission to access this feature!";
    }
    return <Login />;
  }
}

function mapReducerProps({ authReducer }) {
  return { authReducer };
}

const actions = {
  checkAuth,
};

export default withRouter(connect(mapReducerProps, actions)(App));

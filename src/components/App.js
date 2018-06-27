import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import SideBar from './SideBar';
import Playlist from './Playlist';
import UsersList from './Users';
import Popup from './Popup';

import { ROUTE_ADMIN_PLAYLIST,ROUTE_ADMIN_USER } from './routes';

import './App.css';

class App extends Component {
    render() {
        return (
          <div id="app">
            <Popup />
            <SideBar
              items={[
                {
                  title: "Playlist",
                  href: ROUTE_ADMIN_PLAYLIST,
                  image: <i className="fas fa-list-ul"></i>
                },
                {
                  title: "Users",
                  href: ROUTE_ADMIN_USER,
                  image:<i className="fas fa-list-ul"></i>
                }
              ]}
            />
            <div id="app-panel">
              <Switch>
                <Route
                  path={ROUTE_ADMIN_PLAYLIST}
                  component={Playlist}
                />
                <Route
                path={ROUTE_ADMIN_USER}
                component={UsersList} />
              </Switch>
            </div>
          </div>
        )
    }
}
 
export default withRouter(App);
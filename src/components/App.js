import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import SideBar from './SideBar';
import Playlist from './Playlist';

import { ROUTE_ADMIN_PLAYLIST } from './routes';

import './App.css';
 
class App extends Component {
    render() {
        return (
          <div id="app">
            <SideBar
              items={[
                {
                  title: "Playlist",
                  href: ROUTE_ADMIN_PLAYLIST,
                  image: <i className="fas fa-list-ul"></i>
                }
              ]}
            />
            <div id="app-panel">
              <Switch>
                <Route
                  path={ROUTE_ADMIN_PLAYLIST}
                  component={Playlist}
                />
              </Switch>
            </div>
          </div>
        )
    }
}
 
export default withRouter(App);
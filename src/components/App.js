import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import SideBar from './SideBar';
import Video from './Video';
import Popup from './Popup';

import { ROUTE_ADMIN_VIDEO } from './routes';

import './App.css';

class App extends Component {
    render() {
        return (
          <div id="app">
            <Popup />
            <SideBar
              items={[
                {
                  title: "Video",
                  href: ROUTE_ADMIN_VIDEO,
                  image: <i className="fas fa-list-ul"></i>
                }
              ]}
            />
            <div id="app-panel">
              <Switch>
                <Route
                  path={ROUTE_ADMIN_VIDEO}
                  component={Video}
                />
              </Switch>
            </div>
          </div>
        )
    }
}
 
export default withRouter(App);
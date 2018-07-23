import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import SideBar from './SideBar';
import Users from './Users';
import ClassRoom from './ClassRoom';
import Popup from './Popup';
import Video from './Video';


import { ROUTE_ADMIN_VIDEO } from './routes';
import { ROUTE_ADMIN_USER } from './routes';
import {  ROUTE_ADMIN_CLASSROOM } from './routes';


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
                },
                {
                  title: "Users",
                  href: ROUTE_ADMIN_USER,
                  image:<i className="fas fa-list-ul"></i>
                },
                {
                  title:"ClassRoom",
                  href: ROUTE_ADMIN_CLASSROOM,
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

                <Route
                path={ROUTE_ADMIN_USER}
                component={Users} />

                <Route
                path={ROUTE_ADMIN_CLASSROOM}
                component={ClassRoom} />
                
              </Switch>
            </div>
          </div>
        )
    }
}
 
export default withRouter(App);
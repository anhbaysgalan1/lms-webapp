import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SideBar from './sidebar';
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
            </div>
        )
    }
}
 
 
export default withRouter(App);
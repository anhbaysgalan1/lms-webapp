import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PlaylistList from './Playlist.list';
import PlaylistNew from './Playlist.new';
import PlaylistDetail from './Playlist.detail';

import { ROUTE_ADMIN_PLAYLIST_NEW, ROUTE_ADMIN_PLAYLIST_DETAIL_ID } from '../routes';

class Playlist extends Component {
  render() {
    return (
      <div className="h-100">
        <Switch>
          <Route path={ROUTE_ADMIN_PLAYLIST_NEW} component={PlaylistNew} />
          <Route path={ROUTE_ADMIN_PLAYLIST_DETAIL_ID} component={PlaylistDetail} />
          <Route path="/" component={PlaylistList} />
        </Switch>
      </div>
    )
  }
}
 
 
export default withRouter(Playlist);
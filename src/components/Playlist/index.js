import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import PlaylistList from './Playlist.list';
import PlaylistNew from './Playlist.new';
import PlaylistFromYoutube from './PlaylistFromYoutube.new';
import PlaylistDetail from './Playlist.detail';

import { ROUTE_ADMIN_PLAYLIST_NEW, ROUTE_ADMIN_PLAYLIST_DETAIL_ID, ROUTE_ADMIN_PLAYLIST_FROM_YOUTUBE } from '../routes';

const playlist = () => (
  <div className="h-100">
    <Switch>
      <Route path={ROUTE_ADMIN_PLAYLIST_NEW} component={PlaylistNew} />
      <Route path={ROUTE_ADMIN_PLAYLIST_FROM_YOUTUBE} component={PlaylistFromYoutube} />
      <Route path={ROUTE_ADMIN_PLAYLIST_DETAIL_ID} component={PlaylistDetail} />
      <Route path="/" component={PlaylistList} />
    </Switch>
  </div>
);

export default withRouter(playlist);

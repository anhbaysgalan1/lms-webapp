import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import VideoList from './Video.list';
import VideoNew from './Video.new';
import VideoDetail from './Video.detail';

import { ROUTE_ADMIN_VIDEO_NEW, ROUTE_ADMIN_VIDEO_DETAIL_ID } from '../routes';

class Playlist extends Component {
  render() {
    return (
      <div className="h-100">
        <Switch>
          <Route path={ROUTE_ADMIN_VIDEO_NEW} component={VideoNew} />
          <Route path={ROUTE_ADMIN_VIDEO_DETAIL_ID} component={VideoDetail} />
          <Route path="/" component={VideoList} />
        </Switch>
      </div>
    )
  }
}
 
 
export default withRouter(Playlist);
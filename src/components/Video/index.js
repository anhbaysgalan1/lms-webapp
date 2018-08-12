import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import VideoList from './Video.list';
import VideoNew from './Video.new';
import VideoDetail from './Video.detail';

import { ROUTE_ADMIN_VIDEO_NEW, ROUTE_ADMIN_VIDEO_DETAIL_ID, ROUTE_ADMIN_VIDEO } from '../routes';

function Video() {
  return (
    <div className="h-100">
      <Switch>
        <Route path={ROUTE_ADMIN_VIDEO_NEW} component={VideoNew} />
        <Route path={ROUTE_ADMIN_VIDEO_DETAIL_ID} component={VideoDetail} />
        <Route exact path={ROUTE_ADMIN_VIDEO} component={VideoList} />
      </Switch>
    </div>
  );
}

export default withRouter(Video);

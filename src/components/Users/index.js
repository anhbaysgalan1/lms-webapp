import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import UsersList from "./users.list"

import { ROUTE_ADMIN_USER_NEW, ROUTE_ADMIN_USER_DETAIL_ID } from '../routes';

class Users extends Component {
  render() {
    return (
      <div className="h-100">
        <Switch>
          {/* <Route path={ROUTE_ADMIN_USER_NEW} component={PlaylistNew} /> */}
          {/* <Route path={ROUTE_ADMIN_USER_DETAIL_ID} component={PlaylistDetail} /> */}
          <Route path="/" component={UsersList} />
        </Switch>
      </div>
    )
  }
}


export default withRouter(Users);
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { logout } from 'actions/auth';

import SideBarItem from './SideBarItem';

import './index.css';

const SideBar = (props) => {
  const items = _.get(props, 'items');
  const title = _.get(props, 'title');
  const user = _.get(props, 'user');
  const logoutAction = _.get(props, 'logout');

  if (!items) {
    return (
      <div>
        Sidebar: Nothing to render
      </div>
    );
  }

  const renderItem = (item, index) => (
    <SideBarItem
      key={index}
      title={item.title}
      image={item.image}
      href={item.href}
    />
  );

  return (
    <div className="sidebar">
      <h3>
        { title }
      </h3>
      <span className="ml-3">
        Hi,
        {' '}
        {user.username}
        <button type="button" onClick={logoutAction}>
          Logout
        </button>
      </span>
      <div className="sidebar-items">
        { items.map((item, index) => renderItem(item, index)) }
      </div>
    </div>
  );
};

function mapReducerProps({ authReducer }) {
  return { authReducer };
}

const actions = {
  logout,
};

export default connect(mapReducerProps, actions)(SideBar);

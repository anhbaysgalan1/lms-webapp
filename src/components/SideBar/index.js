import React from 'react';
import _ from 'lodash';

import SideBarItem from './SideBarItem';

import './index.css';

const SideBar = (props) => {
  const items = _.get(props, 'items');
  const title = _.get(props, 'title');

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
      <div className="sidebar-items">
        { items.map((item, index) => renderItem(item, index)) }
      </div>
    </div>
  );
};

export default SideBar;

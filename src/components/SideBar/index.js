import React, { Component } from 'react';

import SideBarItem from './SideBarItem';

import './index.css';
 
class SideBar extends Component {
  render() {
    const items = this.props.items;
    const title = this.props.title;
    
    if(!items) {
      return <div>Sidebar: Nothing to render </div>;
    }

    return (
      <div className="sidebar">
        <h3> { title } </h3>
        <div className="sidebar-items">
          { items.map((item, index) => {
            return this.renderItem(item, index);
          }) }
        </div>
      </div>
    );
  }

  renderItem(item, index) {
    return (
      <SideBarItem
        key={index}
        title={item.title} 
        image={item.image}
        href={item.href}
      />
    );
  }
}
 
 
export default SideBar;
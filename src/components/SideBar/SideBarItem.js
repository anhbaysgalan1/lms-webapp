import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


// const SideBarItem = () => {
//   const { Image, Title, Href } = this.props;
//   const image = this.props.image ? this.props.image : 'No image';
//   const title = this.props.title ? this.props.title : 'No title';
//   const href = this.props.href ? this.props.href : '/no-href';
//   return (
//     <Link className="sidebar-item" to={href}>
//       {image}
//       <span>
//         {title}
//       </span>
//     </Link>
//   );
// };

class SideBarItem extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { image: Image, title: Title, href: Href } = this.props;
    const image = Image || 'No image';
    const title = Title || 'No title';
    const href = Href || '/no-href';
    return (
      <Link className="sidebar-item" to={href}>
        {image}
        <span>
          {title}
        </span>
      </Link>
    );
  }
}

SideBarItem.defaultProps = {
  image: null,
  title: null,
  href: null,
};

SideBarItem.propTypes = {
  image: PropTypes.node,
  title: PropTypes.node,
  href: PropTypes.node,
};

export default SideBarItem;

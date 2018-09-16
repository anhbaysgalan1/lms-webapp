import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Input } from 'reactstrap';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.search = _.debounce(this.search, 300).bind(this);
  }

  search(terms) {
    const { onSearch } = this.props;
    onSearch(terms);
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Input
          onChange={event => this.search(event.target.value)}
          placeholder="Input keyword to search"
        />
      </div>
    );
  }
}
SearchBar.defaultProps = {
  onSearch: null,
  className: null,
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  className: PropTypes.string,
};

export default SearchBar;

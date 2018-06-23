import React, { Component } from 'react';
import _ from 'lodash';
import { Input } from 'reactstrap';
  
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.search = _.debounce(this.search, 300).bind(this);
  }

  search(terms) {
    this.props.onSearch(terms);
  }
  
  render() {
    return (
      <div className={this.props.className}>
        <Input
          onChange={(event) => this.search(event.target.value)}
        />
      </div>
    );
  }
}
  
  
export default SearchBar;
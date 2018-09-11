import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      number: null,
      func: null,
    };
    // this.renderForm = this.renderForm.bind(this);
  }

  componentWillMount() {
    const { number, func } = this.props;
    this.setState({
      number,
      func,
    });
  }

  renderForm() {
    const { number, func } = this.state;
    return (
      _.map(number, el => (
        <li className="page-item">
          <div key={el} className="page-link" onClick={() => func(el)} onKeyDown={() => {}} tabIndex="-1" role="presentation">
            {el}
          </div>
        </li>
      ))
    );
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

Pagination.propTypes = {
  number: PropTypes.arrayOf('number').isRequired,
  func: PropTypes.func.isRequired,
};


export default Pagination;

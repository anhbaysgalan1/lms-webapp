import React, { Component } from 'react';
import '../../index.css';
import _ from 'lodash';
/* eslint-disable */
import { withRouter } from 'react-router';
/* eslint-enable */

class ClassRoomlistteacher extends Component {
  constructor(props) {
    super(props);
    const listMember = _.get(this.props, 'list_teachers');
    this.state = {
      listMemberState: listMember,
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextPropsListMember = _.get(nextProps, 'list_teachers');
    const curPropsListMember = _.get(this.props, 'list_teachers');
    if (nextPropsListMember !== curPropsListMember) {
      this.setState({ listMemberState: nextPropsListMember });
    }
  }

  userDetail(path) {
    const PropsHistory = _.get(this.props, 'history');
    PropsHistory.push(path);
  }

  renderList() {
    const listMemberState = _.get(this.state, 'listMemberState');
    const removeData = _.get(this.props, 'removeData');
    if (!listMemberState) {
      return (
        <div className="d-flex justify-content-center">
          {/* eslint-disable global-require */}
          <img alt="" src={require('../../../../statics/loader.gif')} />
          {/* eslint-enable global-require */}
        </div>
      );
    }

    return (
      <div className="round-panel_cls">
        <p className="rounded font-weight-bold text-primary pl-2">
          List Teachers In Class
        </p>
        {
                listMemberState.map((member, index) => (
                  <div
                    className="classroom-item"
                    onKeyDown={() => {}}
                    role="presentation"
                    key={member._id}
                    onClick={() => {}}
                    // (this.userDetail(`${ROUTE_ADMIN_USER_DETAIL}/${member._id}`)
                  >
                    <div className="no">
                      { index + 1 }
                    </div>
                    <div className="name">
                      { member.username }
                    </div>
                    <div className="name2">
                      {member.email}
                    </div>
                    <div className="video-count" />
                    <div
                      className="controls"
                      onKeyDown={() => {}}
                      role="presentation"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeData(member, 1);
                      }}
                    >
                      <div className="delete">
                        <i className="text-dark fas fa-trash-alt" />
                      </div>
                    </div>
                  </div>
                ))
            }

      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}


export default withRouter(ClassRoomlistteacher);

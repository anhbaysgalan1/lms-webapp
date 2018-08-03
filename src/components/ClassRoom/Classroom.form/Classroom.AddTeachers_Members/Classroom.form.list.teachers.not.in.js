import React, { Component } from 'react';
import '../../index.css';
/* eslint-disable */
import { withRouter } from 'react-router';
/* eslint-enable */
import _ from 'lodash';
import { ROUTE_ADMIN_USER_DETAIL } from '../../../routes';

class ClassRoomlistteachernotin extends Component {
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
    const clickGetData = _.get(this.props, 'clickGetData');
    if (!listMemberState) {
      return (
        <div>
        Loading...
        </div>
      );
    }

    return (
      <div className="round-panel_cls">
        Members In Class
        {
                    listMemberState.map((member, index) => (
                      <div
                        className="classroom-item"
                        onKeyDown={() => {}}
                        role="presentation"
                        key={member._id}
                        onClick={() => (this.userDetail(`${ROUTE_ADMIN_USER_DETAIL}/${member._id}`))}
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
                            clickGetData(member);
                          }}
                        >
                          <div className="delete">
                            <i className="text-dark fas fa-check" />
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
export default withRouter(ClassRoomlistteachernotin);

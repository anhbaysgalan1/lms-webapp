import React, { Component } from 'react';
import '../../index.css';
/* eslint-disable */
import { withRouter } from 'react-router';
/* eslint-enable */
import _ from 'lodash';

import VideosUnlock from '../Classroom.VideosUnlock';

class ClassRoomlistmember extends Component {
  constructor(props) {
    super(props);
    const listMember = _.get(this.props, 'list_member');
    this.state = {
      listExpanded: [],
      listMemberState: listMember,
    };
    this.handleExpanded = this.handleExpanded.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const nextPropsListMember = _.get(nextProps, 'list_member');
    const curPropsListMember = _.get(this.props, 'list_member');
    if (nextPropsListMember !== curPropsListMember) {
      this.setState({ listMemberState: nextPropsListMember });
    }
  }

  userDetail(path) {
    const PropsHistory = _.get(this.props, 'history');
    PropsHistory.push(path);
  }

  handleExpanded(memberId) {
    const listExpanded = _.get(this.state, 'listExpanded');
    let newListExpanded = listExpanded;
    if(listExpanded.includes(memberId)) {
      newListExpanded = newListExpanded.filter(item => item != memberId);
      this.setState({ listExpanded: newListExpanded });
    } else {
      newListExpanded.push(memberId);
      this.setState({ listExpanded: newListExpanded });
    }
  }

  renderList() {
    const listExpanded = _.get(this.state, 'listExpanded');
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
      <div className="round-panel">
        <p className="rounded font-weight-bold text-primary pl-2">
          List Member In Class
        </p>
        {
          listMemberState.map((member, index) => (
            <div key={index}>
              <div
                className="classroom-item"
                onKeyDown={() => {}}
                role="presentation"
                key={member._id}
                onClick={() => {}}
                // this.userDetail(`${ROUTE_ADMIN_USER_DETAIL}/${member._id}`)
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
                <div
                  className="unlockVideo"
                  onKeyDown={() => {}}
                  role="presentation"
                  onClick={(event) => {
                    event.stopPropagation();
                    this.handleExpanded(member._id);
                  }}
                >
                  <i className="fas fa-video"></i>
                </div>
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
              <VideosUnlock
                {...this.props}
                memberId={member._id}
                expanded={listExpanded.includes(member._id)}
              />
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


export default withRouter(ClassRoomlistmember);

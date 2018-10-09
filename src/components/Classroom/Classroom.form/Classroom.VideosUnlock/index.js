import React, { Component } from 'react';
import { Input, Col } from 'reactstrap';
import { getUnicodeSearchName } from 'utils';
import _ from 'lodash';

class VideosUnlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playlists: _.get(this.props, 'playlists') || [],
            keyword: ''
        }

        this.renderPlaylists = this.renderPlaylists.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const keyword = e.target.value;
        this.setState({ keyword });
    }

    renderPlaylists() {
        const { playlists, keyword } = this.state;
        const handleUnlockPlaylistMember = _.get(this.props, 'updateMemberPlaylistUnlock');
        const memberId = _.get(this.props, 'memberId');
        const filterKeyword = keyword ? new RegExp(getUnicodeSearchName(keyword), 'i') : ''
        const list = playlists.filter(item => {
            if(filterKeyword) return filterKeyword.test(item.playlist.keyword)
            else return item;
        }).slice(0, 10);
        
        const playlistElement = list.map((el, index) =>  el.playlist ? (
            <div
              className={el.members && el.members.includes(memberId) ? 'classroom-item' : 'bg-gray classroom-item opacity-lock font-weight-light bg-light text-muted'}
              onKeyDown={() => {}}
              role="presentation"
              key={el._id}
              onClick={() => {}}
            >
                <div className="no">
                    { index + 1 }
                    {el.unlock}
                </div>
                <div className="name">
                    { el.playlist.title }
                </div>
                <div className="name2">
                    {el.playlist.videos ? `${el.playlist.videos.length} Videos` : '0 Video'}
                </div>
                <div
                    className="controls not-opacity"
                    onKeyDown={() => {}}
                    role="presentation"
                    onClick={(event) => {
                        event.stopPropagation(); 
                        handleUnlockPlaylistMember(el, memberId);
                    }}
                >
                    <div className="delete ">
                        <i className={el.members && el.members.includes(memberId) ? 'text-dark fas fa-lock-open' : 'text-dark fas fa-lock'} />
                    </div>
                </div>
            </div>) : 
            (<div>ASDASD</div>)
        );

        return (
            <div>
                <Col md="12">
                    <Input className="mb-3" placeholder="Input to search" onChange={this.handleChange}/>
                </Col>
                { playlistElement }
            </div>
        )
    }

    render() {
        const playlists = _.get(this.props, 'playlists');
        const expanded = _.get(this.props, 'expanded');
        if(!playlists || playlists.length == 0) return '';
        
        return (
            <div className={ `playlists-unlock ${expanded ? 'expanded' : ''}` }>
                {this.renderPlaylists()}
            </div>
        );
    }
}

export default VideosUnlock;
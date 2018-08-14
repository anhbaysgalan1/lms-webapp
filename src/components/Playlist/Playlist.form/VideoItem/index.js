import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const playlistItem = (props) => {
  const {
    title,
    videoId,
    onDeleteClick,
    duration,
    playlistName,
    disableDelete,
    onClick,
    selected,
  } = props;

  const wrapperClassName = selected ? 'video-item highlight' : 'video-item';

  return (
    <div
      className={wrapperClassName}
      onClick={onClick}
      role="presentation"
    >
      <div className="content">
        <div className="thumbnail">
          <img
            src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
            alt={`${title}`}
          />
          <span className="duration">
            { duration }
          </span>
        </div>
        <div className="brief">
          <h5 className="title">
            { title }
          </h5>
        </div>
      </div>
      {
        !disableDelete
        && (
          <div className="controls">
            <i
              className="text-secondary fas fa-times clickable"
              onClick={onDeleteClick}
              role="presentation"
              data-toggle="tooltip"
              data-placement="right"
              title={`Remove '${title}' from '${playlistName}'`}
            />
          </div>
        )
      }
    </div>
  );
};

playlistItem.defaultProps = {
  title: null,
  videoId: null,
  onDeleteClick: null,
  duration: null,
  playlistName: null,
  disableDelete: null,
  onClick: null,
  selected: null,
};

playlistItem.propTypes = {
  title: PropTypes.string,
  videoId: PropTypes.string,
  onDeleteClick: PropTypes.func,
  duration: PropTypes.string,
  playlistName: PropTypes.string,
  disableDelete: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default playlistItem;

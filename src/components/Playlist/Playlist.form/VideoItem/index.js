import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const playlistItem = (props) => {
  const {
    title,
    youtubeId,
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
            src={`https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`}
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

playlistItem.propTypes = {
  title: PropTypes.func.isRequired,
  youtubeId: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  duration: PropTypes.string.isRequired,
  playlistName: PropTypes.string.isRequired,
  disableDelete: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default playlistItem;

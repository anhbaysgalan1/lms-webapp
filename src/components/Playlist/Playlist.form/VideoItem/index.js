import React from 'react';

import './index.css';

export default function(props) {
  const {
    name,
    youtubeId,
    onDeleteClick,
    duration,
    playlistName,
    disableDelete,
    onClick,
    selected
  } = props;

  const wrapperClassName = selected ? "video-item highlight": "video-item";

  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div className="content">
        <div className="thumbnail">
          <img
            src={`https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`}
            alt={`${name}`}
          />
          <span className="duration">{duration}</span>
        </div>
        <div className="brief">
          <h5 className="title">{ name }</h5>
        </div>
      </div>
      {
        !disableDelete &&
        <div className="controls">
          <i
            className="text-secondary fas fa-times clickable"
            onClick={onDeleteClick}
            data-toggle="tooltip" data-placement="right" title={`Remove '${name}' from '${playlistName}'`}
          />
        </div>
      }
    </div>
  );
}
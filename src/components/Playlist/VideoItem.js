import React from 'react';

import './VideoItem.css';

export default function(props) {
  const {
    name,
    youtubeId,
    onDeleteClick,
    duration
  } = props;

  return (
    <div className="video-item">
      <div>
        <img src="https://via.placeholder.com/120x60" />
        <span>{duration}</span>
      </div>
      <div className="brief">
        <h6 className="title">{ name }</h6>
      </div>
      <i
       className="text-danger fas fa-times clickable"
       onClick={onDeleteClick}
      >
      </i>
      <hr/>
    </div>
  );
}
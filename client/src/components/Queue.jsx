import React from 'react';
import QueueEntry from './QueueEntry.jsx';

const Queue = ({ queue, handleQueue }) => {
  if (queue.length > 0) {
    return (
      <div className='queue-list'>
        <div>Current Queue:</div>
        <span>Number</span>
        <span>Type</span>
        <span>Size</span>
        <span>Aircraft ID</span>
        {queue.map((aircraft, index) =>
          <QueueEntry aircraft={aircraft} key={index}
          index={index}/>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => {
            handleQueue() }}
        >
          Refresh Queue
        </button>
      </div>
    )
  }
}

export default Queue;
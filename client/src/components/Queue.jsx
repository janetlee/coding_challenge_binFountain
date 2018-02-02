import React from 'react';
import QueueEntry from './QueueEntry.jsx';

const Queue = ({ queue }) => {
  if (queue.first) {
    return (
      <div className='queue-list'>
        <div>Current Queue:</div>
        {queue.first.map((aircraft, index) =>
          <QueueEntry aircraft={aircraft} key={index} index={index}/>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default Queue;
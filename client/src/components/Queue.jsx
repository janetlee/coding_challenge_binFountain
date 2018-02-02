import React from 'react';
import QueueEntry from './QueueEntry.jsx';

const Queue = ({ queue }) => {
  if (queue.first) {
    return (
      <div className='queue-list'>
        <div>Current Queue:</div>
        <span>Number</span>
        <span>Type</span>
        <span>Size</span>
        <span>Aircraft ID</span>
        {queue.first.map((aircraft, index) =>
          <QueueEntry aircraft={aircraft} key={index}
          index={index}/>
        )}
       {queue.second.map((aircraft, index) =>
          <QueueEntry aircraft={aircraft} key={index}
          index={queue.first.length + index}/>
        )}
       {queue.third.map((aircraft, index) =>
          <QueueEntry aircraft={aircraft} key={index}
          index={queue.first.length +
            queue.second.length +
            index}/>
        )}
       {queue.fourth.map((aircraft, index) =>
          <QueueEntry aircraft={aircraft} key={index}
          index={queue.first.length +
            queue.second.length +
            queue.third.length +
            index}/>
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default Queue;
import React from 'react';
const QueueEntry = ({aircraft, index}) => {
  return (
    <div className='plane'>
      <div className='aircraft'>
        <ul className='list-item'>
          <span className='index'>
            {index + 1}
          </span>
          <span className='type'>
            {aircraft.type}
          </span>
          <span className='size'>
            {aircraft.size}
          </span>
          <span className='Id'>
            {aircraft.aircraftId}
          </span>
        </ul>
      </div>
    </div>
  );

};




export default QueueEntry;
class Queue {
  constructor () {
    this.aircraftQueue = [];
    this.requestBuffer = [];
  }
}

Queue.prototype.enqueue = function(aircraft) {
  this.aircraftQueue.push(aircraft);
};

Queue.prototype.dequeue = function() {
  let currentAircraft = this.checkAircraft(this.aircraftQueue, 'P','L');

  if(currentAircraft) {
    return currentAircraft;
  } else {
    currentAircraft = this.checkAircraft(this.aircraftQueue, 'P','S');
    if (currentAircraft) {
      return currentAircraft;
    } else {
      currentAircraft = this.checkAircraft(this.aircraftQueue, 'C','L');
      if (currentAircraft) {
        return currentAircraft;
      } else {
        return this.aircraftQueue.shift();
      }
    }
  }
};

Queue.prototype.checkAircraft = function(arr, type, size) {
  var currentAircraft;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].type === type && arr[i].size === size) {
      currentAircraft = arr[i];
      arr.splice(i,1);
      break;
    }
  }

  return currentAircraft;
};

Queue.prototype.addToBuffer = function(aircraft) {
  this.requestBuffer.push(aircraft);
};
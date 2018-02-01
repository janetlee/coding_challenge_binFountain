class Queue {
  constructor() {
    this.first = [];
    this.second = [];
    this.third = [];
    this.fourth = [];
  }

  enqueue(aircraft) {
    if (aircraft.type === 'P' && aircraft.size === 'L') {
      // place in highest priority bucket
      this.first.push(aircraft);
    }

    if (aircraft.type === 'P' && aircraft.size === 'S') {
      // place in 2nd highest priority bucket
      this.second.push(aircraft);
    }

    if (aircraft.type === 'C' && aircraft.size === 'L') {
      // place in 3rd highest priority bucket
      this.third.push(aircraft);
    }

    if (aircraft.type === 'C' && aircraft.size === 'S') {
      // place in 4th highest priority bucket
      this.fourth.push(aircraft);
    }
  }


  dequeue() {
    if(this.first.length > 0) {
      return this.first.shift();
    } else if(this.second.length > 0) {
      return this.second.shift();
    } else if(this.third.length > 0) {
      return this.third.shift();
    } else if(this.fourth.length > 0) {
      return this.fourth.shift();
    }
  }
}

let queueStart;

const aqmRequestProcess = function(request) {
  if(!queueStart) {
    queueStart = new Queue();
  }
};

export { queueStart, aqmRequestProcess }
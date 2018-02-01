class Queue {
  constructor() {
    this.first = [];
    this.second = [];
    this.third = [];
    this.fourth = [];
  }

  enqueue(aircraft) {
    if (aircraft.type === 'P' && aircraft.size === 'L') {
      this.first.push(aircraft);
    } else if (aircraft.type === 'P' && aircraft.size === 'S') {
      this.second.push(aircraft);
    } else if (aircraft.type === 'C' && aircraft.size === 'L') {
      this.third.push(aircraft);
    } else if (aircraft.type === 'C' && aircraft.size === 'S') {
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
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aircraftQueue');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});


const aircraftQueue = mongoose.Schema({
  id: {type: Number,  autoIncrement: true, allowNull: false,  primaryKey: true},
  aircraft_tail_id: {type: String, allowNull: false},
  type: {type: String, allowNull: false},
  size: {type: String, allowNull: false},
  queue_status: {type: String},
  priority: {type: Number},
  enqueued_at: {type: String},
  dequeued_at: {type: String}
});

const Queue = mongoose.model('aircraftQueue', aircraftQueue);

const enqueue = (data => {
  console.log('Inside enqueue function');

  var aircraft = {
    aircraft_tail_id: data.aircraftId,
    type: data.type,
    size: data.size,
    queue_status: 'Q',
    priority: priorityChecker(data),
    enqueued_at: Date.now(),
    dequeued_at: null
  };

  var queue = new Queue(aircraft);

  queue.save()
    .then(data => {
      console.log("aircraft queued in database");
      // callback(null, data);
    })
    .catch(err => {
      console.log(err);
      console.log("unable to save to database");
    });
});

const currentQueue = () => {
  console.log('GETTING CURRENT QUEUE');
  return Queue.find({}, (err, queueItems) => {
    if(err) {
      return err;
    } else {
      // console.log(queueItems);
      return queueItems;
    }
  });
};

const callingQueue = async () => {
  console.log('callingQueue');
  let results;

  try {
    results = await currentQueue();
  }
  catch(e) {
    console.log('ERRORING', e);
  }
  // console.log(results);
  return results;
};


const priorityChecker = aircraft => {
  if(aircraft.type === 'P' && aircraft.size ==='L') {
    return 1;
  }
  if(aircraft.type === 'P' && aircraft.size ==='S') {
    return 2;
  }
  if(aircraft.type === 'C' && aircraft.size ==='L') {
    return 3;
  }
  if(aircraft.type === 'C' && aircraft.size ==='S') {
    return 4;
  }
}

module.exports.enqueue = enqueue;
// module.exports.dequeue = dequeue;
module.exports.currentQueue = currentQueue;
module.exports.callingQueue = callingQueue;
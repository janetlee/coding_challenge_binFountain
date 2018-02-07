const Sequelize = require('sequelize');
const sequelize = new Sequelize('aircraft_queue', 'binaryfountain', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Aircraft = sequelize.define('aircraft', {
  id: {type: Sequelize.INTEGER,  autoIncrement: true, allowNull: false,  primaryKey: true},
  aircraft_tail_id: {type: Sequelize.STRING(100), allowNull: false},
  type: {type: Sequelize.STRING(1), allowNull: false},
  size: {type: Sequelize.STRING(1), allowNull: false}
});

const Queue = sequelize.define('aircraft_queue', {
  id: {type: Sequelize.INTEGER,  autoIncrement: true, allowNull: false,  primaryKey: true},
  aircraft_id: {type: Sequelize.INTEGER, allowNull: false,
    references: {
      model: Aircraft,
      key: 'id'
    }},
  queue_status: {type: Sequelize.STRING(2), comment: 'Q: in queue, D: dequeued'},
  priority: {type: Sequelize.INTEGER, comment: '1: highest priority, 4: lowest priority'},
  enqueued_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  dequeued_at: {type: Sequelize.DATE}
});

Aircraft.sync().then(() => {
  console.log('Aircraft table created');
});

Queue.sync().then(() => {
  console.log('Aircraft_queues table created');
});

const enqueue = (aircraft) => {
  console.log(aircraft);

  Aircraft.create({
    aircraft_tail_id: aircraft.aircraftId,
    type: aircraft.type,
    size: aircraft.size
  })
  .then(queueing_aircraft_id => queueing_aircraft_id.get('id')) // this may have future async problems
  .then(queueing_aircraft_id => {
    Queue.create({
      aircraft_id: queueing_aircraft_id,
      queue_status: 'Q',
      priority: priorityChecker(aircraft)
    })
  })
};

const dequeue = () => {
  // run currentQueue
  /// return the first one out to the front end,
  // mark it dequeued with a D, update the time and

  console.log(currentQueue());
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

const currentQueue = () => {
  Queue.findAll({
    order: [
      ['type', 'DESC '],
      ['size', 'ASC'],
      ['enqueued_at','ASC']
    ],
    where: {
      dequeued_at: null
    }
  });
};


module.exports.enqueue = enqueue;
module.exports.dequeue = dequeue;
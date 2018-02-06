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


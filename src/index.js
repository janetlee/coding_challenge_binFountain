import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { queueStart, aqmRequestProcess } from '../helpers/aircraftQueue';
import Aircraft from '../helpers/aircraft';

const app = express();

app.use(helmet());
app.use(express.static(__dirname + './../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/start', (req, res) => {
  aqmRequestProcess();
  res.send(queueStart);
  // res.send('Initiated queue: ' + JSON.stringify(queueStart));
});

app.post('/enqueue', (req, res) => {
  let aircraftType = req.body.aircraftType;
  let aircraftSize = req.body.aircraftSize;
  let aircraftId = req.body.aircraftId;

  if (aircraftId !== null &&
    aircraftId !== undefined &&
    !Array.isArray(aircraftId)) {
    queueStart.enqueue({
      'type': aircraftType,
      'size': aircraftSize,
      'aircraftId': aircraftId
    })
    // console.log('Current Queue Status: ', JSON.stringify(queueStart));
    res.status(201)
      .send(JSON.stringify(queueStart));
    res.end();
  } else {
    console.log('Invalid request: ', req.body);
    res.status(503)
      .send(JSON.stringify(queueStart));
    res.end();
  }
});

app.get('/dequeue', (req, res) => {
  let body = {'queue': queueStart};
  body.dequeued = queueStart.dequeue();
  res.send(body);
  console.log('Current Queue Status: ', queueStart);
  res.end();
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
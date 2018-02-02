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
  console.log('INITIATE QUEUE');
  aqmRequestProcess();
  res.send('Initiated queue');
});

app.post('/enqueue', (req, res) => {
  let aircraftType = req.body.aircraftType;
  let aircraftSize = req.body.aircraftSize;
  let aircraftId = req.body.aircraftId;

  if (req.body.aircraftId !== null &&
    req.body.aircraftId !== undefined &&
    !Array.isArray(req.body.aircraftId)) {
    queueStart.enqueue({
      'type': req.body.aircraftType,
      'size': req.body.aircraftSize,
      'aircraftId': req.body.aircraftId
    })
  } else {
    console.log('Invalid aircraftId: ', req.body.aircraftId);
  }
  console.log('Current Queue Status: ', queueStart);
  res.send('Queued aircraft: ', aircraftType, aircraftSize, aircraftId);
  res.end();
});

app.get('/dequeue', (req, res) => {
  res.send(queueStart.dequeue());
  console.log('Current Queue Status: ', queueStart);
  res.end();
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
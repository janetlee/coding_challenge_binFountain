import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { queueStart, aqmRequestProcess } from '../helpers/aircraftQueue';
import aircraft from '../helpers/aircraftQueue';

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
  console.log(req);
  if (!req) {
    res.status(500).send('Bad request');
  } else {
    console.log(req);
    Queue.enqueue(aircraft);
    res.status(201);
  }
});

app.get('/dequeue', (req, res) => {
   if (!req) {
    res.status(500).send('Bad request');
  } else {
    helper.dequeue();
    res.status(201);
  }
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
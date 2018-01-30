import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(express.static(__dirname + './../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('', async (req, res) => {
   if (!req) {
    res.status(500).send('Bad request');
  } else {
    // twitter.searchTweets(req.body);
    // const tweetArray = await twitter.searchTweets(req.body);
    // res.json(tweetArray);
    res.status(201);
  }
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
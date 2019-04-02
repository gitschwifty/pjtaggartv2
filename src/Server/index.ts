import express from 'express';

const PORT = 3000;
const path = require('path');

// initialize the application and create the routes
const app = express();
const router = express.Router();

app.use(
  express.static(path.resolve(__dirname, '..', '..', 'build'), {
    maxAge: '30d'
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build/index.html'));
});

// start the app
app.listen(PORT, (error: any) => {
  if (error) {
    return console.log('something bad happened', error);
  }

  console.log('listening on ' + PORT + '...');
});

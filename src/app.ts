import express from 'express';
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello ew !');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

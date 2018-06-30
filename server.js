'use strict';

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(res.json({message:'Hello Express!'}));
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
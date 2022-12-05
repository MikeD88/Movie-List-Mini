const express = require('express');
const app = express();
const port = 8081;
const knex = require('knex')(require('../../knexfile.js')["development"])
const cors = require('cors')
// const knex = require('../knexfile.js')[environment];
// const environment = process.env.ENVIRONMENT || 'development'
// module.exports = require('knex')(config);

app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
  res.send('This is not the endpoint you are looking for.');
})

app.listen(port, () => {
  console.log(`knex and express are running on port ${port}`)
})

app.get('/movies', (req, res) => {
  knex('movies')
    .select('*')
    .then((movies) => {
      let result = movies.map((movie) => movie);
      res.json(result);
    })
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  knex('movies')
    .where('id', id)
    .select('*')
    .then((movies) => {
      let result = movies.map((movie) => movie);
      res.json(result);
    })
});

app.post('/movies', async (req, res) => {
  const maxIdQuery = await knex('movies').max('id as maxId').first();
  let num = maxIdQuery.maxId + 1;
  knex('movies')
    .insert(
      {
        id: num,
        name: req.body.name,
      }
    )
    .then(function (result) {
      res.status(201).send('A new movie has been added')
    })
});

app.post('/multiple-add', async (req, res) => {
  const dataArray = req.body;

  const maxIdQuery = await knex('movies').max('id as maxId').first();
  let num = Number.parseInt(maxIdQuery.maxId + 1);
  dataArray.map((obj) => {
    obj['id'] = num;
    num++;
  })
  console.log(dataArray);
  knex('movies')
    .insert(
      dataArray
    )
    .then(function (result) {
      res.status(201).send(result);
    });
});

app.patch('/movies/:id', (req, res) => {
  let { id } = req.params;
  knex('movies')
    .where('id', id)
    .update({
      name: req.body.name,
    })
    .then(movies => {
      movies === 0 ? res.status(200).send(`Entry ${id} doesn't exist, so nothing was updated`)
        : res.status(201).send(`Movie ${id} is updated`)
    })
});

app.delete('/multiple-delete', async (req, res) => {
  const dataArray = req.body;
  knex('movies')
    .whereIn('id', dataArray)
    .del()
    .then(movies => {
      movies === 0 ? res.status(200).send(`Error: Nothing Was Deleted`)
        : res.status(201).send(`All Movies were deleted`)
    });
});

app.delete('/movies/:id', async (req, res) => {
  let { id } = req.params;
  // const id = req.body.id;
  knex('movies')
    .where('id', id)
    .del()
    .then(movies => {
      movies === 0 ? res.status(200).send(`Entry ${id} doesn't exist, so nothing was deleted`)
        : res.status(201).send(`Movie ${id} was deleted`)
    })
});


app.get('*', function (req, res) {
  res.status(404).send(`404: You tried navigating to a path that doesn't exist...`);
});
app.post('*', function (req, res) {
  res.status(404).send(`404: You tried posting to a path that doesn't exist...`);
});
app.patch('*', function (req, res) {
  res.status(404).send(`404: You tried patching in a path that doesn't exist...`);
});
app.delete('*', function (req, res) {
  res.status(404).send(`404: You tried deleting in a path that doesn't exist...`);
});

module.exports = app;
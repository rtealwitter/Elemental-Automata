/* eslint-disable no-console */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development']);
const { Model, ValidationError } = require('objection');
const Scenario = require('./models/Scenario');

// Bind all Models to a knex instance
Model.knex(knex);
// db-errors provides a consistent wrapper around database errors
const { wrapError, DBError } = require('db-errors');

const app = express();
// Cross-Origin-Resource-Sharing headers tell the browser is OK for this page to request resources
// from another domain (which is otherwise prohibited as a security mechanism)
const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'Origin']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Resolve client build directory as absolute path to avoid errors in express
  const path = require('path'); // eslint-disable-line global-require
  const buildPath = path.resolve(__dirname, '../client/build');

  app.use(express.static(buildPath));

  // Serve the HTML file included in the CRA client on the root path
  app.get('/', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.get('/api/scenarios', (request, response, next) => {
  Scenario.query().then(rows => {
    response.send(rows);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.post('/api/scenarios', (request, response, next) => {
  Scenario.query()
    .insertAndFetch(request.body)
    .then(rows => {
      response.send(rows);
    }, next);
});

app.delete('/api/scenarios/:id', (request, response, next) => {
  return Scenario.query()
    .deleteById(request.params.id)
    .then(() => {
      response.sendStatus(200);
    }, next);
});

app.put('/api/scenarios/:id', (request, response, next) => {
  const { id, ...updatedScenario } = request.body; // eslint-disable-line no-unused-vars
  // request.params.id is a string, and so needs to be converted to an integer before comparison
  if (id !== parseInt(request.params.id, 10)) {
    throw new ValidationError({
      statusCode: 400,
      message: 'URL id and request id do not match'
    });
  }
  // Now update the database entry

  Scenario.query()
    .updateAndFetchById(request.params.id, request.body)
    .then(rows => {
      response.send(rows);
    }, next);
});

// A very simple error handler. In a production setting you would
app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
});

module.exports = {
  app,
  knex
};

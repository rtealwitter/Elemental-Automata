/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');

exports.seed = function(knex, Promise) {
  const contents = fs.readFileSync('seed.json');
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  return knex('Scenario')
    .del()
    .then(() => knex.batchInsert('Scenario', data, 100));
};

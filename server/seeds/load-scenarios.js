/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require('fs');

exports.seed = function(knex, Promise) {
  const contents = fs.readFileSync('seed.json');
  const data = JSON.parse(contents);

  // Deletes ALL existing entries
  return knex('Scenario')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('Scenario').insert([
        {
          title: 'Mountain',
          author: 'Teal',
          edited: '2019-04-19',
          sandbox: '11'
        }
      ]);
    });
};

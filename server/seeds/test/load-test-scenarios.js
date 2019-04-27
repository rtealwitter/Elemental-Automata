/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Scenario')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('Scenario').insert([
        {
          title: 'Beach',
          author: 'Tenzin',
          edited: '2019-04-24',
          sandbox: 110
        }
      ])
    );
};

/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Scenario', table => {
    table.increments('id');
    table.string('title').notNullable();
    table.string('author').notNullable();
    table.date('edited').notNullable();
    table.json('sandbox').notNullable();
    // table.blob('image'); // to be used if we include image previews
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Scenario');
};

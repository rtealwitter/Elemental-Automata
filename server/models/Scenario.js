/* eslint-disable camelcase */
const { Model } = require('objection');

class Scenario extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'Scenario';
  }

  // Objection.js assumes primary key is `id` by default

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        author: { type: 'string' },
        edited: { type: 'string' },
        sandbox: { type: 'string' }
        // not sure if sandbox property type is right,
        // couldn't find JSON or binary type in Objection documentation
      }
    };
  }
}

module.exports = Scenario;

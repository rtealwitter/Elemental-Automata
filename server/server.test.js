const { app, knex } = require('./server');
const request = require('supertest');

const scenario = {
  title: 'Beach',
  author: 'Tenzin',
  edited: '2019-04-24',
  sandbox: '100'
};

describe('Automata API', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
  });
  afterEach(() => {
    return knex.migrate.rollback();
  });
  // commented out until test can be updated
  // test('GET /api/scenarios should return all scenarios', () => {
  //   return request(app)
  //     .get('/api/scenarios')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .expect([Object.assign({ id: 1 }, scenario)]);
  // });

  describe('POST operations', () => {
    // commented out until test can be updated
    // test('Should create new scenario', () => {
    //   const newScenario = {
    //     title: 'A new scenario',
    //     author: 'Matt',
    //     edited: '2019-04-24',
    //     sandbox: '101'
    //   };
    //   return request(app)
    //     .post('/api/scenarios')
    //     .send(newScenario)
    //     .expect(200)
    //     .expect('Content-Type', /json/)
    //     .expect(Object.assign({ id: 2 }, newScenario));
    // });

    test('Should reject scenario with no title', () => {
      return request(app)
        .post('/api/scenarios')
        .send({})
        .expect(400);
    });

    test('Should reject scenario with a null title', () => {
      return request(app)
        .post('/api/scenarios')
        .send({ title: null })
        .expect(400);
    });

    test('Should reject scenario with no edited time', () => {
      return request(app)
        .post('/api/scenarios')
        .send({ title: 'A title' })
        .expect(400);
    });
  });

  describe('DELETE operations', () => {
    test('Should delete scenario', () => {
      return request(app)
        .delete('/api/scenarios/1')
        .expect(200)
        .then(() => {
          return request(app)
            .get('/api/scenarios')
            .expect(200)
            .expect([]);
        });
    });
  });
  describe('PUT operations', () => {
    // commented out until test can be updated
    // test('Should update scenario', () => {
    //   const newScenario = Object.assign({ id: 1 }, scenario, {
    //     sandbox: '110'
    //   });
    //   return request(app)
    //     .put('/api/scenarios/1')
    //     .send(newScenario)
    //     .expect(200)
    //     .expect(newScenario);
    // });

    test('Should reject scenario when id is different than URL', () => {
      const newScenario = Object.assign({ id: 2 }, scenario, {
        sandbox: '111'
      });
      return request(app)
        .put('/api/scenarios/1')
        .send(newScenario)
        .expect(400);
    });

    test('Should reject scenario with missing id', () => {
      const { id, ...newScenario } = Object.assign({}, scenario, {
        // eslint-disable-line no-unused-vars
        sandbox: '1000'
      });
      return request(app)
        .put('/api/scenarios/1')
        .send(newScenario)
        .expect(400);
    });

    test('Should reject scenario with extra fields', () => {
      const newScenario = Object.assign({ id: 1 }, scenario, { junk: 'Junk' });
      return request(app)
        .put('/api/scenarios/1')
        .send(newScenario)
        .expect(400);
    });
    test('Should reject scenario with invalid edited time', () => {
      return request(app)
        .post('/api/scenarios')
        .send({ title: 'A title', edited: '4' })
        .expect(400);
    });
  });
});

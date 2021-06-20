/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');

const agent = session(app);
const dog = {
  id:uuidv4(),
  nombre:"pug",
  altura:"20 - 30",
  peso:"20 - 25",
  vida:"15 year",
  imagen:"imagen"

};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se puede conectar a la base de datos:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('Deberia ser un respuesta Get 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('Deberia ser un Error 404', () =>
        agent.get('/dog').expect(404)
    );
  });
});

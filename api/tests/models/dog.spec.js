const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se puede conectar a la base de datos:', err);
    }));
  describe('Validacion', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('Debería arrojar un error si el nombre es nulo', (done) => {
        Dog.create({})
          .then(() => done(new Error('Requiere un nombre valido')))
          .catch(() => done());
      });
      it('Debería funcionar cuando es un nombre válido', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});

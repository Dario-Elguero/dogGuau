const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  
  sequelize.define('dog', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID
      //defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

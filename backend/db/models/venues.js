'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venues = sequelize.define('Venues', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    lat: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {});
  Venues.associate = function(models) {
    // associations can be defined here
  };
  return Venues;
};
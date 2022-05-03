'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    lat: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {});
  Venue.associate = function(models) {
    Venue.hasMany(models.Event, {foreignKey:'venueId'})
  };
  return Venue;
};

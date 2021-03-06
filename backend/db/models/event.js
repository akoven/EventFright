'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    hostId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    capacity: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.Venue, {foreignKey: 'venueId'});
    Event.belongsTo(models.Category, {foreignKey:'categoryId'});
    Event.hasMany(models.Ticket, {foreignKey:'eventId'});
    Event.belongsTo(models.User, {foreignKey:'hostId'});
  };
  return Event;
};

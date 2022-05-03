'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING.BINARY
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Event, {foreignKey: 'hostId'});
    user.hasMany(models.Ticket, {foreingKey:'userId'});
  };
  return User;
};

'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        email: 'user1@email.com',
        username: 'UrADemo',
        hashedPassword: bcrypt.hashSync('somepassword')
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      const Op = Sequelize.Op;
      return queryInterface.bulkDelete('Users', {
        username: {[Op.in]: ['UrADemo']}
      }, {});
    }
};

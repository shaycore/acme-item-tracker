const { conn } = require('./conn');
const { STRING, INTEGER } = conn.Sequelize;

const Thing = conn.define('thing', {
    name: {
      type: STRING 
    },
    rank: {
      type: INTEGER,
      defaultValue: 1
    }
  });

module.exports = {
    Thing
};
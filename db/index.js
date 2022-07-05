const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_acme_item_tracker_db');

const { STRING } = Sequelize;

const User = conn.define('user', {
  name: {
    type: STRING 
  }
});

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
  conn,
  User,
  Thing
};

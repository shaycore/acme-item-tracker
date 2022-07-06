const Sequelize = require('sequelize');
const { conn } = require('./conn');
const { User } = require('./User');
const { Thing } = require('./Thing');

const { STRING, INTEGER } = Sequelize;

// const User = conn.define('user', {
//   name: {
//     type: STRING 
//   }
// });

// const Thing = conn.define('thing', {
//   name: {
//     type: STRING 
//   },
//   rank: {
//     type: INTEGER,
//     defaultValue: 1
//   }
// });

// Thing.belongsTo(User);
// User.hasMany(Thing);

const syncAndSeed = async()=> {
  try {
    await conn.sync({ force: true });
    const [moe, larry, lucy, ethyl] = await Promise.all(
      ['Bob', 'Joe', 'lucy', 'ethyl'].map( name => User.create({ name }))
    );
    const [foo, bar, bazz, quq, fizz] = await Promise.all(
      ['Foo', 'Bar', 'Bazz', 'Quq', 'Fizz'].map( name => Thing.create({ name }))
    );
  }
  catch(err){
    console.log(err);
  }

};

module.exports = {
  syncAndSeed
};

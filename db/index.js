const Sequelize = require('sequelize');
const { conn } = require('./conn');
const { User } = require('./User');
const { Thing } = require('./Thing');

const syncAndSeed = async()=> {
  try {
    await conn.sync({ force: true });
    const [bob, joe, lucy, ethyl] = await Promise.all(
      ['Bob', 'Joe', 'Lucy', 'Ethyl'].map( name => User.create({ name }))
    );
    const [foo, bar, bazz, quq, fizz] = await Promise.all([
      Thing.create({ name: 'Foo', userId: bob.id }),
      Thing.create({ name: 'Bar', userId: lucy.id }),
      Thing.create({ name: 'Bazz', userId: lucy.id }),
      Thing.create({ name: 'Quq'}),
      Thing.create({ name: 'Fizz', userId: ethyl.id })
    ]);
  }
  catch(err){
    console.log(err);
  }

};

module.exports = {
  syncAndSeed
};

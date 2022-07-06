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
    const [keyboard, album, vodka, whiskey, chopsticks] = await Promise.all([
      Thing.create({ name: 'Keyboard', userId: bob.id, rank: 5 }),
      Thing.create({ name: 'Album', userId: ethyl.id }),
      Thing.create({ name: 'Whiskey', userId: lucy.id, rank: 3 }),
      Thing.create({ name: 'Vodka', userId: lucy.id }),
      Thing.create({ name: 'Chopsticks', rank: 2})
    ]);
  }
  catch(err){
    console.log(err);
  }

};

module.exports = {
  syncAndSeed
};

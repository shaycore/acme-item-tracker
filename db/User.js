const { conn } = require('./conn');
const { STRING } = conn.Sequelize;
const { Thing } = require('./Thing');

const User = conn.define('user', {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

Thing.belongsTo(User);
User.hasMany(Thing);

module.exports = {
    User
};
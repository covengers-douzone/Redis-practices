const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        timezone: "+09:00",
        dialect: 'mysql'
    }
);

//const User = require('./User')(sequelize);


// 1:N
// User.hasMany(Board,{
//     foreignKey: {
//         name: 'user_no',
//         allowNull: false,
//         constraints: true,
//         onDelete: 'CASCADE'
//     },
// });
// Board.belongsTo(User);
//
// User.sync({
//     force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
//     alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
// })
// Guestbook.sync({
//     force: process.env.TABLE_CREATE_ALWAYS === 'true',
//     alter: process.env.TABLE_ALTER_SYNC === 'true'
// })
// Gallery.sync({
//     force: process.env.TABLE_CREATE_ALWAYS === 'true',
//     alter: process.env.TABLE_ALTER_SYNC === 'true'
// })
// Site.sync({
//     force: process.env.TABLE_CREATE_ALWAYS === 'true',
//     alter: process.env.TABLE_ALTER_SYNC === 'true'
// })
// Board.sync({
//     force: process.env.TABLE_CREATE_ALWAYS === 'true',
//     alter: process.env.TABLE_ALTER_SYNC === 'true'
// })
//module.exports = {sequelize, User,Guestbook,Gallery,Site,Board };
module.exports = {sequelize};

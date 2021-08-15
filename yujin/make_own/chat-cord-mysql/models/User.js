const { Sequelize, DataTypes } = require('sequelize');

module.exports = function(sequelize){
    return sequelize.define('User', {
        no: {
            field: 'no',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userID: {
            field: 'userID',
            type: DataTypes.STRING(45),
            allowNull: false
        },
        name: {
            field: 'name',
            type: DataTypes.STRING(45),
            allowNull: true
        },
        isDeleted: {
            field: 'isDeleted',
            type: DataTypes.CHAR(1),
            allowNull: false
        },
        createdAt: {
            field: 'createdAt',
            type: DataTypes.DATE,
            allowNull: false
        },
        backgroundImageUrl: {
            field: 'backgroundImageUrl',
            type: DataTypes.TEXT,
            allowNull: true
        },
        profileImageUrl: {
            field: 'profileImageUrl',
            type: DataTypes.TEXT,
            allowNull: true
        },
        updateAt: {
            field: 'updateAt',
            type: DataTypes.DATE,
            allowNull: true
        },
        role: {
            field: 'role',
            type: DataTypes.STRING(45),
            allowNull: false
        },
    }, {
        underscored: false, // updateAt -> updateAt (underscored: update_at)
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        tableName: 'user'
    });
}

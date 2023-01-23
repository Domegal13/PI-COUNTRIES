const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('activity', {
       
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        difficulty:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isNumeric: true,
                isInt: true,
                min: 1,
                max: 5,
            }
        },

        duration:{
            type: DataTypes.INTEGER,
            allowNull:false,
            validate:{
                isNumeric: true,
                isInt: true,
            }
        },

        season:{
            type: DataTypes.ENUM('Summer', 'Spring', 'Autumn', 'Winter'),
            allowNull: false,
        },

    }, {
        timestamps: false,
    });
};
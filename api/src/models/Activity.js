const { DataTypes, Sequelize } = require('sequelize');

module.export = (sequelize) => {

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
                inNumeric: true,
                isInt: true,
            }
        },

        season:{
            type: DataTypes.ENUN('Summer', 'Spring', 'Autumn', 'Winter'),
            allowNull: false,
        },

    }, {
        timestamps: false,
    });
};
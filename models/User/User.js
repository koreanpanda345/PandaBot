module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('user', {
        user_id:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        lang:{
            type: DataTypes.BOOLEAN,
        },
    },{
        timestamps: false,
    });
};
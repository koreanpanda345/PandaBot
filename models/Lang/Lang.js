module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('lang', {
        user_id: DataTypes.STRING,
        lang: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            'default': false,
        }
    })
}
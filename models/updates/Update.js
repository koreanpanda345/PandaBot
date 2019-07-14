module.exports = (sequelize, DataTypes) => {
    return sequelize.define('updates', {
        date: {
            type: DataTypes.STRING,
        },
        desc:{
            type: DataTypes.TEXT,
        },
        update_date: {
            type: {
                type: DataTypes.STRING,
            },

        }
    })
}
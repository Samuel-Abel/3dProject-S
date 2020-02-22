module.exports = function(sequelize, DataTypes){
    return sequelize.define('forum', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        dimensions: DataTypes.STRING,
        owner: DataTypes.INTEGER,
        photo: DataTypes.STRING
    })
}
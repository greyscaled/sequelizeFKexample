'use strict'
module.exports = (sequelize, DataTypes) => {
  var Parent = sequelize.define('Parent', {
    name: DataTypes.STRING
  }, {})
  Parent.associate = function (models) {
    Parent.hasMany(models.Child, {
      foreignKey: 'parent_id'
    })
  }
  return Parent
}

'use strict'
module.exports = (sequelize, DataTypes) => {
  var Child = sequelize.define('Child', {
    name: DataTypes.STRING
  }, {})
  Child.associate = function (models) {
    Child.belongsTo(models.Parent, {
      foreignKey: 'parent_id'
    })
  }
  return Child
}

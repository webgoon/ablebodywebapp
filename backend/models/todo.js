module.exports = (sequelize, DataTypes) => {

  const Todo = sequelize.define("Todo", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });



  return Todo;

};

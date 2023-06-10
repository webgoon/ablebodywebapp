var Orders_ab = require('./orders_ab');
var Users_ab_cars = require('./users_ab_cars');
var Drivers_ab = require('./drivers_ab');

module.exports = (sequelize, DataTypes) => {

  const Users_ab = sequelize.define('Users_ab', 
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    user_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    users_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    user_firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_midname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_phoneno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_hireDriverIsOnline: {
      type: DataTypes.STRING(5),
      defaultValue: "false",
      allowNull: false
    },
    user_hireDriverHasOrder: {
      type: DataTypes.STRING(5),
      defaultValue: "false",
      allowNull: false
    },
    user_hirerating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    user_earnrating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    user_updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      attributes:['ON UPDATE CURRENT_TIMESTAMP'],
      allowNull: false
      
    },
    user_created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
      
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      attributes:['ON UPDATE CURRENT_TIMESTAMP'],
      allowNull: false,
      field: 'updatedAt'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
      field: 'createdAt'
    },
  }, 
  {
    // Not to pluralize our model name
    freezeTableName: true,
    timestamps: true
    // If I do not want createdAt or updatedAt
    //createdAt: false,
    //updatedAt: false
  });

  Users_ab.associate = models => {
    //const { Orders_ab, Users_ab_cars } = models

    Users_ab.hasMany(models.Orders_ab)
    models.Orders_ab.belongsTo(models.Users_ab)

    
    // Users_ab.hasMany(models.Users_ab_cars);
    // models.Users_ab_cars.belongsTo(models.Users_ab)

    
    // Users_ab.hasOne(models.Drivers_ab);
    
    
    // Users_ab.hasMany(models.Orders_ab);
    // Users_ab.hasMany(models.Users_ab_cars);
    // models.Users_ab_cars.belongsTo(models.Users_ab)

    // Users_ab.hasMany(models.Orders_ab)
    // models.Orders_ab.belongsTo(models.Users_ab)


    // Users_ab.hasMany(models.Orders_ab, {
    //   as: 'OrderStartedBy',
    //   foreignKey: 'order_startedByusrid',
    //   //sourceKey: 'user_id'
    // });

    // Users_ab.hasMany(models.Orders_ab, {
    //   as: 'OrderAcceptedBy',
    //   foreignKey: 'order_accptedByusrid',
    //   sourceKey: 'user_id'
    // });

    
  };

 

  return Users_ab;

};

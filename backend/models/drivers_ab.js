var Orders_ab = require('./orders_ab');
var User_ab_cars = require('./users_ab_cars');
var Drivers_ab_cars = require('./drivers_ab_cars');

module.exports = (sequelize, DataTypes) => {

  const Drivers_ab = sequelize.define('Drivers_ab', 
  {
    driver_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    driver_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driver_firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driver_midname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    driver_lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    driver_phoneno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driver_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driver_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driver_username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    driver_hireDriverIsOnline: {
      type: DataTypes.STRING(5),
      defaultValue: "false",
      allowNull: false
    },
    driver_hireDriverHasOrder: {
      type: DataTypes.STRING(5),
      defaultValue: "false",
      allowNull: false
    },
    driver_hirerating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    driver_earnrating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    driver_updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      attributes:[' ON UPDATE CURRENT_TIMESTAMP'],
      allowNull: false
      
    },
    driver_created_at: {
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

  Drivers_ab.associate = models => {


    // Drivers_ab.hasOne(models.Users_ab);
    
    
    Drivers_ab.hasMany(models.Drivers_ab_cars)
    models.Drivers_ab_cars.belongsTo(Drivers_ab)
    // Drivers_ab.hasMany(models.Orders_ab)

    //const { Orders_ab, User_ab_cars } = models

    // Drivers_ab.hasMany(models.user_ab_cars, {
    //   as: 'DriversCar',
    //   foreignKey: 'driver_id',
    // });
    
    // Drivers_ab.hasMany(models.Orders_ab, {
    //   as: 'OrderStartedBy',
    //   foreignKey: 'order_startedByusrid',
    //   //sourceKey: 'user_id'
    // });

    // Drivers_ab.hasMany(models.Orders_ab, {
    //   as: 'OrderAcceptedBy',
    //   foreignKey: 'order_accptedByusrid',
    //   sourceKey: 'user_id'
    // });

    
  };

 

  return Drivers_ab;

};

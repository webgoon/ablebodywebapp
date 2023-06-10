const User_ab = require('./users_ab');
const Users_ab_cars = require('./users_ab_cars');
var Drivers_ab = require('./drivers_ab');
var Drivers_ab_cars = require('./drivers_ab_cars');

module.exports = (sequelize, DataTypes) => {

  const Orders_ab = sequelize.define('Orders_ab', 
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    order_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_uuid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    order_typeId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order_startInstructs: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order_startbyTS:{
      type: DataTypes.STRING,
      allowNull: true
    },
    order_startedByusrid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_accptedByusrid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_accptedBydriverId:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_accptedByCarid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_startLat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    order_startLong: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    order_endLat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    order_endLong: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    order_paidAmount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    order_paidStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order_abcomisnAmt: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    order_payoutAvail: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    order_updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      attributes:[' ON UPDATE CURRENT_TIMESTAMP'],
      allowNull: false
    },
    order_created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    
  }, 
  {
    // Not to pluralize our model name
    freezeTableName: true,
  });

  /*  Orders_ab.belongsToMany(User_ab);
  User_ab.belongsToMany(Orders_ab); */



  Orders_ab.associate =  models => {

    Orders_ab.belongsTo(models.Users_ab);
    models.Users_ab.hasMany(Orders_ab);

    Orders_ab.hasOne(models.Users_ab_cars);
    Orders_ab.hasOne(models.Drivers_ab);

    // Orders_ab.belongsTo(models.Users_ab_cars);
    // models.Users_ab_cars.hasMany(Orders_ab);

    // Orders_ab.hasMany(models.Users_ab, { 
    //   as: 'UserAccepted',
    //   foreignKey: 'order_accptedByusrid',
    //   sourceKey: 'order_accptedByusrid'
    // });


  };

  return Orders_ab;

};

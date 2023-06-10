var Orders_ab = require('./orders_ab');
var Users_ab = require('./users_ab');
var Drivers_ab = require('./drivers_ab');

module.exports = (sequelize, DataTypes) => {

  const Drivers_ab_cars = sequelize.define('Drivers_ab_cars', 
  {
    drivers_car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    drivers_car_usr_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    drivers_car_token: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    drivers_car_isActive: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drivers_car_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drivers_car_lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    drivers_car_lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    drivers_car_heading: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drivers_car_year: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drivers_car_make: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drivers_car_model: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drivers_car_modeltrim: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drivers_car_bodystyle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drivers_car_tagstate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drivers_car_tagname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    drivers_car_updated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      attributes:['ON UPDATE CURRENT_TIMESTAMP'],
      allowNull: false,
      field: 'updatedAt',
    },
    drivers_car_created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      //defaultValue: DataTypes.NOW,
      allowNull: false,
      field: 'createdAt',
    
    },
  }, 
  {
    // Not to pluralize our model name
    freezeTableName: true,
    // don't forget to enable timestamps!
    timestamps: true,
    // I don't want createdAt
    //createdAt: false,
    //updatedAt: false
  });

  Drivers_ab_cars.associate = models => {

    // Drivers_ab_cars.belongsTo(models.Drivers_ab);
    Drivers_ab_cars.hasOne(models.Drivers_ab);
    models.Drivers_ab.hasMany(Drivers_ab_cars);
    // Drivers_ab_cars.hasMany(models.Orders_ab);

    // models.Drivers_ab.hasMany(models.Drivers_ab_cars);

    // Drivers_ab_cars.hasMany(models.Orders_ab);
    // models.Orders_ab.hasOne(Drivers_ab_cars);
    // models.Drivers_ab.hasMany(models.Orders_ab);

    //models.Orders_ab.belongsTo(Drivers_ab); //Does not work

    // Drivers_ab_cars.hasMany(models.Orders_ab, {
    //   as: 'UsersOrderByCar',
    //   foreignKey: 'order_accptedByCarid',
    //   sourceKey: 'users_car_id'
    //   //targetKey: 'users_car_id',
    // });

  //   Drivers_ab_cars.belongsTo(models.Orders_ab, { 
  //     foreignKey: 'user_id',
  //     sourceKey: 'order_accptedByCarid',
  //   });
    
  

    

   
   

    
   
   
   
  };

  return Drivers_ab_cars;

};

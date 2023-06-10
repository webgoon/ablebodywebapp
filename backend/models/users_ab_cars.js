var Orders_ab = require('./orders_ab');
var Users_ab = require('./users_ab');
var Drivers_ab = require('./drivers_ab');

module.exports = (sequelize, DataTypes) => {

  const Users_ab_cars = sequelize.define('Users_ab_cars', 
  {
    users_car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    users_car_usr_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    users_car_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    users_car_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false
    },
    users_car_isActive: {
      type: DataTypes.STRING(5),
      defaultValue: sequelize.literal("false"),
      allowNull: false
    },
    users_car_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    users_car_lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    users_car_lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    users_car_heading: {
      type: DataTypes.STRING,
      allowNull: true
    },
    users_car_year: {
      type: DataTypes.STRING,
      allowNull: true
    },
    users_car_make: {
      type: DataTypes.STRING,
      allowNull: true
    },
    users_car_model: {
      type: DataTypes.STRING,
      allowNull: true
    },
    users_car_modeltrim: {
      type: DataTypes.STRING,
      allowNull: true
    },
    users_car_bodystyle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    users_car_tagstate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    users_car_tagname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    users_car_updated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      attributes:['ON UPDATE CURRENT_TIMESTAMP'],
      allowNull: false,
      field: 'updatedAt',
    },
    users_car_created_at: {
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

  Users_ab_cars.associate = models => {

    // Users_ab_cars.belongsTo(models.Drivers_ab);
    // Users_ab_cars.hasOne(models.Drivers_ab);
    // Users_ab_cars.hasMany(models.Orders_ab)
    // models.Users_ab.hasMany(models.Users_ab_cars);

    // Users_ab_cars.hasMany(models.Orders_ab);
    // models.Orders_ab.hasOne(Users_ab_cars);
    // models.Users_ab.hasMany(models.Orders_ab);

    //models.Orders_ab.belongsTo(Users_ab); //Does not work

    // Users_ab_cars.hasMany(models.Orders_ab, {
    //   as: 'UsersOrderByCar',
    //   foreignKey: 'order_accptedByCarid',
    //   sourceKey: 'users_car_id'
    //   //targetKey: 'users_car_id',
    // });

  //   Users_ab_cars.belongsTo(models.Orders_ab, { 
  //     foreignKey: 'user_id',
  //     sourceKey: 'order_accptedByCarid',
  //   });
    
  

    

   
   

    
   
   
   
  };

  return Users_ab_cars;

};

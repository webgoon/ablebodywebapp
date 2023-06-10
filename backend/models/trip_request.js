module.exports = (sequelize, DataTypes) => {

    const TripRequest = sequelize.define('Trip_request', 
    {
      trip_userid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      trip_status: DataTypes.STRING,
      trip_title: DataTypes.STRING,
      trip_startInstructs: DataTypes.STRING,
    }, 
    {
      // Not to pluralize our model name
      freezeTableName: true,
    });

    return TripRequest;

};

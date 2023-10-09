module.exports = (sequelize, Sequelize) => {
    //states
    const User_profile = sequelize.define("user_profile", {
      id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status:{
        type:Sequelize.STRING
      },
      username:{
        type:Sequelize.STRING
      },
      firstname:{
        type:Sequelize.STRING
      },
      lastname:{
        type:Sequelize.STRING
      },
      country:{
        type:Sequelize.STRING
      },
      location:{
        type:Sequelize.STRING
      },
      language:{
        type:Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING
      },
      password:{
        type:Sequelize.STRING
      },
      image:{
        type : Sequelize.BLOB('long')
      }
    },{
      timestamps: false,
      tableName:'user_profile'
    });
    return  User_profile;
  };
  
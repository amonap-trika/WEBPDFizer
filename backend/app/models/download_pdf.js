module.exports = (sequelize, Sequelize) => {
    const Website_pdf = sequelize.define("website_pdf", {
      id: {
          type:Sequelize.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true
      },
      url: {
        type: Sequelize.STRING(500),
        allowNull:false
      },
      status: {
        type:   Sequelize.ENUM,
        values: ['0','1', '2', '3']
      },
      user_id: {
        type:Sequelize.INTEGER,
        allowNull:false
      }
    });
  
    return Website_pdf;
  };
  
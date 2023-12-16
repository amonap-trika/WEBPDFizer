module.exports = (sequelize, Sequelize) => {
    const Website_link = sequelize.define("website_link", {
      id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
      },
      website_id: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      link: {
        type: Sequelize.STRING(500),
        allowNull:false
      },
      pdf_generation_status: {
        type: Sequelize.ENUM,
        values: ['Y','N','E']
      },
      pdf_clubbing_status: {
        type: Sequelize.ENUM,
        values: ['Y','N','E']
      },
      pdf_name: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      pdf_part: {
        type:Sequelize.INTEGER,
        allowNull:false
      }
    });
  
    return Website_link;
  };
  
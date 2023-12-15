module.exports = (sequelize, Sequelize) => {
    const Website_pdf = sequelize.define("website_pdf", {
      id: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.STRING
      }
    });
  
    return Website_pdf;
  };
  
module.exports = (sequelize, Sequelize) => {
    const Website_link = sequelize.define("website_link", {
      id: {
        type: Sequelize.STRING
      },
      website_id: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      pdf_part: {
        type: Sequelize.STRING
      }
    });
  
    return Website_link;
  };
  
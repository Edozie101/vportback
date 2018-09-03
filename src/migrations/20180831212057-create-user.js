module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userType: {
        type: Sequelize.ENUM(),
        values: ["shipper",
        "dispatcher",
        "owner-operator",
        "company-driver"],
        allowNull: true,
      },
      truckType: {
        type: Sequelize.ENUM(),
        values:  ["auto-transporter"],
        allowNull: true,
      },
      insurancePhoto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stripeCustomerId: {
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.ENUM(),
        values:  ["driver", "user", "admin"],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface){
    return queryInterface.dropTable('Users');
  }
};
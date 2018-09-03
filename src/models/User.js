import { userTypes, truckTypes, roles } from "../utils/modelCostants";

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: "Firstname should be two or more characters long"
        },
        notEmpty: {
          args: true,
          msg: "Firstname cannot be empty"
        }
      } 
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 100],
          msg: "Lastname should be two or more characters long"
        },
        notEmpty: {
          args: true,
          msg: "Lastname cannot be empty"
        }
      } 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: {
        args: true,
        msg: "Invalid email."
      },
      unique: {
        args: true,
        msg: "Email already taken, use another"
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9]+$/,
          msg: "Invalid phone number"
        }
      },
      unique: {
        args: true,
        msg: "An account with this phone number exists"
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 100],
          msg: "Passsword should be at least 5 characters long"
        },
        notEmpty: {
          args: true,
          msg: "Provide a password."
        }
      }
    },
    userType:{
      type:  DataTypes.ENUM(),
      values: userTypes,
      allowNull: true
    },
    truckType: {
      type: DataTypes.ENUM(),
      values: truckTypes,
      allowNull: true
    },
    insurancePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: roles
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
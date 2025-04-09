const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  full_name: { type: DataTypes.STRING, allowNull: false },
  email_address: { type: DataTypes.STRING, allowNull: false, unique: true },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isIn: [["MALE", "FEMALE", "OTHER"]] },
  },
  description: { type: DataTypes.TEXT },
});

module.exports = User;

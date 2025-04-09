const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Option = sequelize.define("Option", {
  value: DataTypes.STRING,
  multiple: DataTypes.BOOLEAN,
  question_id: {
    // Changed to 'question_id' to match the association
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Option;

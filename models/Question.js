const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Question = sequelize.define("Question", {
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  required: DataTypes.BOOLEAN,
  text: DataTypes.TEXT,
  description: DataTypes.TEXT,
});

module.exports = Question;

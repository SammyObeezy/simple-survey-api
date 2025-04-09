const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Response = sequelize.define("Response", {
  response_text: DataTypes.TEXT,
  date_responded: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Response;

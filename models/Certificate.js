const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Certificate = sequelize.define("Certificate", {
  file_name: {
    type: DataTypes.STRING,
    allowNull: false, // Ensure file_name is required
  },
  file_format: {
    type: DataTypes.STRING,
    allowNull: false, // Ensure file_format is required
  },
  max_file_size_mb: {
    type: DataTypes.FLOAT, // Change from INTEGER to FLOAT or DOUBLE for more precision
    allowNull: false, // Ensure max_file_size_mb is required
  },
  multiple: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default to false if not specified
  },
});

module.exports = Certificate;

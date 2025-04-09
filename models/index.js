const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User");
const Question = require("./Question");
const Option = require("./Option");
const Response = require("./Response");
const Certificate = require("./Certificate");

// Define associations
User.hasMany(Response);
Response.belongsTo(User);

Question.hasMany(Response);
Response.belongsTo(Question);

Question.hasMany(Option, { as: "options", foreignKey: "question_id" }); // Updated foreignKey to 'question_id'
Option.belongsTo(Question, { foreignKey: "question_id", as: "question" }); // Updated foreignKey to 'question_id'

Response.hasMany(Certificate);
Certificate.belongsTo(Response);

module.exports = {
  sequelize, // This should export the sequelize instance
  User,
  Question,
  Option,
  Response,
  Certificate,
};

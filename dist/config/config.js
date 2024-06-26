"use strict";
const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelizes = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
});
module.exports = sequelizes;

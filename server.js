const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:abdu1882@localhost5432/basics"
);

console.log(sequelize);

app.listen(9000, console.log(9000));

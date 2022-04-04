const express = require("express");
const app = express();
const { Sequelize, DataTypes } = require("sequelize");
app.use(express.json());
const sequelize = new Sequelize(
  "postgres://postgres:abdu1882@localhost:5432/basics"
);
const Users = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

sequelize.sync({ force: false }).then(() => console.log("ok"));

app
  .route("/users")
  .get(async (_, res) => {
    res.send(await Users.findAll());
  })
  .post(async (req, res) => {
    const { name, age } = req.body;
    const newUser = await Users.create({ name, age });
    console.log(newUser);
    res.send(await Users.findAll());
  })
  .put(async (req, res) => {
    const { name, age, id } = req.body;
    const updatedUser = await Users.update({ name, age }, { where: { id } });
    res.send(await Users.findAll());
  })
  .delete(async (req, res) => {
    const { id } = req.body;
    const deleteUser = await Users.destroy({ where: { id } });
    console.log(deleteUser);
    res.send(await Users.findAll());
  });

app.listen(9000, console.log(9000));

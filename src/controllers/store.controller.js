const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Stores = db.store;
const { nanoid } = require("nanoid");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { Store } = require("express-session");

exports.createStore = async (req, res) => {
  console.log("createStore");
  Stores.create({
    storeId: await nanoid(10),
    storeName: req.body.storename,
    storeCategory: req.body.storecategory,
    pan: req.body.pan,
    gst: req.body.gst,
  })
    .then((user) => {
      res.send(user);
      User.findOne({
        where: {
          username: req.body.username,
        },
      }).then((user) => {
        console.log("working");
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.allStores = (req, res) => {
  console.log("AlL STORES");
  Stores.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteStore = (req, res) => {
  console.log("Delete Store");
  Stores.findOne({
    where: {
      storeId: req.body.storeid,
    },
  })
    .then((data) => {
      data.destroy();
      res.send("Deleted Store " + data.storeId);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

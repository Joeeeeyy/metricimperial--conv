'use strict';

const expect = require('chai').expect;
const router = require("express").Router();
const ConvertHandler = require('../controllers/convertHandler.js');

const ch = new ConvertHandler();

const checkValidity = (num, unit) => {
  if (num === "invalid number" && unit === "invalid unit") {
    throw new Error("invalid number and unit");
  }
  if (num === "invalid number") {
    throw new Error(num);
  }
  if (unit === "invalid unit") {
    throw new Error(unit);
  }
}

router.get("/", (req, res) => {
  try {
    const val = req.query.input;
    const initNum = ch.getNum(val);
    const initUnit = ch.getUnit(val);
    checkValidity(initNum, initUnit);
    const returnUnit = ch.getReturnUnit(initUnit);
    const returnNum = ch.convert(initNum, initUnit);
    const string = ch.getString(initNum, initUnit, returnNum, returnUnit);
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
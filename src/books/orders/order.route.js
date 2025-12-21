const express = require('express');
const { model } = require('mongoose');
const Order = require("./order.model");
const { createOrder, getOrderByEmail } = require('./order.controller');
const router = express.Router();



//1.Create an order endpoint
router.post("/create-order", createOrder)

//get orders by user email address
router.get("/email/:email", getOrderByEmail)
module.exports = router;
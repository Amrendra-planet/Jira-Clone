const routerDashboard = require('express').Router();
const { customLogic} = require("../node js login/controllers/dsahboard");
// const {sendMail} = require('../services/emailSender')


routerDashboard.post("", customLogic);
 

module.exports = routerDashboard;

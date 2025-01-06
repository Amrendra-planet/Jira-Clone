const routerDashboard = require('express').Router();
const { getAllFeedDashboard ,createDashboardEntry,searchByTitle} = require("../controllers/dsahboard");
const {sendMail} = require('../services/emailSender')

const verifyToken =require("../middleware/JWT")

routerDashboard.post("/create",verifyToken, createDashboardEntry);
routerDashboard.get("/get",verifyToken, getAllFeedDashboard);
routerDashboard.get("/email",verifyToken, sendMail);

routerDashboard.post("/search",verifyToken, searchByTitle);

// routerUser.delete("/delete/:id",verifyToken, deleteById);
// routerUser.put("/edit/:id",verifyToken, editById);

// routerUser.post("/login", login);

module.exports = routerDashboard;

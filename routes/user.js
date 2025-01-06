const routerUser = require('express').Router();
const { createUser, getAlluserList, deleteById, editById,login } = require("../controllers/user");
const verifyToken =require("../middleware/JWT")

routerUser.post("/create", createUser);
routerUser.get("/getUserList",verifyToken, getAlluserList);
routerUser.delete("/delete/:id",verifyToken, deleteById);
routerUser.put("/edit/:id",verifyToken, editById);

routerUser.post("/login", login);


module.exports = routerUser;
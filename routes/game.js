const routerGame = require('express').Router();
const {  getAllGame} = require("../controllers/game");


// routerGame.post("/create", createGame);
routerGame.get("/getAllGame", getAllGame);


module.exports = routerGame;



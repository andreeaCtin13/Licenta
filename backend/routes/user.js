const express = require("express");
const router = express.Router();

const useriController = require("../controllers").useri;

router.get("/", useriController.getAllUsers);
router.get("/login", useriController.login);
router.post("/register", useriController.register);

module.exports = router;

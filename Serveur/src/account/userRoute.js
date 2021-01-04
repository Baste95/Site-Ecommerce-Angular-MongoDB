const express = require("express");
const router = express.Router();
const userController = require("./userController");
const auth = require("../middleware/auth");


router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/data", auth, userController.defineDummyData);
router.post("/updateadress", auth, userController.updateAdress);
router.post("/updatemail", auth, userController.updateMail);

module.exports = router;
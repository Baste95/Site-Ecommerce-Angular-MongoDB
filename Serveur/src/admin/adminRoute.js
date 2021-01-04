const express = require("express");
const router = express.Router();
const adminController = require("./adminController");


router.post("/register", adminController.registerNewAdmin);
router.post("/login", adminController.loginAdmin);
//router.get("/adminData", auth, userController.defineDummyData)

module.exports = router;
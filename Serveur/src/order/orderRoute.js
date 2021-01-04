const express = require("express");
const router = express.Router();
const orderController = require("./orderController");
const auth = require("../middleware/auth");

router.post("/add", auth, orderController.addNewOrder);
router.post("/delete", orderController.deleteOrder);
router.post("/update", orderController.updateOrder);
router.get("/get", auth, orderController.getOrder);
router.get("/getrecommendation", auth, orderController.getRecommendation);


module.exports = router;
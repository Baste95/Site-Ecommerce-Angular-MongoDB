const express = require("express");
const router = express.Router();
const categorieController = require("./categorieController");


router.post("/add", categorieController.addNewCategorie);
router.get("/getall", categorieController.getCategories)
router.get("/get/:id", categorieController.getCategorie)
router.post("/update", categorieController.updateCategorie)
router.post("/delete", categorieController.deleteCategorie)

module.exports = router;
const express = require("express");
const router = express.Router();
const productController = require("./productController");


router.post("/add", productController.addNewProduct);
router.get("/getbycategorie/:id/:page", productController.getProductsByCategorie);
router.get("/getbysubcategorie/:id/:page", productController.getProductsBySubCategorie);
router.get("/get/:id", productController.getProduct);
router.post("/delete", productController.deleteProduct)
router.post("/update", productController.updateProduct)
router.get("/search/:id", productController.getProductsBySearch);
router.get("/search/:id/:category", productController.getProductsBySearchAndCategory);
router.get("/getbyreduction/:page", productController.getProductsByReduction);
router.get("/getnews", productController.getNewsProducts);
router.post("/note", productController.addNoteToProduct);
router.get("/getbyreductionhome", productController.getProductsByReductionHome);
router.get("/getnewshome", productController.getNewsProductsHome);

module.exports = router;
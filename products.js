const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const upload = require("../middlewares/upload").default;
const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");

router.post("/createProduct", upload.single("image"), createProduct);

router.get("/getProduct", getProduct);

router.delete("/deleteProduct", deleteProduct);

router.patch("/updateProduct", upload.single("image"), updateProduct);

module.exports = router;

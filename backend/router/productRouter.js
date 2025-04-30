/** @format */
const { Router } = require("express");
const router = Router();
const {
     index,
     getById,
     create,
     updateById,
     deleteById,
     deleteProductsImages,
} = require("../controller/productController.js");

const {
     productValidationRules,
     validate,
} = require("../validator/productValidator.js");

const { upload } = require("../middleware/uploadsMiddleware.js");

router.get("/products", index);
router.get("/products/:id", getById);
router.post(
     "/products",
     upload.array("images", 5),
     productValidationRules,
     validate,
     create,
);
router.put(
     "/products/:id",
     upload.array("images", 5),
     productValidationRules,
     validate,
     updateById,
);
router.delete("/products/:id/images", deleteProductsImages);
router.delete("/products/:id", deleteById);

module.exports = router;

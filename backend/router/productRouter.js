/** @format */
const { Router } = require("express");
const router = Router();
const {
     index,
     getById,
     save,
     updateById,
     deleteById,
     deleteProductsImages,
} = require("../controller/productController.js");

const {
     productValidationRules,
     validate,
} = require("../validator/productValidator.js");

const { upload } = require("../middleware/uploadsMiddleware.js");

router.get("/", index);
router.get("/getById/:id", getById);
router.post(
     "/save",
     upload.array("images", 5),
     productValidationRules,
     validate,
     save,
);
router.put(
     "/updateById/:id",
     upload.array("images", 5),
     productValidationRules,
     validate,
     updateById,
);
router.delete("/deleteProductsImages/:id/images", deleteProductsImages);
router.delete("/delete/:id", deleteById);

module.exports = router;

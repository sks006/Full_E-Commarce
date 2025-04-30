/** @format */

const { body, validationResult } =require( "express-validator");

 const productValidationRules = [
     body("name").notEmpty().withMessage("Name is required"),
     body("description").notEmpty().withMessage("Description is required"),
     body("price")
          .isFloat({ gt: 0 })
          .withMessage("Price must be greater than 0"),
     body("stock").isInt({ min: 0 }).withMessage("Stock must be 0 or greater"),
     body("brand").notEmpty().withMessage("Brand is required"),
     body("category_id").notEmpty().withMessage("Category ID is required"),
];

 const validate = (req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }
     next();
};

module.exports={validate,productValidationRules}
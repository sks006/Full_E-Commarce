/** @format */
const db = require("../models/index.js");
const path = require("path");
const fs = require("fs");

const index = async (req, res) => {
    
     try {
          const Product = await db.Products.findAll();
          res.status(200).json(Product);
     } catch (error) {
          console.error(error);
          res.status(500).json({
               message: "Internal server error in Products controller",
          });
     }
};

const getById = async (req, res) => {
     try {
          const { id } = req.params;
          const Product = await db.Products.findByPk(id);
          if (!Product) {
               return res.status(404).json({ message: "Products not found" });
          }
          res.status(200).json(Product);
     } catch (error) {
          console.error(error);
          res.status(500).json({
               message: "Internal server error in Products controller",
          });
     }
};

const save = async (req, res) => {
     try {
          const { name, description, price, stock, brand, category_id,seller_id } =
               req.body;

          const fileUrls = req.files.map(
               (file) =>
                    `${req.protocol}://${req.get("host")}/uploads/${
                         file.filename
                    }`,
          );

          const newProduct = await db.Products.create({
               name,
               description,
               price,
               stock,
               brand,
               category_id,
               images: fileUrls,
               seller_id,
               created_at: new Date(),
          });

          res.status(201).json(newProduct);
     } catch (error) {
           console.error("Error while creating Products:", error);
          res.status(500).json({
               message: "Internal Server Error while creating Products",
          });
     }
};

const updateById = async (req, res) => {
     try {
          const { id } = req.params;
          const {
               name,
               description,
               price,
               stock,
               brand,
               category_id,
               imagesToDelete = [],
          } = req.body;
          const Product = await db.Products.findByPk(id);

          if (!Product) {
               return res.status(404).json({ message: "Products not found" });
          }

          let updatedFields = {
               name,
               description,
               price,
               stock,
               brand,
               category_id,
          };

          // Delete selected images
          if (imagesToDelete.length > 0) {
               for (const imgUrl of imagesToDelete) {
                    const filePath = path.join(
                         __dirname,
                         "uploads",
                         path.basename(imgUrl),
                    );
                    fs.unlink(filePath, (err) => {
                         if (err && err.code !== "ENOENT")
                              console.error("Failed to delete:", filePath);
                    });
               }
               updatedFields.images = Products.images.filter(
                    (img) => !imagesToDelete.includes(img),
               );
          } else {
               updatedFields.images = Product.images;
          }

          // Add new uploaded images
          if (req.files && req.files.length > 0) {
               const newImages = req.files.map(
                    (file) =>
                         `${req.protocol}://${req.get("host")}/uploads/${
                              file.filename
                         }`,
               );
               updatedFields.images = updatedFields.images.concat(newImages);
          }

          await Product.update(updatedFields);

          res.status(200).json(Product);
     } catch (error) {
          console.error(error);
          res.status(500).json({
               message: "Internal Server Error while updating Products",
          });
     }
};

const deleteProductsImages = async (req, res) => {
     try {
          const { id } = req.params;
          const { imagesToDelete } = req.body;
          const Product = await db.Products.findByPk(id);

          if (!Product) {
               return res.status(404).json({ message: "Products not found" });
          }

          if (!imagesToDelete || imagesToDelete.length === 0) {
               return res
                    .status(400)
                    .json({ message: "No images specified for deletion" });
          }

          for (const imgUrl of imagesToDelete) {
               const filePath = path.join(
                    __dirname,
                    "uploads",
                    path.basename(imgUrl),
               );
               fs.unlink(filePath, (err) => {
                    if (err && err.code !== "ENOENT")
                         console.error("Failed to delete image:", filePath);
               });
          }

          const updatedImages = Product.images.filter(
               (img) => !imagesToDelete.includes(img),
          );
          await Product.update({ images: updatedImages });

          res.status(200).json({
               message: "Selected images deleted successfully",
               updatedImages,
          });
     } catch (error) {
          console.error(error);
          res.status(500).json({
               message: "Internal Server Error while deleting images",
          });
     }
};

const deleteById = async (req, res) => {
     try {
         
          const { id } = req.params;
          const Product = await db.Products.findByPk(id);

          if (!Product) {
               return res.status(404).json({ message: "Products not found" });
          }

          if (Product.images && Product.images.length > 0) {
               for (const imgUrl of Product.images) {
                    const filePath = path.join(
                         __dirname,
                         "uploads",
                         path.basename(imgUrl),
                    );
                    fs.unlink(filePath, (err) => {
                         if (err && err.code !== "ENOENT")
                              console.error(
                                   "Failed to delete image:",
                                   filePath,
                              );
                    });
               }
          }

          await Product.destroy();
          res.status(200).json({
               message: "Products and associated images deleted successfully",
          });
     } catch (error) {
          console.error(error);
          res.status(500).json({
               message: "Internal Server Error while deleting Products",
          });
     }
};

module.exports = {
     index,
     getById,
     save,
     updateById,
     deleteProductsImages,
     deleteById,
};

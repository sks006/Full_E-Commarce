/** @format */

"use strict";

module.exports = {
     up: async (queryInterface, Sequelize) => {
          const products = Array.from({ length: 100 }, (_, i) => ({
               seller_id: Math.floor(Math.random() * 100) ,
               category_id: Math.floor(Math.random() * 100) ,
               name: `Product ${i + 1}`,
               description: `This is a detailed description of Product ${
                    i + 1
               }. It's great for everyday use and has excellent features.`,
               price: Math.floor(Math.random() * 9000) + 500, // 500 - 9500
               stock: Math.floor(Math.random() * 50) + 10, // 10 - 60
               brand: ["Nike", "Adidas", "Apple", "Samsung", "Sony"][i % 5],
               images: JSON.stringify([
                    `https://picsum.photos/seed/${i + 1}/400/300`,
               ]),
               createdAt: new Date(),
               updatedAt: new Date(),
          }));

          await queryInterface.bulkInsert("Products", products, {});
     },

     down: async (queryInterface, Sequelize) => {
          await queryInterface.bulkDelete("Products", null, {});
     },
};

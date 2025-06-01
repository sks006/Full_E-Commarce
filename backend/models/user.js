/** @format */

"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
     class User extends Model {
          // Async method to validate password

          async isPasswordCorrect(password) {
               if (!password && !this.password) {
                    return false;
               }

               try {
                    // Convert both to strings to avoid comparison issues
                    const providedPassword = String(password);
                    const storedHash = String(this.password);

                    return await bcrypt.compare(providedPassword, storedHash);
               } catch (error) {
                    console.error("Password comparison error:", error);
                    return false; // Fail securely
               }
          }

          generateRefreshToken() {
               const refreshToken = jwt.sign(
                    { id: this.id },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: "7d" }, // Refresh token valid for 7 days
               );
               this.refreshToken = refreshToken;
               return refreshToken;
          }

          generateAccessToken() {
               return jwt.sign(
                    { id: this.id, email: this.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "15m" }, // Access token valid for 15 minutes
               );
          }

          static associate(models) {
               // Define associations here if needed
          }
     }

     User.init(
          {
               name: DataTypes.STRING,
               email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                         isEmail: true,
                         notEmpty: true,
                    },
               },
               password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                         len: [6, 100],
                         notEmpty: true,
                    },
               },
               gender: DataTypes.STRING,
               refreshToken: DataTypes.STRING,
               date_of_birth: DataTypes.STRING,
          },
          {
               sequelize,
               modelName: "User",
               // Sequelize equivalent in your User model definition
               hooks: {
                    beforeCreate: async (user) => {
                         console.log("Before create:", user.password);
                         
                         if (user.password) {
                              const saltRounds = 10;
                              user.password = await bcrypt.hash(
                                   user.password,
                                   saltRounds,
                              );
                         }
                    },
                    beforeUpdate: async (user) => {
                         if (user.changed("password") && user.password) {
                              const saltRounds = 10;
                              user.password = await bcrypt.hash(
                                   user.password,
                                   saltRounds,
                              );
                         }
                    },
               },
          },
     );

     return User;
};

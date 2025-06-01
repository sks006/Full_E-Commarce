/** @format */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/index.js");

/**
 * Generate Access and Refresh Tokens for a User
 */
const generateAccessAndRefreshTokens = async (UserId) => {
     const User = await db.User.findByPk(UserId);
     if (!User) throw new Error("User not found");

     const accessToken = jwt.sign(
          { id: User.id },
          process.env.ACCESS_TOKEN_SECRET,
          {
               expiresIn: "15m",
          },
     );

     const refreshToken = jwt.sign(
          { id: User.id },
          process.env.REFRESH_TOKEN_SECRET,
          {
               expiresIn: "7d",
          },
     );

     User.refreshToken = refreshToken;
     await User.save({ validateBeforeSave: false });

     return { accessToken, refreshToken };
};

/**
 * User Registration Handler
 */
const registerUser = async (req, res) => {
     const { email, password, name } = req.body;
     console.log("this is  error:", req.body);

     if (!email || !password) {
          return res
               .status(400)
               .json({ message: "Email and password are required" });
     }

     const existingUser = await db.User.findOne({ where: { email } });
     if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
     }

     const newUser = await db.User.create({
          email,
          password,
          name,
     });

     res.status(201).json({
          message: "User registered successfully",
          User: {
               id: newUser.id,
               name: newUser.name,
               email: newUser.email,
          },
     });
};

/**
 * User Login Handler
 */
const loginUser = async (req, res) => {
     const { email, password } = req.body;

     if (!email || !password) {
          return res
               .status(400)
               .json({ message: "Email and password are required" });
     }

     try {
          const user = await db.User.findOne({ where: { email } });
          if (!user) {
               return res
                    .status(401)
                    .json({ message: "Invalid email or password" });
          }

          const passwordValidate = await user.isPasswordCorrect(password);
          if (!passwordValidate) {
               return res
                    .status(401)
                    .json({ message: "Invalid email or password" });
          }

          const { accessToken, refreshToken } =
               await generateAccessAndRefreshTokens(user.id);

          // Cookie options for both tokens
          const commonCookieOptions = {
               httpOnly: true,
               secure: process.env.NODE_ENV === "development" ? false : true, // Set to true in production
               sameSite: "Strict",
          };

          // Set access token cookie (short-lived)
          res.cookie("accessToken", accessToken, {
               ...commonCookieOptions,
               maxAge: 15 * 60 * 1000, // 15 minutes
          });

          // Set refresh token cookie (long-lived)
          res.cookie("refreshToken", refreshToken, {
               ...commonCookieOptions,
               maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          // Return user data and access token in response
          return res.status(200).json({
               success: true,
               message: "Login successful",
               data: {
                    user: {
                         id: user.id,
                         name: user.name,
                         email: user.email,
                    },
                    accessToken, // For clients that prefer to store it in memory
               },
          });
     } catch (error) {
          console.error("Login error:", error);
          return res.status(500).json({ message: "Internal server error" });
     }
};

/**
 * Update Password Handler
 */
const updatePassword = async (req, res) => {
     const { email, currentPassword, newPassword } = req.body;

     if (!email || !currentPassword || !newPassword) {
          return res.status(400).json({ message: "All fields are required" });
     }

     try {
          const user = await db.User.findOne({ where: { email } });
          if (!user) {
               return res.status(404).json({ message: "User not found" });
          }

          // Verify current password
          const isCurrentValid = await bcrypt.compare(
               currentPassword,
               user.password,
          );
          if (!isCurrentValid) {
               return res
                    .status(401)
                    .json({ message: "Current password is incorrect" });
          }

          // Hash and save new password
          const newHashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = newHashedPassword;
          await user.save();

          return res
               .status(200)
               .json({ message: "Password updated successfully" });
     } catch (error) {
          console.error("Password update error:", error);
          return res.status(500).json({ message: "Internal server error" });
     }
};

/**
 * Refresh Token Handler
 */
const refreshToken = async (req, res) => {
     const { refreshToken } = req.body;

     if (!refreshToken) {
          return res.status(400).json({ message: "Refresh token is required" });
     }

     try {
          const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
          const User = await db.User.findByPk(decoded.id);
          if (!User || User.refreshToken !== refreshToken) {
               return res
                    .status(401)
                    .json({ message: "Invalid refresh token" });
          }

          const newAccessToken = jwt.sign(
               { id: User.id },
               process.env.JWT_SECRET,
               { expiresIn: "15m" },
          );

          const newRefreshToken = jwt.sign(
               { id: User.id },
               process.env.JWT_SECRET,
               { expiresIn: "7d" },
          );

          User.refreshToken = newRefreshToken;
          await User.save();

          res.status(200).json({
               message: "Access token refreshed successfully",
               accessToken: newAccessToken,
               refreshToken: newRefreshToken,
          });
     } catch (error) {
          return res.status(403).json({ message: "Token verification failed" });
     }
};
const logout = async (req, res) => {
     try {
          // Update user to remove refreshToken using Sequelize
          await db.User.update(
               { refreshToken: null }, // Set refreshToken to null
               {
                    where: { id: req.user.id },
                    returning: true, // For PostgreSQL
                    plain: true,
               },
          );

          const options = {
               httpOnly: true,
               secure: process.env.NODE_ENV === "development", // Set secure only in production
          };

          return res
               .status(200)
               .clearCookie("accessToken", options)
               .clearCookie("refreshToken", options)
               .json({
                    success: true,
                    message: "User logged out successfully",
                    data: {},
               });
     } catch (error) {
          console.error("Logout error:", error);
          return res.status(500).json({
               success: false,
               message: "Internal server error during logout",
          });
     }
};
module.exports = {
     registerUser,
     loginUser,
     refreshToken,
     generateAccessAndRefreshTokens,
     updatePassword,
     logout,
};

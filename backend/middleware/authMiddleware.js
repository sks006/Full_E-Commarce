/** @format */

const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

const verifyJwt = async (req, res, next) => {
     try {
          // ✅ Rule: Get token from cookie or Authorization header
          const token =
               req.cookies?.accessToken ||
               req.headers["authorization"]?.replace("Bearer ", "");
          
               console.log("Token received:", token);
               

          if (!token) {
               return res
                    .status(401)
                    .json({ message: "Access token is required" });
          }

          // ✅ Rule: Decode & verify the token using secret
          const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

          // ✅ Rule: Fetch user by primary key with selected attributes
          const user = await User.findByPk(decoded.id, {
               attributes: { exclude: ["password", "refreshToken"] },
          });

          if (!user) {
               return res.status(404).json({ message: "User not found" });
          }

          // ✅ Rule: Attach user to request for downstream access
          req.user = user;

          // ✅ Rule: Continue to next middleware
          next();
     } catch (error) {
          console.error("JWT verification error:", error);
          return res.status(403).json({ message: "Invalid or expired token" });
     }
};

module.exports = { verifyJwt };

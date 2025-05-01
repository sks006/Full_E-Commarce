const express = require('express');
const app= express();
const cors = require('cors');
const dotenv = require('dotenv');
const path=require('path')
dotenv.config();

const productRouter =require("./router/productRouter")

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/products",productRouter)

app.get("/", (req, res) => {
     res.status(200).json({
          status: "success",
          message: "Server is running",
          port: PORT,
          environment: process.env.NODE_ENV || "development",
     });
});

PORT= process.env.PORT || 5000;
app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`);
});




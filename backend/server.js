////Environment & Imports////
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

////App & Config////
const app = express();
const PORT = process.env.PORT || 5000;

////Middleware////
app.use(cors({
    origin: [
        //The frontend origins permitted by cors
        "http://localhost:5173",
        process.env.CLIENT_ORIGIN
    ]
}));
app.use(express.json());

////Routes////
app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

/////////////Import and use routes/////////////

////Database & Server Startup////
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Error:", error);
        process.exit(1); //stops app if DB fails
    });
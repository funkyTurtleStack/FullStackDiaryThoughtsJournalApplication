////Environment & Imports////
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

////App & Config////
const app = express();
const PORT = process.env.PORT || 5000;

////Middleware////
app.use(cors({
    origin: [
        //The frontend origins permitted by cors
        "http://localhost:5173",
        "https://fullstackdiarythoughtsjournalapplicat.netlify.app",
         process.env.CLIENT_ORIGIN
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

////Routes////
const authRoutes = require("./routes/auth.routes.js");
//const entryRoutes = require("./routes/entries.routes.js");
//const tagRoutes = require("./routes/tags.routes.js");

app.use("/api/auth", authRoutes);
//app.use("/api/entries", entryRoutes);
//app.use("/api/tags", tagRoutes);

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

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
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        email:
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },
        password:
        {
            type: String,
            required: true,
        },
        username:
        {
            type: String,
        },
    },
    {
       timestamps: true, 
    }
);

//hooks
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);

    next();
});

//method for verifying password
userSchema.methods.verifyPassword = async function(inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        name:
        {
            type: String,
            trim: true,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
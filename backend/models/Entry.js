const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true,
        },
        tags:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            } 
        ],
        title:
        {
            type: String,
            trim: true,
        },
        content:
        {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Entry = mongoose.model("Entry", entrySchema);
module.exports = Entry;
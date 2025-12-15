const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { requireAuth } = require("../middleware/auth.middleware.js");
const Tag = require("../models/Tag");

const router = express.Router();

/**
 * POST /api/tags
 * Description: make a new tag
 * Access: Private
 */
router.post("/", requireAuth, async (req, res) => {
    try{
        const tag = new Tag({
            name: req.body.name,
            user: req.userId
        });

        const savedTag = await tag.save();
        res.status(201).json(savedTag);
    }
    catch (err){
        res.status(400).json({message: err.message});
    }
});

/**
 * GET /api/tags
 * Description: get the list of tags
 */
router.get("/", async (req, res) => {
    try{
        
    }
    catch (err){

    }
});

/**
 * PUT /api/tags:id
 * Description: change a tag
 */

/**
 * DELETE /api/tags/:id
 * Description: delete a tag
 */


module.exports = router;
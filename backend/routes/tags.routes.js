const express = require("express");
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
 * Access: Private
 */
router.get("/", requireAuth, async (req, res) => {
    try{
        const tags = await Tag.find({ user: req.userId });
        
        res.json(tags);
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

/**
 * GET /api/tags/:id
 * Description: get a specific tag
 * Access: Private
 */
router.get("/:id", requireAuth, async (req, res) => {
    try{
        const tag = await Tag.findOne({
            _id: req.params.id,
            user: req.userId
        });
        
        if(!tag){
            return res.status(404).json({message: "Tag not found"});
        }

        res.json(tag);
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

/**
 * PUT /api/tags/:id
 * Description: change a tag
 * Access: Private
 */
router.put("/:id", requireAuth, async (req, res) => {
    try{
        const changedTag = await Tag.findOneAndUpdate(
            {_id: req.params.id, user: req.userId},
            {name: req.body.name},
            {new: true, runValidators: true}
        );

        if(!changedTag){
            return res.status(404).json({message: "Tag not found"});
        }

        res.json(changedTag);
    }
    catch (err){
        if(err.name === "ValidationError"){
            return res.status(400).json({message: err.message});
        }

        res.status(500).json({message: err.message});
    }
});

/**
 * DELETE /api/tags/:id
 * Description: delete a tag
 * Access: Private
 */
router.delete("/:id", requireAuth, async (req, res) => {
    try{
        const deletedTag = await Tag.findOneAndDelete({
        _id: req.params.id,
        user: req.userId
        })

        if(!deletedTag){
            return res.status(404).json("Tag not found");
        }

        res.json({"message": "Tag deleted successfully", "tag": deletedTag});
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});


module.exports = router;
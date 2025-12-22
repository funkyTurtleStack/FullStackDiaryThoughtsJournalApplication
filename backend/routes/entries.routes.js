const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware.js");
const Entry = require("../models/Entry");
const Tag = require("../models/Tag");

const router = express.Router();

/**
 * GET /api/entries
 * Description: get the list of entries
 *      can filter by tags
 *      can sort by date or alphabetically, asc or desc
 * Access: Private
 */
router.get("/", requireAuth, async (req, res) => { 
    try{
        const{tags, sort, order} = req.query;

        // 1. Base filter (always enforce ownership)
        const filter = {user: req.userId};

        // 2. Optional tag filtering
        if(tags){
            const tagNames = tags.split(",");

            const userTags = await Tag.find({
                user: req.userId,
                name: {$in: tagNames}
            }).select("_id");

            const tagIds = userTags.map(tag => tag._id);

            // If no matching tags exist, return empty list early
            if (tagIds.length === 0) {
                return res.json([]);
            }

            filter.tags = { $in: tagIds };
        }

        // 3. Optional sorting
        let sortOption = {};
        if (sort === "date"){
            sortOption.createdAt = order === "asc" ? 1 : -1;
        }
        else if(sort === "alpha"){
            sortOption.title = order === "asc" ? 1 : -1;
        }

        // 4. Query execution
        const entries = await Entry.find(filter).sort(sortOption);

        res.json(entries);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * POST /api/entries
 * Description: make a new entry
 * Access: Private
 */
router.post("/", requireAuth, async (req, res) => {
    try{
        const entry = new Entry({
            user: req.userId,
            tags: req.body.tags,
            title: req.body.title,
            content: req.body.content,
            summary: req.body.summary
        })

        const savedEntry = await entry.save();

        res.status(201).json(savedEntry);
    }
    catch (err){
        res.status(400).json({message: err.message});
    }
});

/**
 * GET /api/entries/:id
 * Description: get an individual entry
 * Access: Private
 */
router.get("/:id", requireAuth, async (req, res) => {
    try{
        const specificEntry = await Entry.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if(!specificEntry){
            return res.status(404).json({message: "Entry not found"});
        }

        res.json(specificEntry);
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

/**
 * PUT /api/entries/:id
 * Description: update an entry
 * Access: Private
 */
router.put("/:id", requireAuth, async (req, res) => {
    try{
        const updates = {};

        if(req.body.title !== undefined) updates.title = req.body.title;
        if(req.body.content !== undefined) updates.content = req.body.content;
        if(req.body.summary !== undefined) updates.summary = req.body.summary;
        if(req.body.tags !== undefined) updates.tags = req.body.tags;

        const updatedEntry = await Entry.findOneAndUpdate(
            {_id: req.params.id, user: req.userId},
            updates,
            {new: true, runValidators: true}
        );

        if(!updatedEntry){
            return res.status(404).json({message: "Entry not found"});
        }

        res.json(updatedEntry);
    }
    catch (err){
        if(err.name === "ValidationError"){
            return res.status(400).json({message: err.message});
        }
        res.status(500).json({message: err.message});
    }
});

/**
 * DELETE /api/entries/:id
 * Description: delete an entry
 * Access: Private
 */
router.delete("/:id", requireAuth, async (req, res) => {
    try{
        const deletedEntry = await Entry.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if(!deletedEntry){
            return res.status(404).json({message: "Entry not found"});
        }

        res.json({"message": "Entry deleted successfully", "entry": deletedEntry})
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
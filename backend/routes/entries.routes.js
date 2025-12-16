const express = require("express");
const { requireAuth } = require("../middleware/auth.middleware.js");
const Tag = require("../models/Entry");

const router = express.Router();


//(allow for filtering by tags AND sorting by tags AND sorting by (date OR alphabetical))
/**
 * GET /api/entries
 * Description: get the list of entries
 * Access: Private
 */
router.get("/", requireAuth, async (req, res) => {
    try{

    }
    catch (err){

    }
});

/**
 * POST /api/entries
 * Description: make a new entry
 * Access: Private
 */
router.post("/", requireAuth, async (req, res) => {
    try{

    }
    catch (err){
        
    }
});

/**
 * GET /api/entries/:id
 * Description: get an individual entry
 * Access: Private
 */
router.get("/:id", requireAuth, async (req, res) => {
    try{

    }
    catch (err){
        
    }
});

/**
 * PUT /api/entries/:id
 * Description: update an entry
 * Access: Private
 */
router.put("/:id", requireAuth, async (req, res) => {
    try{

    }
    catch (err){
        
    }
});

/**
 * DELETE /api/entries/:id
 * Description: delete an entry
 * Access: Private
 */
router.delete("/:id", requireAuth, async (req, res) => {
    try{

    }
    catch (err){
        
    }
});

module.exports = router;
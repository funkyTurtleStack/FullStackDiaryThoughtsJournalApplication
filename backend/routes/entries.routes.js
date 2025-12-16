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


/**
 * POST /api/entries - make a new entry
 */


/**
 * GET /api/entries/:id - get an individual entry
 */


/**
 * PUT /api/entries/:id - update an entry
 */


/**
 * DELETE /api/entries/:id - delete an entry
 */


module.exports = router;
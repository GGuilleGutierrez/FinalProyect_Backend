const express = require('express');
const { getAll, getOne, create, update, deleteOne } = require('../controllers/product.js');
const router = express.Router();

router.get("/", getAll)
router.get("/:id", getOne)
router.post("/create", create)
router.put("/update/:id", update)
router.delete("/delete/:id", deleteOne)

module.exports = router
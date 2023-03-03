const express = require('express');
const { getAllProds, createProd, updateProd, deleteProd, register, login, deleteUser, getAllUsers } = require('../controllers/ctrls.js');
const router = express.Router();

router.get("/", getAllProds)
// router.get("/:id", getOne)
router.post("/create", createProd)
router.put("/update/:id", updateProd)
router.delete("/delete/:id", deleteProd)

router.post("/register", register)
router.post("/login", login)
router.get("/users", getAllUsers)
router.delete("/deleteUser/:id", deleteUser)

module.exports = router
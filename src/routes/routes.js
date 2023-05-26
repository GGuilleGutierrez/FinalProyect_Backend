const express = require('express');
const { getAllProds, createProd, updateProd, deleteProd, registerUser, registerAdmin, login, deleteUser, getAllUsers, createPreference } = require('../controllers/ctrls.js');
const router = express.Router();

router.get("/", getAllProds)
// router.get("/:id", getOne)
router.post("/create", createProd)
router.put("/update/:id", updateProd)
router.delete("/delete/:id", deleteProd)

router.post("/register", registerUser)
router.post("/admin", registerAdmin)
router.post("/login", login)
router.get("/users", getAllUsers)
router.delete("/deleteUser/:id", deleteUser)

router.post("/buy", createPreference)
module.exports = router
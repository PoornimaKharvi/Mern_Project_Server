const express = require("express");
const router = express.Router();

const userController = require("../controller/auth");

router.post("/register", userController.register);
router.post("/registerUserDetails", userController.registerUserDetails);
router.post("/login", userController.login);
router.get("/details", userController.details);
router.post("/removeUser", userController.removeUser);
router.put("/update", userController.update);
router.get("/logout", userController.logout);

module.exports = router;

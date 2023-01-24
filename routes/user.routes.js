const { Router } = require("express");
const { usersController } = require("../controllers/user.controllers");
const authorization = require("../auth");

const router = Router();

router.post("/register", usersController.registerUser);
router.post("/login", usersController.login);
router.get("/users", usersController.getUsers);
router.get("/users/myProfile", authorization, usersController.getMe);

module.exports = router;

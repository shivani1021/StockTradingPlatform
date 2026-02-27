const { signup } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/signup", signup);

module.exports = router;
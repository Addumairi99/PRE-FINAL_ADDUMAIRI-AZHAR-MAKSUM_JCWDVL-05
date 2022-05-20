const router = require("express").Router();
const { auth } = require("../helpers/authToken");
const autho = require("../helpers/authorization-token");

// import user controller
const { user } = require("../controllers");

// define route
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/keeplogin", autho, user.keeplogin);
router.patch("/verified", auth, user.verifyUser);
router.patch("/edit/:id", user.edituser);

// export * modules
module.exports = router;

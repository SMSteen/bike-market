const { authController } = require("../controllers");
const router = require("express").Router();

module.exports = router
  .get("/:id", authController.show)
  .post("/login", authController.login)
  .post("/register", authController.register)
  .delete("/logout/:id", authController.logout);

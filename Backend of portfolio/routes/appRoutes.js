const AppRouter = require ("express").Router();
const UserController = require("../controller/UserController");
const MyProjectController = require("../controller/MyProjectController");

AppRouter.get("/", UserController.UserHome);
AppRouter.get("/get-user-messages", UserController.getUserList);
AppRouter.post("/sending-message", UserController.saveUserData);
AppRouter.get("/project",MyProjectController.getMyProjectList);

module.exports = AppRouter;
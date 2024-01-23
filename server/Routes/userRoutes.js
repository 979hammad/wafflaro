import express from "express";
import wrapAsync from "../Middlewares/wrapAsync.js";
import { userLogIn, userSignUp, userLogOut, changePassword, myProfile, editProfile, deleteUserAccount, changeNumbers, getNumbers, getAllUsers, deleteSpecificUser, addRemoveAdmin } from "../Controllers/userFunc.js";
import { isLoggedIn, checkAdmin } from "../Middlewares/Authentication.js";
const router = express.Router();

router.route("/signup").post(wrapAsync(userSignUp));
router.route("/signin").post(wrapAsync(userLogIn));
router.route("/logout").post(wrapAsync(isLoggedIn), wrapAsync(userLogOut));
router.route("/changepassword").post(wrapAsync(isLoggedIn) , wrapAsync(changePassword));
router.route("/myprofile").get(wrapAsync(isLoggedIn) , wrapAsync(myProfile));
router.route("/editprofile").post(wrapAsync(isLoggedIn), wrapAsync(editProfile));
router.route("/deleteuseraccount").delete(wrapAsync(isLoggedIn), wrapAsync(deleteUserAccount));
// admin routes 
router.route("/getnumbers").get(wrapAsync(isLoggedIn), checkAdmin("admin"), wrapAsync(getNumbers));
router.route("/changenumbers").post(wrapAsync(isLoggedIn), checkAdmin("admin"), wrapAsync(changeNumbers));
router.route("/getallusers").get(wrapAsync(isLoggedIn), checkAdmin("admin"), wrapAsync(getAllUsers));
router.route("/deletespecificuser/:id").delete(wrapAsync(isLoggedIn), checkAdmin("admin"), wrapAsync(deleteSpecificUser));
router.route("/addremoveadmin/:id").post(wrapAsync(isLoggedIn), checkAdmin("admin"), wrapAsync(addRemoveAdmin));

export default router;
import express from "express";
import wrapAsync from "../Middlewares/wrapAsync.js";
import multer from "multer";
import { wafflaroImageStorage } from "../Middlewares/CloudinaryConfig.js";
import { isLoggedIn, checkAdmin } from "../Middlewares/Authentication.js";
import { addNewItem, deleteItem, getAllItems, getSingleItem, updateItem, searchItem, addHeaderImg, getHeaderImage } from "../Controllers/itemFunc.js";
const uploadItemImage = multer({storage : wafflaroImageStorage});
const router = express.Router();

router.route("/addnew").post(wrapAsync(isLoggedIn), checkAdmin("admin"), uploadItemImage.single('itemPic'), wrapAsync(addNewItem));
router.route("/getallitems").get(wrapAsync(getAllItems));
router.route("/getsingleitem/:id").get(wrapAsync(getSingleItem));
router.route("/searchitem").get(searchItem);
router.route("/updateitem/:id").post(wrapAsync(isLoggedIn), checkAdmin("admin"), uploadItemImage.single('itemPic'), wrapAsync(updateItem));
router.route("/deleteitem/:id").delete(wrapAsync(isLoggedIn), checkAdmin("admin"), wrapAsync(deleteItem))
router.route("/addheaderimg/:id").post(wrapAsync(isLoggedIn), checkAdmin("admin"), uploadItemImage.single('itemPic'), wrapAsync(addHeaderImg))
router.route("/getheaderimg").get(wrapAsync(getHeaderImage))


export default router;

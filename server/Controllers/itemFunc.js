import { headerImg } from "../Database/Models/headerImgModel.js";
import { Item } from "../Database/Models/productModel.js";
import ExpressError from "../Middlewares/ExpressError.js";
import { v2 as cloudinary } from "cloudinary";

const addHeaderImg = async (req, res) => {
  if (!req.file) {
    throw new ExpressError(400, "Kindly Select Image");
  }

  const existingImageData = await headerImg.findById(req.params.id);
  console.log(existingImageData)

  await cloudinary.uploader.destroy(existingImageData.headerImage.filename);

  const { path, filename } = req.file;
  const uploadResult = await cloudinary.uploader.upload(path);
  
  if (existingImageData) {
    existingImageData.headerImage = {
      path: uploadResult.secure_url,
      filename: uploadResult.public_id,
    };
    const updatedImageData = await existingImageData.save();

    res.status(200).json({
      success: true,
      headerImage: updatedImageData,
    });
  } else {
    throw new ExpressError(404, "No such header image exists");
  }
}

const getHeaderImage = async (req, res) => {
  const hImages = await headerImg.find({});
  res.status(200).json({
    hImages
  })
}

const addNewItem = async (req, res) => {
  const { itemName, description, price, category } = req.body;

  if (!itemName || !description || !price || !category) {
    throw new ExpressError(400, "Please Enter all required fields");
  } else {
    let imagePath;
    let imageFilename;

    if (req.file) {
      imagePath = req.file.path;
      imageFilename = req.file.filename;
    } else {
      // If no image is provided, use default values or handle as per your requirement
      imagePath =
        "https://res.cloudinary.com/dni5tyfft/image/upload/v1700908646/hostify.pk%5BUserImages%5D/tvqwpi9qzkjxyqjzl9ar.png";
      imageFilename = "hostify.pk[UserImages]/tvqwpi9qzkjxyqjzl9ar";
    }

    const dataToSave = new Item({
      itemName,
      description,
      price,
      category,
      itemImage: { path: imagePath, filename: imageFilename },
    });
    const newItem = await dataToSave.save();
    res.status(201).json({
      success: true,
      newItem,
    });
  }
};

const getAllItems = async (req, res) => {
  const { itemName, category } = req.query;
  const queryObject = {};
  if (itemName) {
    queryObject.itemName = { $regex: itemName, $options: "i" };
  }
  if (category) {
    queryObject.category = { $regex: category, $options: "i" };
  }

  const gotAllItems = await Item.find(queryObject);
  res.status(200).json({
    success: true,
    gotAllItems,
    message: "hey buddy working fine...",
  });
};

const getSingleItem = async (req, res) => {
  const gotSingleItem = await Item.findById(req.params.id);
  if (!gotSingleItem) {
    throw new ExpressError(404, "No such item exists");
  }
  res.status(200).json({
    success: true,
    gotSingleItem,
  });
};

const searchItem = async (req, res) => {
  const allItems = await Item.find({});
  const {searchItem} = req.query;
  
  const groupedItems = allItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
  
    // Check if the itemName includes the search term
    if(searchItem){
      if (item.itemName.toLowerCase().includes(searchItem.toLowerCase())) {
        acc[item.category].push(item);
      }
    }else{
      acc[item.category].push(item);
    }
    
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    groupedItems,
    message: "Items grouped by category successfully.",
  });
};

const updateItem = async (req, res) => {
  const { itemName, description, price, category } = req.body;
  const {id} = req.params;
  const data = await Item.findById(id);

  await cloudinary.uploader.destroy(data.itemImage.filename);

  const updateData = {
    itemName,
    description,
    price,
    category,
  };

  if (req.file) {
    const { path: imagePath, filename: imageFilename } = req.file;
    updateData.itemImage = { path: imagePath, filename: imageFilename };
  }

  const itemFound = await Item.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  if (!itemFound) {
    throw new ExpressError(403, "No such item exists");
  }

  res.status(200).json({
    success: true,
    item: itemFound,
  });
};

const deleteItem = async (req, res) => {
  const itemFound = await Item.findById(req.params.id);
  if (!itemFound) {
    throw new ExpressError(404, "No such item exists");
  }
  // Deleting image from cloudinary storage
  await cloudinary.uploader.destroy(itemFound.itemImage.filename);

  // Deleting data from database
  await itemFound.deleteOne();

  res.json({
    success: true,
    message: "Item deleted successfully",
  });
};

export {
  addNewItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
  searchItem,
  addHeaderImg,
  getHeaderImage
};

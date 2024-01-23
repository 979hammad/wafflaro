import { User } from "../Database/Models/userModel.js";
import { setNumbers } from "../Database/Models/numbersModel.js";
import bcrypt from "bcrypt";
import ExpressError from "../Middlewares/ExpressError.js";
import jwt from "jsonwebtoken";

const userSignUp = async (req, res) => {
  const { name, email, pNumber, password, cPassword } = req.body;
  if (!name || !email || !pNumber || !password || !cPassword) 
  {
    throw new ExpressError(400, "Please Enter all required fields");
  } 
  else 
  {
    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new ExpressError(404, "Email already registered kindly login");
    }
    if (password === cPassword) {
     
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const dataToSave = new User({ name, email, pNumber, password: hashedPassword });
      const newUser = await dataToSave.save();
      
      const token = jwt.sign({ id: newUser._id }, process.env.jwtkey);
      res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
      
      res.status(201).json({
        success: true,
        token,
        newUser,
      });
    } else {
      throw new ExpressError(400, "Password and Confirm Password don't match");
    }
  }
};

const userLogIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ExpressError(400, "Please enter both email and password");
    } else {
      const userFound = await User.findOne({ email });
      if (userFound) {
        const passwordMatched = await bcrypt.compare(
          password,
          userFound.password
        );
        if (passwordMatched) {
          const token = jwt.sign({ id: userFound._id }, process.env.jwtkey);
          res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
          res.status(200).json({
            success: true,
            token,
            userFound,
          });
        } else {
          throw new ExpressError(401, "Password or Email is incorrect");
        }
      } else {
        throw new ExpressError(401, "Please SignUp first to create account");
      }
    }
};

const userLogOut = async (req, res) => {
    res.cookie("token", null, { httpOnly: true, expires: new Date(Date.now()) });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, cNewPassword } = req.body;
  if (!oldPassword || !newPassword || !cNewPassword) {
    throw new ExpressError(401, "Please fill all required password feilds");
  } else {
    const loggedInUser = req.user;
    const userFound = await User.findById(loggedInUser.id);
    const passwordMatched = await bcrypt.compare(
      oldPassword,
      loggedInUser.password
    );
    if (!passwordMatched) {
      throw new ExpressError(403, "Please Enter correct Old password");
    } else {
      if (newPassword == cNewPassword) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        userFound.password = hashedPassword;
        await userFound.save();
        res.status(200).json({
          success: true,
          message: "Password changed successfully",
        });
      } else {
        throw new ExpressError(
          400,
          "Please Enter New Password and Confirm Password same"
        );
      }
    }
  }
};

const changeNumbers = async (req, res) => {
  const {whatsappNumber, mobileNumber} = req.body;
  const prevNumber = await setNumbers.findOne({});

  if (whatsappNumber) prevNumber.whatsappNumber = whatsappNumber;
  if (mobileNumber) prevNumber.mobileNumber = mobileNumber;
 
  const numbers = await prevNumber.save();
  res.status(200).json({
    success: true,
    numbers
  });
}

const getNumbers = async (req, res) => {
  const numbers = await setNumbers.findOne({});  
  
    res.status(200).json({
      success: true,
      numbers
    });
}

const myProfile = async (req, res) => {
    const userFound = await User.findById(req.user.id, { password: 0, userPic: 0,});  
    res.status(200).json({
      success: true,
      user: userFound,
    });
};
  
const editProfile = async (req, res) => {
    const { name, email, pNumber } = req.body;
    const loggedInUser = await User.findById(req.user.id);

    if (name) loggedInUser.name = name;
    if (email) loggedInUser.email = email;
    if (pNumber) loggedInUser.pNumber = pNumber;
   
    const updatedUser = await loggedInUser.save();
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
};
  
const deleteUserAccount = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    // Deleting data from database
    await userFound.deleteOne();
  
    res.json({
      success: true,
      msg: "Your account deleted successfully",
    });
};

// Admin Routes 
const getAllUsers = async (req, res) => {
    const allUsers = await User.find({});
    res.json({
      success: true,
      allUsers,
    });
}

const deleteSpecificUser = async(req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  if(user.role === "admin"){
    return res.status(200).json({
      message : "Can't delete admin"
    })
  }

  await User.findByIdAndDelete(req.params.id)
  await User.find({});
  res.status(200).json({
    message : "User Deleted Successfully"
  })
}

const addRemoveAdmin = async(req, res) => {
  const user = await User.findById(req.params.id);
  console.log(req.params.id)
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  if(user.role === "admin"){
    user.role = "user"
  }else{
    user.role = "admin"
  }

  await user.save();
  res.status(200).json({
    message : "Status Updated"
  })

}

export { userSignUp, userLogIn, userLogOut, changePassword, myProfile, editProfile, deleteUserAccount, changeNumbers, getNumbers, getAllUsers, deleteSpecificUser, addRemoveAdmin };

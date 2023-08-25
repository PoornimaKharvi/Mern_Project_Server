const express = require("express");
const router = express.Router();
// const cookieParser = require("cookie-parser");
require("../db/conn");
const User = require("../model/dataSchema");
const Credentials = require("../model/userCredentialSchema");


// router.use(cookieParser());
const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password,"name, email, password")
  if ((!name, !email, !password)) {
    return res.status(422).json({
      errors: "Fill the all details",
    });
  } // 422 Unprocessable Entity
  
  try {
    const userExist = await Credentials.findOne({ email: email });
  console.log(name, email, password,"name, email, password",userExist)

    if (userExist) {
      return res.status(409).json({ error: "User already exists" }); //409 Conflic or user already exist
    } else {
      const user = new Credentials({
        name,
        email,
        password,
      });
      console.log(user,"user")
      const userRegister = await user.save();
      if (userRegister) {
        return res
          .status(201)
          .json({ message: "User registered successfully" }); //201 Created or successfull register
      }
    }
  } catch (err) {
    next(err);
  }
};

const registerUserDetails = async (req, res, next) => {
  console.log("registerUserDetails", req.body)
  const { name, email, mobile, designation, gender, course, image } = req.body;
  console.log(name, email, mobile, designation, gender, course, image, "registerUserDetails")
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ error: "User already exists" });
    } else {
      const user = new User({
        name, email, mobile, designation, gender, course, image
      });
      const userRegister = await user.save();
      if (userRegister) {
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        error: "fill the data",
      });
    }
    const userLogin = await Credentials.findOne({ email: email });
    console.log(userLogin);
    if (!userLogin) {
      return res.status(401).json({ error: "User not registered" });
    }

    if (!userLogin || userLogin.password !== password) {
      res.status(400).json({ message: "user error" });
    } else {
      res.status(200).json({
        message: "user signed in successfully",
        name: userLogin.name,
        id: userLogin._id,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//user detail fetching
const details = async (req, res) => {
  console.log("details")
  try {

    const allUser = await User.find({});

    console.log("allUser", allUser)
    res.status(200).json(allUser);
  } catch (err) {
    // If an error occurs during fetching
    res.status(500).json({ message: "Internal server error" }); // Internal server error status
    console.log(err, "Error fetching users =>");
  }
};

//delete user
const removeUser = async (req, res) => {
  const { id } = req.body;
  // console.log(_id);
  console.log("----------remove user", req.body);
  // res.send("user remover");

  if (id) {
    await User.deleteOne({ _id: id });
    res.json({
      error: false,
      message: "User deleted successfully",
    });
  }
};

//update user
const update = async (req, res) => {
  const {   name,
    email,
    mobile,
    designation,
    gender,
    course, _id } = req.body;
  try {
    updatedUser = await User.updateOne(
      { _id: _id },
      {
        $set: {
          name:name,
          email:email,
          mobile:mobile,
          designation:designation,
          gender:gender,
          course:course,
        },
      }
    );
    if (updatedUser) {
      return res.status(200).json({
        message: "updated successfully ",
        data: heamatology,
      });
    }
  } catch (e) {
    console.log(e, "update error");
  }
};

// logout
const logout = (req, res) => {
  res.status(200).send("user logout");
};


module.exports = {
  register,
  login,
  details,
  logout,
  update,
  removeUser,
  registerUserDetails
};

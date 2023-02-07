const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../Utils/SendMail");
const OtpGenerator = require("otp-generator");
const OTP = require("../Models/Otpmodel");

const Register = async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  //validate
  if (!name || !email || !phone || !role || !password) {
    return res.json({success:false,message:"Enter all required fields"});
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({success:false,message:"User already exist"});

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User({
      name,
      email,
      phone,
      role,
      password: hashPassword,
    });
    const savedUser = await newUser.save();

    //log user in
    const payload = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      phone: savedUser.phone,
      role: savedUser.role,
      isAdmin: savedUser.isAdmin,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET);
    console.log(token);
    //send cookie send token http only
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send("New User Created");
  } catch (error) {
    console.log(error.message);
    return res.json({success:false,message:error});
  }
};

///Login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate
    if (!email || !password) {
      return res
        .json({ success: false, message: "Enter all required fields" });
    }
    const user = await User.findOne({ email: email });
    console.log("user=>" + user);
    if (user === null) {
      console.log(user);
      console.log({ success: false, message: "invalid email password" });
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const matchedpassword = await bcrypt.compare(password, user.password);
    console.log("password match failed" + matchedpassword);
    if (!matchedpassword) {
      return res
        .json({ success: false, message: "Invalid  password" });
    }
    //log user in
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    console.log(token);
    //send cookie send token http only
    await res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({ success:true,message: "User loggedin" });
  } catch (error) {
    console.log(error);
    return res
      .json({ success: false, message: "Something went wrong" });
  }
};
const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      // expires: new Date(0),
    });
    return res.status(200).json("User Logged Out");
  } catch (error) {
    return res.json("Something went wrong");
  }
};
//all users
const AllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length < 1) {
      return res.json("No users found");
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong");
  }
};

const SingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.json("No users found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.json("Something went wrong");
  }
};

const LoggedIn = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }
    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (error) {
    console.log(error.message);
    res.json(false);
  }
};

const IsAdminUser = async (req, res) => {
  const IsAdmin = req.user.isAdmin;
  res.status(200).json(IsAdmin);
};
//update user
const UpdateUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    const { name, email, role, phone, password } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.password = req.body.password || password;
    user.role = role;

    const updateUser = await user.save();
    res.status(200).json({
      message: "User update",
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      photo: updateUser.photo,
      phone: updateUser.phone,
      bio: updateUser.bio,
    });
  } else {
    res.json("User not found");
  }
};
//Delete user
const DeleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    if (!user) {
      return res.json("No user found");
    } else {
      return res.status(200).json("User Deleted");
    }
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
};

//update password
const UpdatePassword = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.json("User not found , Please singup");
  }
  //validate
  const { oldPassword, password } = req.body;
  if (!oldPassword || !password) {
    res.json("Please add old and new password");
  }
  //check if password is matchces in db
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
  //
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password Changed");
  } else {
    res.json("Old password is incorrect");
  }
};

const Profile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.json("No user");
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};

//forgot password
const ForgotPassword = async (req, res) => {
  const email = req.body.email;
  console.log(email);
  const user = await User.findOne({ email: email });
  console.log(user);

  if (!user) {
    return res.json({
      success: null,
      message: "No user Found Invalid Email address",
    });
  }
  console.log("userfound" + user);

  const generatedOtp = await OtpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  if (!generatedOtp) {
    return res
      .json({ success: false, message: "something went wrong" });
  }

  console.log(generatedOtp);

  const payload = {
    id: user._id,
    email: user.email,
    otp: generatedOtp,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  // console.log(token);

  let newOtp = await OTP({
    otp: generatedOtp,
    userId: user._id,
    expiresAt: new Date(),
    createdAt: new Date(),
  });
  newOtp = await newOtp.save();

  //reset email
  const message = `
  <h2>Hello ${user.name}</h2>
  <p>This is otp of reset OTP and only  valid for 30 minuts</p>
  <h1>${generatedOtp}</h1>
    <p>Regards Pinevent Team</p> 
  `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  try {
    await sendEmail(subject, message, send_to, sent_from);
    //delete otp after 5 minutes
    setTimeout(async () => {
      const otpid = newOtp._id;
      const otpdelete = await OTP.findByIdAndDelete({ _id: otpid });
      if (!otpdelete) console.log("otp not found");
      console.log("otp deleted");
    }, 300000);

    console.log("email sent");
    return res.status(200).json({
      success: true,
      message: "Reset Otp Sent",
      resetToken: token,
    });
  } catch (error) {
    return res
      .json({ success: false, message: "Email not sent, Please again later" });
  }
};

//verify otp
const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  console.log("params token" + req.params.token);
  const token = await jwt.verify(req.params.token, process.env.JWT_SECRET);
  if (!token) return res.json({ success: false, message: "Session expired" });

  const userId = token.id;
  console.log("user id" + userId);
  const verifyotp = await OTP.findOne({ otp: otp, userId: userId });
  if (!verifyotp) {
    console.log("invalid otp");
    return res.json({success:false,message:"Invalid otp"});
  }
  console.log("token id" + token.id);
  const payload = {
    id: token.id,
    email: token.email,
  };
  console.log("otp ver payload" + payload.id);
  const verificationtoken = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log("verification token" + verificationtoken);
  return res.status(200).json({
    success: true,
    message: "Otp Verified Successfully",
    resetToken: verificationtoken,
  });
};

const ResetPassword = async (req, res) => {
  const { password } = req.body;
  const token = req.params.token;
  const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
  if (!verifytoken) return res.json("Session expired");

  console.log(verifytoken);

  const userId = verifytoken.id;
  console.log("userid" + userId);
  const user = await User.findOne({ _id: userId });
  console.log("user" + user);

  //find user
  if (!user) {
    return res.json("Something went wrong");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    user.password = hashPassword;
    await user.save();
    console.log("passsword changed");
    res
      .status(200)
      .json({ success: true, message: "password updated please login" });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "Something went wrong Please try again after some time",
    });
  }
};

module.exports = {
  Register,
  Login,
  AllUser,
  SingleUser,
  Logout,
  LoggedIn,
  IsAdminUser,
  UpdateUser,
  UpdatePassword,
  ForgotPassword,
  verifyOtp,
  ResetPassword,
  Profile,
  DeleteUser,
};
//

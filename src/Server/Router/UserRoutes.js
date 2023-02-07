const {
  Register,

  AllUser,
  SingleUser,
  Logout,
  LoggedIn,
  IsAdminUser,
  UpdateUser,
  UpdatePassword,
  Profile,
  ForgotPassword,
  ResetPassword,
  Login,
  DeleteUser,
  verifyOtp,
} = require("../Controllers/UserControllers");
const Protect = require("../Middleware/Protect");
const router = require("express").Router();

//auth routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/all-users", Protect, AllUser);
router.get("/single-user/:id", Protect, SingleUser);

// is admin
router.get("/isAdmin-user/", Protect, IsAdminUser);

//special route
router.get("/loggedIn", LoggedIn);

//password
router.patch("/update-user/:id", Protect, UpdateUser);
router.delete("/delete-user/:id", Protect, DeleteUser);
router.patch("/update-password", Protect, UpdatePassword);

//forgot password
router.post("/forgot-password", ForgotPassword);
router.post("/verify-otp/:token", verifyOtp);
router.put("/reset-password/:token", ResetPassword);

//get profile
router.get("/user-profile", Protect, Profile);

module.exports = router;

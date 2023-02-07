const jwt = require("jsonwebtoken");

const Protect = (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("=====>"+token);
    if (!token) {
      return res.status(401).json("-->Unauthorized");
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("VERIFIEHGFHG"+verified);
    // console.log("verify token" + JSON.stringify(verified));
    req.user = {
      id: verified.id,
      name: verified.name,
      email: verified.email,
      phone: verified.phone,
      role: verified.role,
      isAdmin: verified.isAdmin,
    };
    // console.log(req.user);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json("==>>Unauthorized");
  }
};
module.exports = Protect;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Correctly access the cookie
  const token = req.cookies.authToken; // Use req.cookies instead of res.cookie

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;

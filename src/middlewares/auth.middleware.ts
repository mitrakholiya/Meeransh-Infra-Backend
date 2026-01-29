import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


import { JwtPayload } from "jsonwebtoken";

interface JwtUserPayload extends JwtPayload {
  id: string;
  email: string;
  role: "admin" | "user";
}


interface AuthRequest extends Request {
  user?: JwtUserPayload;
}

export const jwtChecker = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtUserPayload;

    //  Role check
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can access this resource",
      });
    }

    // Attach user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized or token expired",
    });
  }
};

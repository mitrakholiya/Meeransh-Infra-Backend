import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const jwtChecker = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Expected format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // 3. Attach user to request
    req.user = decoded;

    // 4. Allow request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized / Invalid token" });
  }
};

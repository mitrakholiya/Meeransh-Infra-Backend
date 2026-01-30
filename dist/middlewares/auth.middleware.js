import jwt from "jsonwebtoken";
export const jwtChecker = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token missing or invalid" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //  Role check
        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Only admin can access this resource",
            });
        }
        // Attach user
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Unauthorized or token expired",
        });
    }
};

import jwt from "jsonwebtoken";
export const genrateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
};

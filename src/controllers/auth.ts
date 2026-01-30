import Auth from "../models/auth.js"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { genrateToken } from "../middlewares/jwt.js"

export const adminRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body

        const check = await Auth.findOne({ email })

        if (check) {
            res.status(400).json({ mes: "user is alreacy Register" })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const admin = await Auth.create({ email, password: hashPassword ,role:"admin"})

        res.status(201).json({
            token: genrateToken(admin._id.toString(),admin.role.toString()),
            admin: { id: admin._id, email: admin.email, role: admin.role }
        })
        return;
    } catch (err) {
        res.status(500).json({ message: "Registration Failed" })
    }
}
export const adminLogin = async (req: Request, res: Response) => {
    try {
        // 1. Get data from body
        const { email, password } = req.body;


        // 2. Find admin
        const admin = await Auth.findOne({ email });

        if (!admin) {
            return res
                .status(400)
                .json({ message: "Email or password is incorrect" });
        }

        // 3. Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordMatch) {
            return res
                .status(400)
                .json({ message: "Email or password is incorrect" });
        }

        // 4. Generate JWT
        res.status(201).json({
            token: genrateToken(admin._id.toString(), admin.role.toString()),
            admin: { id: admin._id, email: admin.email, role: admin.role }
        })
        return;
    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
};
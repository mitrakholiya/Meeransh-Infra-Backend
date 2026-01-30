import { Request, Response } from "express";
import Contact from "../models/contact.js";

export const postContact = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, city, message } = req.body;
        const estimate = new Contact({
            name: name ,
            email: email ,
            phone: phone ,
            city: city ,
            message: message ,
        });

        await estimate.save();

        res.status(201).json({
            success: true,
            message: "Form submitted successfully",
            data: estimate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
        return;
    }
};
export const getContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const contacts = await Contact.find();

        if (contacts.length === 0) {
            res.status(200).json({
                success: true,
                message: "No contacts found",
                data: [],
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const contact = await Contact.findByIdAndDelete(id)
        if (!contact) {
            res.status(404).json({
                success: false,
                message: "No contacts Deleted",
                data: [],
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: contact,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}
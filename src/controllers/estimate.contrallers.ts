import { Request, Response } from "express";
import Estimate from "../models/Estimate";

export const createEstimate = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, city, message } = req.body;

    const estimate = new Estimate({
      name,
      email,
      phone,
      city,
      message,
      file: req.file ? req.file.filename : null,
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
  }
};

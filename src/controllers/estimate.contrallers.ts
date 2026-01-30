import { Request, Response } from "express";
import Estimate from "../models/Estimate.js";
import { v2 as cloudinary } from "cloudinary";

export const createEstimate = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, city, message } = req.body;
    const fileUrl = req.file ? req.file.path : null;       // Cloudinary URL
    const publicId = req.file ? req.file.filename : null;
    const originalname = req.file ? req.file.originalname:null ;
    const estimate = new Estimate({
      name,
      email,
      phone,
      city,
      message,
      fileUrl,
      publicId,
      originalname
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


export const getEstimates = async (req: Request, res: Response) => {
  try {
    const estimates = await Estimate.find();
    res.status(200).json({
      success: true,
      data: estimates,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error,
    });
  }
};



export const deleteEstimate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const estimate = await Estimate.findById(id);
    if (!estimate) {
      res.status(404).json({
        success: false,
        message: "Estimate not found",
      });
      return;
    }

    // delete from cloudinary first
    if (estimate.publicId) {
      await cloudinary.uploader.destroy(estimate.publicId as string);
    }

    await estimate.deleteOne();

    res.status(200).json({
      success: true,
      message: "Estimate deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

import Estimate from "../models/Estimate.js";
export const createEstimate = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
export const getEstimates = async (req, res) => {
    try {
        const estimates = await Estimate.find();
        res.status(200).json({
            success: true,
            data: estimates,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
export const deleteEstimate = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const estimate = await Estimate.findByIdAndDelete(id);
        if (!estimate) {
            res.status(404).json({
                success: false,
                message: "No estimates Deleted",
                data: [],
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: estimate,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

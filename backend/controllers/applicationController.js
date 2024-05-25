import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

// Controller function to handle posting a job application
export async function postApplication(req, res, next) {
    const { role } = req.user;
    // Check if the user role is Employer, if yes, return an error
    if (role === "Employer") {
        return next(
            new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
    }

    // Check if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Resume File Required!", 400));
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    // Check if uploaded file format is allowed
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(
            new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
        );
    }

    // Upload resume to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );

    // Handle Cloudinary upload errors
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
    }

    // Extract application details from request body
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "Job Seeker",
    };

    // Check if jobId is provided
    if (!jobId) {
        return next(new ErrorHandler("Job not found!", 404));
    }

    // Fetch job details
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new ErrorHandler("Job not found!", 404));
    }

    const employerID = {
        user: jobDetails.postedBy,
        role: "Employer",
    };

    // Validate all required fields
    if (
        !name ||
        !email ||
        !coverLetter ||
        !phone ||
        !address ||
        !applicantID ||
        !employerID ||
        !resume
    ) {
        return next(new ErrorHandler("Please fill all fields.", 400));
    }

    // Create application
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    // Send success response
    res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
    });
}
// export async function postApplication(req, res, next) {
//     try {
//         const { role } = req.user;

//         // Check if the user role is Employer, if yes, return an error
//         if (role === "Employer") {
//             throw new ErrorHandler("Employer not allowed to access this resource.", 400);
//         }

//         // Check if files are uploaded
//         if (!req.files || !req.files.resume) {
//             throw new ErrorHandler("Resume File Required!", 400);
//         }

//         const { resume } = req.files;
//         const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

//         // Check if uploaded file format is allowed
//         if (!allowedFormats.includes(resume.mimetype)) {
//             throw new ErrorHandler("Invalid file type. Please upload a PNG file.", 400);
//         }

//         // Upload resume to Cloudinary
//         const cloudinaryResponse = await cloudinary.uploader.upload(
//             resume.tempFilePath,
//             { folder: "Anand" } // Specify the folder name here
//         );

//         // Handle Cloudinary upload errors
//         if (!cloudinaryResponse || cloudinaryResponse.error) {
//             console.error(
//                 "Cloudinary Error:",
//                 cloudinaryResponse.error || "Unknown Cloudinary error"
//             );
//             throw new ErrorHandler("Failed to upload Resume to Cloudinary", 500);
//         }

//         // Extract application details from request body
//         const { name, email, coverLetter, phone, address, jobId } = req.body;
//         const applicantID = {
//             user: req.user._id,
//             role: "Job Seeker",
//         };

//         // Check if jobId is provided
//         if (!jobId) {
//             throw new ErrorHandler("Job not found!", 404);
//         }

//         // Fetch job details
//         const jobDetails = await Job.findById(jobId);
//         if (!jobDetails) {
//             throw new ErrorHandler("Job not found!", 404);
//         }

//         const employerID = {
//             user: jobDetails.postedBy,
//             role: "Employer",
//         };

//         // Validate all required fields
//         if (
//             !name ||
//             !email ||
//             !coverLetter ||
//             !phone ||
//             !address ||
//             !applicantID ||
//             !employerID ||
//             !resume
//         ) {
//             throw new ErrorHandler("Please fill all fields.", 400);
//         }

//         // Create application
//         const application = await Application.create({
//             name,
//             email,
//             coverLetter,
//             phone,
//             address,
//             applicantID,
//             employerID,
//             resume: {
//                 public_id: cloudinaryResponse.public_id,
//                 url: cloudinaryResponse.secure_url,
//             },
//         });

//         // Send success response
//         res.status(200).json({
//             success: true,
//             message: "Application Submitted!",
//             application,
//         });
//     } catch (error) {
//         // Pass error to the error handling middleware
//         next(error);
//     }
// }
// Controller function to get all applications submitted by employers
export async function employerGetAllApplications(req, res, next) {
    const { role } = req.user;
    // Check if user role is Job Seeker, if yes, return an error
    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
    }

    // Find applications by employer ID
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });

    // Send success response with applications
    res.status(200).json({
        success: true,
        applications,
    });
}

// Controller function to get all applications submitted by job seekers
export async function jobseekerGetAllApplications(req, res, next) {
    const { role } = req.user;
    // Check if user role is Employer, if yes, return an error
    if (role === "Employer") {
        return next(
            new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
    }

    // Find applications by job seeker ID
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });

    // Send success response with applications
    res.status(200).json({
        success: true,
        applications,
    });
}

// Controller function to delete a job application submitted by a job seeker
export async function jobseekerDeleteApplication(req, res, next) {
    const { role } = req.user;
    // Check if user role is Employer, if yes, return an error
    if (role === "Employer") {
        return next(
            new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
    }

    // Find application by ID
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Application not found!", 404));
    }

    // Delete application
    await application.deleteOne();

    // Send success response
    res.status(200).json({
        success: true,
        message: "Application Deleted!",
    });
}

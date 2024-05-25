import mongoose from "mongoose";
import validator from "validator";

// Define application schema
const applicationSchema = new mongoose.Schema({
    // Applicant's name field
    name: {
        type: String,
        required: [true, "Please enter your Name!"],
        minLength: [3, "Name must contain at least 3 Characters!"], // Minimum length constraint
        // maxLength: [30, "Name cannot exceed 30 Characters!"], // Maximum length constraint
    },
    // Applicant's email field
    email: {
        type: String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email!"], // Validation using validator library
    },
    // Applicant's cover letter field
    coverLetter: {
        type: String,
        required: [true, "Please provide a cover letter!"],
    },
    // Applicant's phone number field
    phone: {
        type: Number,
        required: [true, "Please enter your Phone Number!"],
    },
    // Applicant's address field
    address: {
        type: String,
        required: [true, "Please enter your Address!"],
    },
    // Applicant's resume field containing public_id and URL
    resume: {
        public_id: {
            type: String,
            required: true, // Field is required
        },
        url: {
            type: String,
            required: true, // Field is required
        },
    },
    // Applicant ID and role
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId, // User's MongoDB ObjectId
            ref: "User", // Reference to the User model
            required: true, // Field is required
        },
        role: {
            type: String,
            enum: ["Job Seeker"], // Role must be "Job Seeker"
            required: true, // Field is required
        },
    },
    // Employer ID and role
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId, // User's MongoDB ObjectId
            ref: "User", // Reference to the User model
            required: true, // Field is required
        },
        role: {
            type: String,
            enum: ["Employer"], // Role must be "Employer"
            required: true, // Field is required
        },
    },
});

// Create and export the Application model using the applicationSchema
export const Application = mongoose.model("Application", applicationSchema);

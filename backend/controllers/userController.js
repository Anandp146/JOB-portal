
import { User } from '../models/userSchema.js';
import ErrorHandler from '../middlewares/error.js';
import { sendToken } from '../utils/jwtToken.js';
import bcrypt from 'bcrypt';
// Function to register a new user
export async function register(req, res, next) {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
        return next(new ErrorHandler("Please fill full form!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already registered!"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
    });
    sendToken(user, 201, res, "User Registered!");
}

export async function login(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide email ,password and role."));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    if (user.role !== role) {
        return next(
            new ErrorHandler(`User with provided email and ${role} not found!`, 404)
        );
    }
    sendToken(user, 201, res, "User Logged In!");
}

// Function to log out a user
export async function logout(req, res, next) {
    try {
        // Clear token cookie
        res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged Out Successfully.",
        });
    } catch (error) {
        next(error);
    }
}

// Function to get all users (for admin purposes)
export async function getUser(req, res, next) {
    try {
        const users = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            users: users
        });
    } catch (error) {
        next(error);
    }
}

// Function to change/update user password
// Function to change/update user password
export async function updatePassword(req, res, next) {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Validate incoming data
        if (!email || !oldPassword || !newPassword) {
            return next(new ErrorHandler("Please provide email, old password, and new password."));
        }

        // Find the user by email
        const user = await User.findOne({ email }).select("+password");

        // Check if the user exists
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }

        // Verify old password
        const isPasswordMatched = await user.comparePassword(oldPassword);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Incorrect old password.", 400));
        }

        // Check the length of the new password
        if (newPassword.length > 32) {
            return next(new ErrorHandler("Password cannot exceed 32 characters.", 400));
        }

        // Update password
        user.password = newPassword;

        // Save the updated user
        await user.save();

        // Return success response
        res.status(200).json({
            success: true,
            message: "Password updated successfully.",
        });
    } catch (error) {
        next(error);
    }
}


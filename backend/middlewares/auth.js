import { User } from "../models/userSchema.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Define the isAuthenticated middleware function
export async function isAuthenticated(req, res, next) {
    // Extract the token from the request cookies
    const { token } = req.cookies;
    // If token does not exist, return an error
    if (!token) {
        return res.status(401).json({
                            success: false,
                            message: 'TOken is missing',
                        });
    }
    // Verify the token using the JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Find the user in the database based on the decoded user ID
    req.user = await User.findById(decoded.id);
    // Call the next middleware or route handler
    next();
}
// export async function auth(req, res, next) {
//     try {

//         console.log("BEFORE ToKEN EXTRACTION");
//         //extract token
//         const token = req.cookies.token
//             || req.body.token
//             || req.header("Authorisation").replace("Bearer ", "");
//         console.log("AFTER ToKEN EXTRACTION");

//         //if token missing, then return response
//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'TOken is missing',
//             });
//         }

//         //verify the token
//         try {
//             const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
//             console.log(decode);
//             req.user = decode;
//         }
//         catch (err) {
//             //verification - issue
//             return res.status(401).json({
//                 success: false,
//                 message: 'token is invalid',
//             });
//         }
//         next();
//     }
//     catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: 'Something went wrong while validating the token',
//         });
//     }
// }

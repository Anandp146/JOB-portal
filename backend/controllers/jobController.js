import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

// Middleware to get all jobs
export const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({ expired: false }); // Finding all non-expired jobs
  res.status(200).json({
    success: true,
    jobs,
  });
};

// Middleware to post a new job
export const postJob = async (req, res, next) => {
  const { role } = req.user; // Getting the role of the user from the request
  if (role === "Job Seeker") { // Checking if the user is a job seeker
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    ); // Sending an error if the user is not allowed to post a job
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  // Validating if all required job details are provided
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  // Validating salary details
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary.",
        400
      )
    );
  }

  // Validating if both fixed and ranged salary are provided
  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }

  const postedBy = req.user._id; // Getting the user ID of the poster
  // Creating a new job with provided details
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  // Sending success response with the created job
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
};

// Middleware to get all jobs posted by the logged-in user
export const getMyJobs = async (req, res, next) => {
  const { role } = req.user; // Getting the role of the user from the request
  if (role === "Job Seeker") { // Checking if the user is a job seeker
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    ); // Sending an error if the user is not allowed to access the resource
  }
  // Finding all jobs posted by the logged-in user
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
};

// Middleware to update a job
export const updateJob = async (req, res, next) => {
  const { role } = req.user; // Getting the role of the user from the request
  if (role === "Job Seeker") { // Checking if the user is a job seeker
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    ); // Sending an error if the user is not allowed to update a job
  }
  const { id } = req.params; // Getting the ID of the job to update from the request parameters
  let job = await Job.findById(id); // Finding the job by ID
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404)); // Sending an error if job not found
  }
  // Updating the job with the provided data
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true, // Return the modified document rather than the original one
    runValidators: true, // Run any validation specified in the schema on the update operation
    useFindAndModify: false, // Use the MongoDB driver's findOneAndUpdate() function instead of the deprecated findAndModify() function
  });

  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
};

// Middleware to delete a job
export const deleteJob = async (req, res, next) => {
  const { role } = req.user; // Getting the role of the user from the request
  if (role === "Job Seeker") { // Checking if the user is a job seeker
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    ); // Sending an error if the user is not allowed to delete a job
  }
  const { id } = req.params; // Getting the ID of the job to delete from the request parameters
  const job = await Job.findById(id); // Finding the job by ID
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404)); // Sending an error if job not found
  }
  await job.deleteOne(); // Deleting the job
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
};

// Middleware to get a single job by ID
export const getSingleJob = async (req, res, next) => {
  const { id } = req.params; // Getting the ID of the job from the request parameters
  try {
    const job = await Job.findById(id); // Finding the job by ID
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404)); // Sending an error if job not found
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404)); // Handling invalid ID or CastError
  }
};

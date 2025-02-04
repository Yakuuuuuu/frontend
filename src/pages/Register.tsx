import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import signInImage from "../assets/images/image2.png"; // Import the same image

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${signInImage})` }} // Set the image as the background of the outer div
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial state (hidden and slightly above)
        animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
        transition={{ duration: 0.5 }} // Animation duration
        className="bg-white bg-opacity-90 shadow-xl rounded-lg p-8 w-full max-w-md" // Decreased opacity using bg-opacity-90
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Create an Account
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* First Name */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
            animate={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ delay: 0.2, duration: 0.5 }} // Animation delay and duration
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter your first name"
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500 mt-1">
                {errors.firstName.message}
              </span>
            )}
          </motion.div>

          {/* Last Name */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
            animate={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ delay: 0.3, duration: 0.5 }} // Animation delay and duration
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter your last name"
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500 mt-1">
                {errors.lastName.message}
              </span>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
            animate={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ delay: 0.4, duration: 0.5 }} // Animation delay and duration
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </span>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
            animate={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ delay: 0.5, duration: 0.5 }} // Animation delay and duration
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </span>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
            animate={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ delay: 0.6, duration: 0.5 }} // Animation delay and duration
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (val) => {
                  if (val !== watch("password")) {
                    return "Passwords do not match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </motion.div>

          {/* Link to Sign In */}
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Initial state (hidden and slightly to the left)
            animate={{ opacity: 1, x: 0 }} // Animate to visible and original position
            transition={{ delay: 0.7, duration: 0.5 }} // Animation delay and duration
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                  to="/sign-in"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
            animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
            transition={{ delay: 0.8, duration: 0.5 }} // Animation delay and duration
          >
            <motion.button
              whileHover={{ scale: 1.05 }} // Scale up on hover
              whileTap={{ scale: 0.95 }} // Scale down on click
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Create Account
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
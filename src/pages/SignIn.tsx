import { useState } from "react"; // Import useState
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import signInImage from "../assets/images/image.png";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const [apiError, setApiError] = useState(false); // Add state for handling API error

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError, // Import setError to manually set errors
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: any) => {
      showToast({ message: error.message, type: "ERROR" });
      setApiError(true); // Set API error to true on failed login
      // Optionally, set form errors from the server response
      setError("email", {
        type: "manual",
        message: "Invalid credentials", // Customize error message
      });
      setError("password", {
        type: "manual",
        message: "Invalid credentials", // Customize error message
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  // Reusable Input Field Component
  const InputField = ({
    label,
    type,
    placeholder,
    name,
    register,
    error,
    validation,
  }: {
    label: string;
    type: string;
    placeholder: string;
    name: keyof SignInFormData;
    register: any;
    error: any;
    validation: any;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        className={`w-full px-4 py-2 border ${
          (error || apiError) ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={`${name}-error`}
        {...register(name, validation)}
      />
      {error && (
        <span id={`${name}-error`} className="text-sm text-red-500 mt-1">
          {error.message}
        </span>
      )}
    </motion.div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${signInImage})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-90 shadow-xl rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Sign In
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Field */}
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            register={register}
            error={errors.email}
            validation={{ required: "Email is required" }}
          />

          {/* Password Field */}
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            register={register}
            error={errors.password}
            validation={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />

          {/* Register Link */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Not Registered?{" "}
                <Link
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                  to="/register"
                >
                  Create an account
                </Link>
              </span>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Login
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignIn;

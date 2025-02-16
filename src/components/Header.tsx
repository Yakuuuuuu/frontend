import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 p-6 shadow-lg animate-fadeIn">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl text-white font-bold tracking-wider flex items-center hover:text-yellow-400 transition duration-300">
          <Link to="/">hamroBooking.com.np</Link>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Flag_of_Nepal.svg"
            alt="Nepal Flag"
            className="ml-2 h-8 w-8"
          />
        </h1>
        <nav className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                className="text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1.5s ease-in-out;
          }

          .hover\:text-yellow-400:hover {
            color: #f59e0b;
          }

          .hover\:bg-blue-600:hover {
            background-color: #2563eb;
          }

          .hover\:bg-gray-200:hover {
            background-color: #e5e7eb;
          }
        `}
      </style>
    </header>
  );
};

export default Header;

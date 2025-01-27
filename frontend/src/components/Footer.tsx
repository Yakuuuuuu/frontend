const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-900 p-10 shadow-inner">
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-3xl text-white font-extrabold tracking-wider animate-pulse">
          hamroBooking.com
        </h2>
        <nav className="text-white font-semibold tracking-wider flex space-x-6">
          <p className="cursor-pointer hover:underline transition duration-300 ease-in-out transform hover:scale-105">
            Privacy Policy
          </p>
          <p className="cursor-pointer hover:underline transition duration-300 ease-in-out transform hover:scale-105">
            Terms of Service
          </p>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

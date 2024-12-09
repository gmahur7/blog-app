import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleProfileModal = () => setIsProfileModalOpen(!isProfileModalOpen);

  return (
    <header className="bg-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* App Heading */}
        <h1 className="text-2xl font-bold">
          <Link to="/">My Blog App</Link>
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/add-blog" className="hover:text-gray-200">
            Add Blog
          </Link>
          <Link to="/contact-us" className="hover:text-gray-200">
            Contact Us
          </Link>
          <button
            onClick={toggleProfileModal}
            className="bg-white text-teal-600 px-1  py-1 rounded-[50%] hover:bg-gray-200"
          >
            <CgProfile className="text-xl"/>
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleDrawer}
          aria-label="Toggle Menu"
        >
          <IoMenu />
        </button>
      </div>

      {/* Drawer for Mobile */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed top-0 left-0 w-2/3 bg-teal-600 h-full p-6 flex flex-col space-y-6 shadow-lg">
            <button
              className="text-2xl self-end"
              onClick={toggleDrawer}
              aria-label="Close Drawer"
            >
              <IoClose />
            </button>
            <h1 className="text-xl font-bold">
              <Link to="/" onClick={toggleDrawer}>
                My Blog App
              </Link>
            </h1>
            <Link
              to="/"
              className="hover:text-gray-200"
              onClick={toggleDrawer}
            >
              Home
            </Link>
            <Link
              to="/add-blog"
              className="hover:text-gray-200"
              onClick={toggleDrawer}
            >
              Add Blog
            </Link>
            <Link
              to="/contact-us"
              className="hover:text-gray-200"
              onClick={toggleDrawer}
            >
              Contact Us
            </Link>
            <button
              onClick={() => {
                toggleDrawer();
                toggleProfileModal();
              }}
              className="bg-white text-teal-600 px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Profile
            </button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-1/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <p className="text-gray-700">User Profile.....in progress.</p>
            <button
              onClick={toggleProfileModal}
              className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

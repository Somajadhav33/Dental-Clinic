import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-400 w-full p-5  relative  flex items-center justify-between">
      <img src="logo.png" alt="logo" className="h-10" />
      <div className="flex gap-6 text-white text-xl">
        <Link to="/">Services</Link>
        <Link to="/">About us</Link>
        <Link to="/">Reviews</Link>
        <Link to="/">Contact</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Book Appointment
        </Link>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
        >
          📞
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { NavLink ,Link} from "react-router";
export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <nav className="container mx-auto flex items-center justify-center px-6 py-5 relative">
        <div className="absolute left-6 flex items-center space-x-2">
          <div className="w-7 h-7 bg-purple-600 rounded-md flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>

                  <Link to="/"><h1 className="text-xl font-bold text-gray-900">Noteify</h1></Link>
          
        </div>
        <div className="flex space-x-6">
          <NavLink to="/" className={({isActive})=> `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isActive 
              ? "text-purple-600 bg-blue-50" 
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}>Home</NavLink>

          <NavLink to="/notes" className={({isActive})=> `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isActive 
              ? "text-purple-600 bg-blue-50" 
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}>Notes</NavLink>
        </div>
      </nav>
    </header>
  );
}

import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import Logo from "C:/Users/Admin/Desktop/lms/byway-lms-fe/src/assets/logo.png";
import Cart from "C:/Users/Admin/Desktop/lms/byway-lms-fe/src/assets//cart.png";

export default function SearchBar() {
  return (
    <div className="w-full flex justify-between items-center px-[30px] py-3 bg-white shadow-sm">
      <div className="flex items-center gap-6">
        <a href="" className="flex items-center font-serif text-lg gap-2">
          <img src={Logo} alt="Logo" className="w-8 h-8" />
          <strong>Byway</strong>
        </a>
        
      </div>

      <div className="flex items-center gap-6">
        <a href="" className="text-gray-700 hover:text-gray-900">Categories</a>
        <div className="flex items-center w-[400px] h-[40px] bg-white shadow-sm border rounded-md px-3 gap-2">
            
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search..."
            className="border-none shadow-none focus-visible:ring-0"
          />
        </div>
        <a href="" className="text-gray-700 hover:text-gray-900">Teach on Byway</a>
      </div>

      <div className="flex items-center gap-4">
        <a href="">
          <img src={Cart} alt="Shopping cart" className="w-6 h-6" />
        </a>

        <a
          href=""
          className="flex items-center justify-center px-4 h-[40px] gap-2 border border-gray-700 rounded hover:bg-gray-700 hover:text-white transition-colors"
        >
          Login
        </a>

        <a
          href=""
          className="flex items-center justify-center px-4 h-[40px] gap-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition-colors"
        >
          Sign up
        </a>
      </div>
    </div>
  );
}

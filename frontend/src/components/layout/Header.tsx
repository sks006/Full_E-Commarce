
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NavLinks from "./NavLinks";
import { cn } from "@/lib/utils";

const Header = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">TS</span>
            </div>
            <span className="font-bold text-lg">Shop House</span>
          </div>
        </Link>

        {/* Phone number */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-medium">+960 1234 5654</span>
        </div>

        {/* Search bar */}
        <div className={cn("md:flex items-center gap-2 flex-1 max-w-md mx-8", 
          searchVisible ? "flex" : "hidden md:flex")}>
          <div className="relative w-full">
            <Input 
              placeholder="Search products..." 
              className="w-full pl-4 pr-10 py-2 rounded-md border"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={() => setSearchVisible(!searchVisible)}>
            <Search className="h-5 w-5" />
          </button>
          <Link to="/wishlist" className="relative">
            <Heart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </Link>
          <Link to="/account">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <NavLinks />
    </header>
  );
};

export default Header;

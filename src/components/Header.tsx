import React from "react";
import { ShoppingBag, User, Settings, ArrowRightLeft, Menu, X, Landmark } from "lucide-react";
import { ViewPage, User as UserType } from "../types";

interface HeaderProps {
  activePage: ViewPage;
  setActivePage: (page: ViewPage) => void;
  cartCount: number;
  currentUser: UserType;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  onLogout: () => void;
}

export default function Header({
  activePage,
  setActivePage,
  cartCount,
  currentUser,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  onLogout,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategoryFilter(category);
    setActivePage("product_listing");
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-[#E8E6E1] bg-[#F8F7F4] sticky top-0 z-50 transition-all duration-300">
      {/* Editorial Announcement Banner */}
      <div className="w-full bg-[#1C1C1E] text-[#F8F7F4] py-2 px-4 text-center text-[11px] font-sans tracking-[0.15em] uppercase font-light">
        Complimentary priority shipping on orders over $200 — Automatic at checkout
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Collections Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-sans tracking-[0.15em] uppercase text-[#1C1C1E]">
            <button
              onClick={() => handleCategoryClick("Tops")}
              className={`hover:text-[#C9B99A] transition-colors py-1 cursor-pointer font-medium ${
                activePage === "product_listing" && selectedCategoryFilter === "Tops"
                  ? "border-b border-[#1C1C1E] text-[#1C1C1E]"
                  : ""
              }`}
            >
              Tops
            </button>
            <button
              onClick={() => handleCategoryClick("Bottoms")}
              className={`hover:text-[#C9B99A] transition-colors py-1 cursor-pointer font-medium ${
                activePage === "product_listing" && selectedCategoryFilter === "Bottoms"
                  ? "border-b border-[#1C1C1E] text-[#1C1C1E]"
                  : ""
              }`}
            >
              Bottoms
            </button>
            <button
              onClick={() => handleCategoryClick("Outerwear")}
              className={`hover:text-[#C9B99A] transition-colors py-1 cursor-pointer font-medium ${
                activePage === "product_listing" && selectedCategoryFilter === "Outerwear"
                  ? "border-b border-[#1C1C1E] text-[#1C1C1E]"
                  : ""
              }`}
            >
              Outerwear
            </button>
            <button
              onClick={() => handleCategoryClick("Accessories")}
              className={`hover:text-[#C9B99A] transition-colors py-1 cursor-pointer font-medium ${
                activePage === "product_listing" && selectedCategoryFilter === "Accessories"
                  ? "border-b border-[#1C1C1E] text-[#1C1C1E]"
                  : ""
              }`}
            >
              Accessories
            </button>
            <button
              onClick={() => {
                setSelectedCategoryFilter("All");
                setActivePage("product_listing");
              }}
              className={`hover:text-[#C9B99A] transition-colors py-1 cursor-pointer font-light ${
                activePage === "product_listing" && selectedCategoryFilter === "All"
                  ? "border-b border-[#1C1C1E]"
                  : ""
              }`}
            >
              Shop All
            </button>
          </nav>

          {/* Left Mobile Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1C1C1E] focus:outline-none p-1 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Center: Brand Identity Logo */}
          <div className="flex-1 text-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <button
              onClick={() => {
                setActivePage("homepage");
                setMobileMenuOpen(false);
              }}
              className="text-3xl sm:text-4xl font-display font-light italic tracking-tighter text-[#1C1C1E] hover:opacity-80 transition-opacity cursor-pointer"
            >
              VOIRE
            </button>
          </div>

          {/* Right: Quick actions */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-[#1C1C1E]">
            {/* User Account Account Info */}
            {currentUser.isLoggedIn ? (
              <div className="hidden sm:flex items-center space-x-2 text-xs font-sans text-gray-500">
                <span className="max-w-[120px] truncate">Hi, {currentUser.name || "User"}</span>
                <button
                  onClick={onLogout}
                  className="text-xs font-medium cursor-pointer text-[#8B3A3A] hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : null}

            <button
              onClick={() => setActivePage("login_register")}
              className={`p-1.5 rounded-full hover:bg-[#E8E6E1]/50 transition-colors cursor-pointer relative ${
                activePage === "login_register" ? "text-[#C9B99A]" : ""
              }`}
              title="Account"
            >
              <User className="w-4 h-4 sm:w-5 h-5" />
            </button>

            <button
              onClick={() => setActivePage("order_history")}
              className={`p-1.5 rounded-full hover:bg-[#E8E6E1]/50 transition-colors cursor-pointer ${
                activePage === "order_history" ? "text-[#C9B99A]" : ""
              }`}
              title="Order History"
            >
              <ArrowRightLeft className="w-4 h-4 sm:w-5 h-5" />
            </button>

            {/* Cart Icon inside bag */}
            <button
              onClick={() => setActivePage("cart")}
              className={`p-1.5 rounded-full hover:bg-[#E8E6E1]/50 transition-colors cursor-pointer relative ${
                activePage === "cart" ? "text-[#C9B99A]" : ""
              }`}
              title="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#8B3A3A] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-sans font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Splitter */}
            <span className="w-[1px] h-5 bg-[#E8E6E1] hidden sm:inline"></span>

            {/* Dynamic Admin Portal Button */}
            <button
              onClick={() => setActivePage("admin_dashboard")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md border border-[#E8E6E1] text-[10px] font-sans font-medium tracking-[0.1em] uppercase hover:bg-[#1C1C1E] hover:text-[#F8F7F4] hover:border-[#1C1C1E] transition-all-custom cursor-pointer ${
                activePage === "admin_dashboard" || activePage === "admin_products"
                  ? "bg-[#1C1C1E] text-[#F8F7F4] border-[#1C1C1E]"
                  : "bg-white text-[#1C1C1E]"
              }`}
              title="Admin Portal"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Admin Portal</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E6E1] bg-[#F8F7F4] px-4 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-4 text-sm font-sans tracking-widest uppercase">
            <button
              onClick={() => handleCategoryClick("Tops")}
              className="text-left py-2 hover:text-[#C9B99A] transition-colors border-b border-[#E8E6E1]/30 cursor-pointer"
            >
              Tops
            </button>
            <button
              onClick={() => handleCategoryClick("Bottoms")}
              className="text-left py-2 hover:text-[#C9B99A] transition-colors border-b border-[#E8E6E1]/30 cursor-pointer"
            >
              Bottoms
            </button>
            <button
              onClick={() => handleCategoryClick("Outerwear")}
              className="text-left py-2 hover:text-[#C9B99A] transition-colors border-b border-[#E8E6E1]/30 cursor-pointer"
            >
              Outerwear
            </button>
            <button
              onClick={() => handleCategoryClick("Accessories")}
              className="text-left py-2 hover:text-[#C9B99A] transition-colors border-b border-[#E8E6E1]/30 cursor-pointer"
            >
              Accessories
            </button>
            <button
              onClick={() => {
                setSelectedCategoryFilter("All");
                setActivePage("product_listing");
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 hover:text-[#C9B99A] transition-colors font-light cursor-pointer"
            >
              Shop All Catalog
            </button>

            {currentUser.isLoggedIn && (
              <div className="pt-4 border-t border-[#E8E6E1] flex items-center justify-between text-xs text-gray-500">
                <span>Account: {currentUser.name}</span>
                <button onClick={onLogout} className="text-[#8B3A3A] underline uppercase text-[10px] tracking-wider cursor-pointer">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

import React from "react";
import { Filter, SlidersHorizontal, Check, RefreshCw, ShoppingCart } from "lucide-react";
import { Product, ViewPage } from "../types";

interface ProductListingProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  setActivePage: (page: ViewPage) => void;
}

export default function ProductListing({
  products,
  selectedCategory,
  setSelectedCategory,
  onSelectProduct,
  onAddToCart,
  setActivePage,
}: ProductListingProps) {
  // Filter States
  const [selectedSize, setSelectedSize] = React.useState<string>("All");
  const [maxPrice, setMaxPrice] = React.useState<number>(2500000);
  const [sortBy, setSortBy] = React.useState<string>("default");

  // Hover states for sizes drawer
  const [hoveredCardId, setHoveredCardId] = React.useState<string | null>(null);
  const [addedMessage, setAddedMessage] = React.useState<string | null>(null);

  const categories = ["All", "Tops", "Bottoms", "Outerwear", "Dresses", "Accessories"];
  const sizes = ["All", "XS", "S", "M", "L", "XL", "ONE SIZE"];

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedSize("All");
    setMaxPrice(2500000);
    setSortBy("default");
  };

  // Perform filtering and sorting
  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Size Filter
    if (selectedSize !== "All") {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    // Price Filter
    result = result.filter((p) => p.price <= maxPrice);

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategory, selectedSize, maxPrice, sortBy]);

  const triggerAddToCart = (e: React.MouseEvent, product: Product, size: string) => {
    e.stopPropagation(); // Stop navigation to Product Detail
    onAddToCart(product, size);
    setAddedMessage(`Added ${product.name} (${size}) to your bag.`);
    setTimeout(() => setAddedMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn min-h-screen">
      
      {/* Toast Notification for quick add to cart */}
      {addedMessage && (
        <div id="quick-cart-toast" className="fixed bottom-5 right-5 bg-[#1C1C1E] text-[#F8F7F4] text-xs font-sans px-4 py-3 rounded-[4px] shadow-lg flex items-center space-x-3 z-50 border border-[#C9B99A]/30 transition-transform animate-slideUp">
          <div className="w-2 h-2 rounded-full bg-[#C9B99A] animate-ping" />
          <span>{addedMessage}</span>
          <button
            onClick={() => setActivePage("cart")}
            className="text-[10px] tracking-wider uppercase underline font-semibold text-[#C9B99A] cursor-pointer pl-2"
          >
            Checkout Bag
          </button>
        </div>
      )}

      {/* Page Title & Breadcrumb */}
      <div className="mb-8 text-center pb-6 border-b border-[#E8E6E1]/50">
        <span className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-sans font-light">
          Voire Collections
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-light text-[#1C1C1E] tracking-tight mt-2 capitalize">
          {selectedCategory === "All" ? "Shop All Collection" : `${selectedCategory}'s Collection`}
        </h1>
        <p className="text-xs text-gray-500 font-sans font-light tracking-wide mt-2">
          Structured geometries, premium fibers, and deliberate contemporary forms.
        </p>
      </div>

      {/* FILTER BAR PANEL CONTROLLER */}
      <div className="bg-white border border-[#E8E6E1] rounded-[8px] p-5 sm:p-6 mb-10 transition-shadow">
        
        <div className="flex items-center space-x-2 text-xs font-sans tracking-[0.1em] uppercase text-[#1C1C1E] mb-6 font-semibold">
          <SlidersHorizontal className="w-4 h-4 text-[#C9B99A]" />
          <span>Refine Selection</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Filter 1: Collections Category selection */}
          <div>
            <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-medium mb-3">
              Collection Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-[4px] text-[11px] font-sans transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#1C1C1E] text-white font-medium"
                      : "bg-[#F8F7F4] text-[#1C1C1E] border border-[#E8E6E1] hover:bg-[#E8E6E1]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Size Pill Options */}
          <div>
            <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-medium mb-3">
              Filter by Size
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2.5 py-1.5 rounded-[4px] text-[10px] font-sans transition-all cursor-pointer ${
                    selectedSize === size
                      ? "bg-[#1C1C1E] text-white font-medium"
                      : "bg-[#F8F7F4] text-[#1C1C1E] border border-[#E8E6E1] hover:bg-[#E8E6E1]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 3: Price Limit Slider */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-medium">
                Maximum Budget
              </label>
              <span className="text-xs font-sans font-semibold text-[#1C1C1E]">
                ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="150000"
              max="2500000"
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#8B3A3A] h-1 bg-[#E8E6E1] rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-gray-400 font-sans mt-2">
              <span>Min: Rp150k</span>
              <span>Max: Rp2.5m</span>
            </div>
          </div>

          {/* Filter 4: Order Sort Dropdown */}
          <div>
            <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-medium mb-3">
              Sort Sequence
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#F8F7F4] border border-[#E8E6E1] rounded-[4px] px-3 py-2 text-xs font-sans text-[#1C1C1E] focus:outline-none focus:border-[#1C1C1E]"
            >
              <option value="default">Default Campaign Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>

        </div>

        {/* Selected parameters and Reset Button */}
        <div className="mt-5 pt-4 border-t border-[#E8E6E1]/50 flex flex-wrap justify-between items-center gap-3">
          <p className="text-xs text-gray-500 font-sans">
            Showing <strong className="text-[#1C1C1E]">{filteredProducts.length}</strong> items of {products.length} products
          </p>
          {(selectedCategory !== "All" || selectedSize !== "All" || maxPrice < 2500000 || sortBy !== "default") && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-sans text-[#8B3A3A] hover:underline flex items-center space-x-1.5 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 3-COLUMN PRODUCT DATA GRID */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E8E6E1] rounded-[8px] p-6 max-w-lg mx-auto">
          <p className="text-sm font-sans text-gray-500 mb-4">No matching garments found complying with current criteria.</p>
          <button
            onClick={handleResetFilters}
            className="bg-[#1C1C1E] hover:bg-black text-white text-[11px] font-sans font-bold tracking-widest uppercase px-6 py-2.5 rounded-[4px] transition-colors cursor-pointer"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              onMouseEnter={() => setHoveredCardId(product.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group cursor-pointer flex flex-col justify-between"
              id={`product-card-${product.id}`}
            >
              
              {/* Image segment */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E6E1] rounded-[8px] border border-[#E8E6E1] mb-4">
                
                {/* Out of Stock banner */}
                {product.status === "Out of Stock" && (
                  <div className="absolute inset-0 bg-[#F8F7F4]/80 flex items-center justify-center z-10">
                    <span className="bg-[#1C1C1E] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-bold">
                      Sold out
                    </span>
                  </div>
                )}

                {/* Primary Photo */}
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all-custom duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Secondary Photo - Visible on Hover */}
                <img
                  src={product.secondaryImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-102 group-hover:scale-100 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* "ADD TO CART ON HOVER" SIZE DRAWERS OVERLAY */}
                {product.status !== "Out of Stock" && (
                  <div
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs border border-[#E8E6E1] p-3 rounded-[6px] translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-xs"
                    onClick={(e) => e.stopPropagation()} // block navigation clicks on size drawer background
                  >
                    <p className="text-[9px] font-sans tracking-widest text-[#1C1C1E] font-bold uppercase mb-2 text-center">
                      Quick Add — Select Size
                    </p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={(e) => triggerAddToCart(e, product, size)}
                          className="px-2 py-1 text-[9px] font-sans font-semibold border border-[#E8E6E1] hover:border-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white transition-all bg-white rounded-[2px] cursor-pointer"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Text segment below the image */}
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] text-gray-400 font-sans tracking-[0.1em] uppercase">
                    {product.category}
                  </span>
                  {product.status === "Low Stock" && (
                    <span className="text-[9px] text-[#C9B99A] font-bold font-sans uppercase">
                      Low Stock
                    </span>
                  )}
                </div>

                <h3 className="text-xs sm:text-sm font-sans font-medium text-[#1C1C1E] group-hover:text-[#8B3A3A] transition-colors leading-tight">
                  {product.name}
                </h3>

                <div className="flex justify-between items-center mt-2 pt-1 border-t border-[#E8E6E1]/30">
                  <span className="text-xs sm:text-sm font-sans font-semibold text-[#1C1C1E]">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-sans text-gray-400 font-light tracking-wide group-hover:text-[#1C1C1E] group-hover:underline transition-all">
                    View Details
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

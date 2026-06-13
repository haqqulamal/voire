import React from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Check, HelpCircle, Shield, Truck } from "lucide-react";
import { Product, ViewPage } from "../types";

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  setActivePage: (page: ViewPage) => void;
}

export default function ProductDetail({
  product,
  onAddToCart,
  setActivePage,
}: ProductDetailProps) {
  // Gallery navigation state
  const [activeImage, setActiveImage] = React.useState<string>(product.primaryImage);
  
  // Size selection state
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(1);

  // Accordion toggle states
  const [activeAccordion, setActiveAccordion] = React.useState<"description" | "sizeguide" | "shipping" | null>("description");

  // Cart confirmation visual feedback
  const [isAdding, setIsAdding] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Sync image if product changes
  React.useEffect(() => {
    setActiveImage(product.primaryImage);
    // pre-select first size if only one (e.g. One Size), otherwise leave blank so they must choose
    if (product.sizes.length === 1) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize("");
    }
    setQuantity(1);
    setActiveAccordion("description");
  }, [product]);

  const images = [product.primaryImage, product.secondaryImage];

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQty = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Focus size selector or show high-contrast border
      alert("Please select a size to add this garment to your bag.");
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize);
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 animate-fadeIn">
      {/* Back to listings anchor */}
      <button
        onClick={() => setActivePage("product_listing")}
        className="inline-flex items-center space-x-2 text-xs font-sans tracking-widest text-[#1C1C1E] hover:text-[#C9B99A] uppercase mb-10 transition-colors cursor-pointer font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Collection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: Gallery with Thumbnail view list */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden bg-[#E8E6E1] rounded-[8px] border border-[#E8E6E1]">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500 scale-100"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnail list */}
          <div className="flex space-x-3">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 aspect-[3/4] overflow-hidden bg-[#E8E6E1] rounded-[4px] border transition-all cursor-pointer ${
                  activeImage === img ? "border-[#1C1C1E] ring-1 ring-[#1C1C1E]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Garment options, detail actions, and policies */}
        <div className="flex flex-col justify-start">
          
          {/* Breadcrumb / Category tag */}
          <span className="text-[11px] text-gray-400 font-sans tracking-[0.2em] uppercase font-light">
            Collectives / {product.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-display font-light text-[#1C1C1E] tracking-tight mt-2 mb-3">
            {product.name}
          </h1>

          <p className="text-xl sm:text-2xl font-sans font-semibold text-[#1C1C1E] mb-6">
            ${product.price.toLocaleString()}
          </p>

          <div className="h-[1px] bg-[#E8E6E1] w-full mb-6"></div>

          {/* SHORT INTRO DESCRIPTION */}
          <p className="text-sm text-gray-500 font-sans font-light leading-relaxed mb-8">
            {product.description.substring(0, 160)}...
          </p>

          {/* 1. SIZE SELECTOR WITH HIGHLIGHTED WARNING */}
          <div className="mb-8">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-xs font-sans tracking-[0.1em] uppercase text-[#1C1C1E] font-semibold">
                Select Size: {selectedSize || <span className="text-[#8B3A3A] font-normal italic lowercase">required</span>}
              </span>
              <button
                onClick={() => setActiveAccordion("sizeguide")}
                className="text-[10px] tracking-widest uppercase font-sans text-gray-400 hover:text-[#1C1C1E] underline cursor-pointer"
              >
                Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center text-xs font-sans rounded-[4px] border transition-all cursor-pointer ${
                    selectedSize === size
                      ? "bg-[#1C1C1E] border-[#1C1C1E] text-[#F8F7F4] font-bold"
                      : "bg-[#F8F7F4] border-[#E8E6E1] hover:border-[#1C1C1E] text-[#1C1C1E]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 2. QUANTITY SELECTOR */}
          <div className="mb-8">
            <span className="block text-xs font-sans tracking-[0.1em] uppercase text-[#1C1C1E] font-semibold mb-3">
              Quantity
            </span>
            <div className="flex items-center w-32 border border-[#E8E6E1] bg-[#F8F7F4] rounded-[4px]">
              <button
                onClick={handleDecreaseQty}
                className="w-10 h-10 flex items-center justify-center hover:bg-[#E8E6E1] transition-colors cursor-pointer text-[#1C1C1E]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="flex-1 text-center text-xs font-sans font-medium text-[#1C1C1E]">
                {quantity}
              </span>
              <button
                onClick={handleIncreaseQty}
                className="w-10 h-10 flex items-center justify-center hover:bg-[#E8E6E1] transition-colors cursor-pointer text-[#1C1C1E]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. BURGUNDY ADD TO CART CTA BUTTON OR DYNAMIC SUCCESS FEEDBACK */}
          <div className="space-y-3 mb-10">
            {showSuccess ? (
              <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-[4px] p-4 text-center text-xs font-sans font-medium flex items-center justify-center space-x-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Added to bag!</span>
                <button
                  onClick={() => setActivePage("cart")}
                  className="font-bold underline text-emerald-950 hover:text-black cursor-pointer pl-2"
                >
                  View Bag & Checkout
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={product.status === "Out of Stock" || isAdding}
                className={`w-full py-4 rounded-[4px] text-xs font-sans font-semibold tracking-[0.15em] uppercase transition-all-custom cursor-pointer flex items-center justify-center space-x-2 shadow-xs ${
                  product.status === "Out of Stock"
                    ? "bg-[#E8E6E1] text-gray-400 border border-[#E8E6E1] cursor-not-allowed"
                    : "bg-[#8B3A3A] hover:bg-[#8B3A3A]/90 text-white"
                }`}
              >
                {isAdding ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{product.status === "Out of Stock" ? "Out of Stock" : "Add to Bag"}</span>
                  </>
                )}
              </button>
            )}

            <p className="text-[10px] text-gray-400 font-sans text-center tracking-wide">
              Priority worldwide courier dispatch. Complimentary shipping over $200.
            </p>
          </div>

          {/* 4. DETAILS ACCORDION PACK */}
          <div className="border-t border-[#E8E6E1] divide-y divide-[#E8E6E1]">
            
            {/* Accordion Item: Description */}
            <div className="py-4">
              <button
                onClick={() => setActiveAccordion(activeAccordion === "description" ? null : "description")}
                className="w-full flex justify-between items-center text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#1C1C1E] text-left cursor-pointer"
              >
                <span>Description & Attributes</span>
                <span className="text-lg font-light text-gray-400">
                  {activeAccordion === "description" ? "−" : "+"}
                </span>
              </button>
              {activeAccordion === "description" && (
                <div className="mt-4 text-xs text-gray-500 font-sans font-light leading-relaxed space-y-3 animate-fadeIn">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-500">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion Item: Size Guide */}
            <div className="py-4">
              <button
                onClick={() => setActiveAccordion(activeAccordion === "sizeguide" ? null : "sizeguide")}
                className="w-full flex justify-between items-center text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#1C1C1E] text-left cursor-pointer"
              >
                <span>Size Specifications</span>
                <span className="text-lg font-light text-gray-400">
                  {activeAccordion === "sizeguide" ? "−" : "+"}
                </span>
              </button>
              {activeAccordion === "sizeguide" && (
                <div className="mt-4 text-xs font-sans text-gray-500 animate-fadeIn">
                  <p className="mb-3">All garments are measured flat. Fits true to model campaign specs.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-[#E8E6E1] text-left text-[11px]">
                      <thead>
                        <tr className="bg-[#F8F7F4] border-b border-[#E8E6E1]">
                          <th className="p-2 font-semibold font-sans text-[#1C1C1E]">Size Label</th>
                          <th className="p-2 font-semibold font-sans text-[#1C1C1E]">Chest (in)</th>
                          <th className="p-2 font-semibold font-sans text-[#1C1C1E]">Waist (in)</th>
                          <th className="p-2 font-semibold font-sans text-[#1C1C1E]">Sleeve (in)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E6E1]">
                        <tr>
                          <td className="p-2 font-semibold">XS</td>
                          <td className="p-2">32 - 34</td>
                          <td className="p-2">25 - 27</td>
                          <td className="p-2">31.5</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold">S</td>
                          <td className="p-2">34 - 36</td>
                          <td className="p-2">27 - 29</td>
                          <td className="p-2">32.0</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold">M</td>
                          <td className="p-2">36 - 38</td>
                          <td className="p-2">29 - 31</td>
                          <td className="p-2">32.5</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold">L</td>
                          <td className="p-2">38 - 40</td>
                          <td className="p-2">31 - 33</td>
                          <td className="p-2">33.0</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold">XL</td>
                          <td className="p-2">40 - 42</td>
                          <td className="p-2">33 - 35</td>
                          <td className="p-2">33.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion Item: Shipping & Returns */}
            <div className="py-4">
              <button
                onClick={() => setActiveAccordion(activeAccordion === "shipping" ? null : "shipping")}
                className="w-full flex justify-between items-center text-xs font-sans font-semibold tracking-[0.15em] uppercase text-[#1C1C1E] text-left cursor-pointer"
              >
                <span>Express Courier & Returns</span>
                <span className="text-lg font-light text-gray-400">
                  {activeAccordion === "shipping" ? "−" : "+"}
                </span>
              </button>
              {activeAccordion === "shipping" && (
                <div className="mt-4 text-xs font-sans text-gray-500 space-y-3 leading-relaxed animate-fadeIn">
                  <div className="flex items-start space-x-2">
                    <Truck className="w-4 h-4 text-[#C9B99A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1C1C1E]">Complimentary Global Delivery</p>
                      <p>Orders over $200 enjoy priority DHL Express shipping. Delivered within 2-4 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-[#C9B99A] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1C1C1E]">Premium Returns</p>
                      <p>We welcome returns on all unworn items within 14 days of receipt. Custom pre-paid DHL dispatch label is included in every package box.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

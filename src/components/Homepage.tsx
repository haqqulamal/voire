import React from "react";
import { ArrowRight, Star, Heart, Flame } from "lucide-react";
import { Product, ViewPage } from "../types";

interface HomepageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  setActivePage: (page: ViewPage) => void;
  setSelectedCategoryFilter: (cat: string) => void;
}

export default function Homepage({
  products,
  onSelectProduct,
  setActivePage,
  setSelectedCategoryFilter,
}: HomepageProps) {
  const [emailInput, setEmailInput] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  // Filter 4 featured products
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  const handleCategoryNav = (cat: string) => {
    setSelectedCategoryFilter(cat);
    setActivePage("product_listing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full pb-16 animate-fadeIn">
      
      {/* 1. HERO BANNERS Section */}
      <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden bg-[#E8E6E1] flex items-center">
        {/* Background Editorial Photo with Natural Tones Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop"
            alt="VOIRE Editorial Fashion Campaign"
            className="w-full h-full object-cover object-center scale-[1.03] transition-transform duration-[10s] hover:scale-100"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient casting natural linen warmth over photo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#DEDCD7] via-[#F8F7F4]/30 to-[#F0EFEC] mix-blend-multiply opacity-75"></div>
          <div className="absolute inset-0 bg-[#1C1C1E]/5"></div>
        </div>

        {/* Hero Headline Overlay Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-[#1C1C1E]">
          <div className="max-w-2xl bg-white/70 backdrop-blur-xs p-8 sm:p-12 rounded-[12px] border border-[#E8E6E1]/70 shadow-[0_4px_30px_rgba(28,28,30,0.03)]">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase block mb-3 font-sans font-semibold text-[#C9B99A]">
              VOIRE Autumn / Winter Campaign
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-light italic leading-none tracking-tight mb-6 text-[#1C1C1E]">
              Wear the moment.
            </h1>
            <p className="text-xs sm:text-sm font-sans font-light tracking-[0.05em] text-[#1C1C1E]/95 mb-8 max-w-md leading-relaxed">
              We design structured essentials and premium coordinates for those who find confidence in precise, contemporary minimalism.
            </p>
            <div>
              <button
                onClick={() => handleCategoryNav("All")}
                className="inline-flex items-center space-x-3 bg-[#8B3A3A] hover:bg-[#8B3A3A]/90 text-white text-[11px] font-sans font-bold tracking-[0.15em] uppercase px-8 py-3.5 rounded-[4px] border border-[#8B3A3A] transition-all-custom cursor-pointer group shadow-sm"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Bottom Info Overlay */}
        <div className="absolute bottom-6 left-0 right-0 hidden sm:block z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between text-[10px] tracking-widest text-[#1C1C1E]/80 uppercase font-semibold">
            <span>Volume 03 / Edit 12</span>
            <span>Based in London & Paris</span>
          </div>
        </div>
      </section>

      {/* 2. THE EDITORIAL INTRO */}
      <section className="max-w-5xl mx-auto px-4 text-center my-20">
        <span className="text-[10px] tracking-[0.35em] text-[#C9B99A] uppercase block mb-4 font-semibold font-sans">
          Accessible Luxury
        </span>
        <h2 className="text-2xl sm:text-4xl font-display font-light text-[#1C1C1E] tracking-tight mb-6 leading-snug">
          Designed with intention. Made for longevity.
        </h2>
        <div className="h-[1px] w-12 bg-[#C9B99A] mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-500 font-sans font-light leading-relaxed">
          VOIRE represents a meticulous curation of fine materials and minimal alignments. Every seam, pocket button, and lapel width is considered to create timeless aesthetics that respond seamlessly to current micro-moments.
        </p>
      </section>

      {/* DIRECTORY STRIP NAVIGATION (Natural Tones) */}
      <section className="flex h-[100px] border-y border-[#E8E6E1] mb-24 shrink-0">
        <div
          onClick={() => handleCategoryNav("Women")}
          className="flex-1 flex flex-col items-center justify-center border-r border-[#E8E6E1] bg-[#F1F0ED] hover:bg-[#E8E6E1] transition-all duration-300 cursor-pointer group"
        >
          <span className="text-[10px] tracking-[0.15em] font-sans text-[#C9B99A] uppercase mb-1 font-semibold">Collective</span>
          <span className="text-[14px] sm:text-[16px] uppercase tracking-[0.4em] font-display italic font-light text-[#1C1C1E] group-hover:tracking-[0.45em] transition-all duration-300">Shop Women</span>
        </div>
        <div
          onClick={() => handleCategoryNav("Men")}
          className="flex-1 flex flex-col items-center justify-center bg-[#EBE9E4] hover:bg-[#E8E6E1] transition-all duration-300 cursor-pointer group"
        >
          <span className="text-[10px] tracking-[0.15em] font-sans text-[#C9B99A] uppercase mb-1 font-semibold">Collective</span>
          <span className="text-[14px] sm:text-[16px] uppercase tracking-[0.4em] font-display italic font-light text-[#1C1C1E] group-hover:tracking-[0.45em] transition-all duration-300">Shop Men</span>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (4-column Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex justify-between items-baseline mb-8 border-b border-[#E8E6E1] pb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-medium text-[#1C1C1E]">
              Featured Campaign pieces
            </h3>
            <p className="text-[11px] text-gray-400 font-sans tracking-wide mt-1">Highlighted coordinates from the seasonal lookbook</p>
          </div>
          <button
            onClick={() => handleCategoryNav("All")}
            className="text-[11px] font-sans tracking-[0.15em] uppercase hover:text-[#C9B99A] transition-colors inline-flex items-center space-x-1 font-semibold cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div id="featured-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group cursor-pointer flex flex-col justify-between"
              id={`featured-product-${product.id}`}
            >
              {/* Product Card Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E6E1] rounded-[8px] border border-[#E8E6E1] mb-3">
                {/* Sale / Low Stock Tag */}
                {product.status === "Low Stock" && (
                  <span className="absolute top-3 left-3 bg-[#C9B99A] text-[#1C1C1E] text-[9px] font-sans font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-[2px] z-10 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Low Stock
                  </span>
                )}
                {product.id === "v-01" && (
                  <span className="absolute top-3 left-3 bg-[#1C1C1E] text-white text-[9px] font-sans font-semibold tracking-[0.1em] uppercase px-2 py-0.5 rounded-[2px] z-10">
                    Sought-after
                  </span>
                )}

                {/* Primary Image */}
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:opacity-0 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Secondary Image - Visible on Hover */}
                <img
                  src={product.secondaryImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-102 group-hover:scale-100 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Info */}
              <div>
                <span className="text-[10px] text-gray-400 font-sans tracking-[0.1em] uppercase mb-1 block">
                  {product.category}
                </span>
                <h4 className="text-xs sm:text-sm font-sans font-medium text-[#1C1C1E] group-hover:text-[#C9B99A] transition-colors truncate">
                  {product.name}
                </h4>
                <p className="text-xs sm:text-sm font-sans font-semibold text-[#1C1C1E] mt-1.5 flex items-center justify-between">
                  <span>${product.price.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400 font-normal group-hover:underline group-hover:text-[#1C1C1E] transition-all">
                    More Details
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DESIGNED BANNERS FOR CAMPAIGN DIRECTORIES (Men / Women) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Women Banner */}
        <div
          onClick={() => handleCategoryNav("Women")}
          className="group relative h-[60vh] overflow-hidden bg-[#E8E6E1] rounded-[8px] cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop"
            alt="Women Category Campaign"
            className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-[6s]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#F8F7F4]">
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans mb-1 text-[#F8F7F4]/80">
              Autumn / Winter Selection
            </span>
            <h4 className="text-2xl sm:text-3xl font-display font-light tracking-wide mb-3">
              Women's Collective
            </h4>
            <p className="text-[11px] sm:text-xs font-sans font-light text-[#F8F7F4]/90 mb-4 max-w-xs leading-relaxed">
              Meticulously tailored blazers, fine mulberry silk dresses, and soft heavy cashmere knits.
            </p>
            <span className="inline-flex items-center space-x-2 text-[10px] tracking-[0.15em] uppercase font-sans font-bold group-hover:text-[#C9B99A] transition-colors">
              <span>Explore Campaign</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Men Banner */}
        <div
          onClick={() => handleCategoryNav("Men")}
          className="group relative h-[60vh] overflow-hidden bg-[#E8E6E1] rounded-[8px] cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=900&auto=format&fit=crop"
            alt="Men Category Campaign"
            className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-[6s]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-[#F8F7F4]">
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans mb-1 text-[#F8F7F4]/80">
              Modern Tailoring Essentials
            </span>
            <h4 className="text-2xl sm:text-3xl font-display font-light tracking-wide mb-3">
              Men's Collective
            </h4>
            <p className="text-[11px] sm:text-xs font-sans font-light text-[#F8F7F4]/90 mb-4 max-w-xs leading-relaxed">
              Refined water-resistant outers, premium heavyweight hoodies, and relaxed cropped chinos.
            </p>
            <span className="inline-flex items-center space-x-2 text-[10px] tracking-[0.15em] uppercase font-sans font-bold group-hover:text-[#C9B99A] transition-colors">
              <span>Explore Campaign</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER SIGNUP SECTION */}
      <section className="bg-[#E8E6E1] py-16 sm:py-24 border-y border-[#E2DFD9]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-[10px] tracking-[0.3em] text-[#C9B99A] font-semibold block mb-2 uppercase font-sans">
            Keep in touch with Voire
          </span>
          <h3 className="text-xl sm:text-3xl font-display font-normal text-[#1C1C1E] tracking-tight mb-4">
            Receive exclusive updates, looks, and early curation launches.
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-sans font-light mb-8 max-w-lg mx-auto leading-relaxed">
            Be the first to know about seasonal collection releases, bespoke designer collaborations, and private sale access. No spam, ever.
          </p>

          {subscribed ? (
            <div className="p-6 bg-white border border-[#C9B99A] rounded-[8px] animate-fadeIn">
              <p className="text-xs sm:text-sm font-sans font-medium text-[#1C1C1E]">
                Thank you. You have been added to our private curation list.
              </p>
              <p className="text-[11px] text-gray-400 font-sans mt-1">We will send you Volume 03 campaign lookbook shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-white border border-[#C9B99A]/40 focus:border-[#1C1C1E] focus:outline-none px-4 py-3 rounded-[4px] text-xs font-sans placeholder-gray-400 w-full sm:flex-1 tracking-wide"
              />
              <button
                type="submit"
                className="bg-[#1C1C1E] hover:bg-black text-[#F8F7F4] text-[10px] font-sans font-bold tracking-[0.15em] uppercase px-6 py-3 rounded-[4px] transition-colors cursor-pointer w-full sm:w-auto shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <span className="text-[9px] text-gray-400 block mt-4 font-sans tracking-wide">
            By signing up, you agree to our Terms of Service & Privacy Policy.
          </span>
        </div>
      </section>

    </div>
  );
}

import React from "react";
import { Trash2, AlertCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { CartItem, ViewPage } from "../types";

interface CartPageProps {
  cart: CartItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  setActivePage: (page: ViewPage) => void;
  appliedPromo: string;
  setAppliedPromo: (promo: string) => void;
}

export default function CartPage({
  cart,
  onUpdateQty,
  onRemoveItem,
  setActivePage,
  appliedPromo,
  setAppliedPromo,
}: CartPageProps) {
  const [promoInput, setPromoInput] = React.useState("");
  const [promoError, setPromoError] = React.useState("");
  const [promoSuccess, setPromoSuccess] = React.useState(!!appliedPromo);

  // Computations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Complimentary courier threshold: $200
  const shippingFee = subtotal >= 200 || subtotal === 0 ? 0 : 15;
  
  // Discount
  const discountRate = appliedPromo === "VOIRE10" ? 0.1 : 0;
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const code = promoInput.trim().toUpperCase();

    if (code === "VOIRE10") {
      setAppliedPromo("VOIRE10");
      setPromoSuccess(true);
      setPromoInput("");
    } else if (code === "") {
      setPromoError("Please type a promo code.");
    } else {
      setPromoError("Invalid code. Try typing 'VOIRE10' for 10% off.");
    }
  };

  const handleClearPromo = () => {
    setAppliedPromo("");
    setPromoSuccess(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 animate-fadeIn min-h-[70vh]">
      
      {/* Page Title */}
      <div className="mb-12 border-b border-[#E8E6E1]/50 pb-5">
        <h1 className="text-3xl sm:text-4xl font-display font-light text-[#1C1C1E] tracking-tight">
          Your Shopping Bag
        </h1>
        <p className="text-xs text-gray-500 font-sans tracking-wide mt-1">
          Review your minimalist edits and selections.
        </p>
      </div>

      {cart.length === 0 ? (
        // Empty bag state
        <div className="text-center py-20 bg-white border border-[#E8E6E1] rounded-[8px] max-w-md mx-auto p-8">
          <div className="p-4 bg-[#F8F7F4] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-6 h-6 text-[#C9B99A]" />
          </div>
          <h2 className="text-lg font-display text-[#1C1C1E] font-medium mb-2">
            Your bag is currently empty
          </h2>
          <p className="text-xs text-gray-500 font-sans font-light leading-relaxed mb-8">
            Explore premium coats, structured wool blazers, and luxury coordinates to wear the current moment.
          </p>
          <button
            onClick={() => setActivePage("product_listing")}
            className="bg-[#1C1C1E] hover:bg-black text-[#F8F7F4] text-xs font-sans font-semibold tracking-widest uppercase px-6 py-3 rounded-[4px] transition-colors cursor-pointer inline-flex items-center space-x-2"
          >
            <span>Begin Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        // Two-column layout
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: CART ITEMS LIST Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="divide-y divide-[#E8E6E1]/65">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  id={`cart-item-${item.id}`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Item Image */}
                    <div className="w-20 aspect-[3/4] bg-[#E8E6E1] rounded-[4px] overflow-hidden border border-[#E8E6E1] shrink-0">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta info */}
                    <div>
                      <span className="text-[10px] text-gray-400 font-sans uppercase tracking-wider">
                        {item.product.category}
                      </span>
                      <h4 className="text-sm font-sans font-medium text-[#1C1C1E] leading-tight">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500 font-sans mt-1">
                        Size: <strong className="text-[#101010]">{item.selectedSize}</strong>
                      </p>
                      <p className="text-xs font-sans font-light text-gray-400 sm:hidden mt-2">
                        Price: ${item.product.price}
                      </p>
                    </div>
                  </div>

                  {/* Right side controls (Stepper, price, remove) */}
                  <div className="flex sm:flex-row items-center justify-between sm:justify-end gap-6 sm:gap-10 border-t border-[#E8E6E1]/20 sm:border-0 pt-3 sm:pt-0">
                    
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E8E6E1] bg-white rounded-[4px]">
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-[#F8F7F4] text-xs font-sans font-bold cursor-pointer transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-sans font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-[#F8F7F4] text-xs font-sans font-bold cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Price total */}
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold font-sans text-[#1C1C1E]">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-gray-400 font-sans">
                          (${item.product.price} each)
                        </p>
                      )}
                    </div>

                    {/* Delete handler */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-[#8B3A3A] transition-colors p-2 cursor-pointer rounded-full hover:bg-red-50"
                      title="Remove from bag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* Quick reminder card */}
            <div className="p-4 bg-[#F8F7F4] rounded-[8px] border border-[#E8E6E1] flex gap-3 text-xs font-sans text-gray-500 font-light items-start">
              <AlertCircle className="w-5 h-5 text-[#C9B99A] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#1C1C1E]">Sustainable Curation Commitment</p>
                <p>We craft products in limited runs to minimize ecological footprint. Selections in your cart are temporarily reserved for 30 minutes.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY CARD */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#E8E6E1] rounded-[8px] p-6 lg:sticky lg:top-24">
              <h3 className="text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#1C1C1E] mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 text-xs font-sans text-[#1C1C1E] border-b border-[#E8E6E1] pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-light">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>

                {/* Shipping cost (Dynamic) */}
                <div className="flex justify-between">
                  <span className="text-gray-500 font-light">Priority Shipping</span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-semibold tracking-wider">COMPLIMENTARY</span>
                  ) : (
                    <span className="font-medium">${shippingFee}</span>
                  )}
                </div>

                {/* Promo deduction */}
                {appliedPromo === "VOIRE10" && (
                  <div className="flex justify-between text-emerald-800 bg-emerald-50 p-2.5 rounded-[4px] border border-emerald-100 font-medium">
                    <div className="flex flex-col">
                      <span>Promo (VOIRE10)</span>
                      <button onClick={handleClearPromo} className="text-[10px] text-red-700 underline text-left mt-0.5 font-light">
                        Remove Code
                      </button>
                    </div>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                {shippingFee > 0 && (
                  <p className="text-[10px] text-[#A69777] italic leading-relaxed pt-1.5">
                    *Tip: Add <strong>${(200 - subtotal).toLocaleString()}</strong> more to your bag for free premium priority shipping!
                  </p>
                )}
              </div>

              {/* Promo field layout */}
              <div className="my-6">
                <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                  Promotion Code
                </label>
                {promoSuccess && appliedPromo ? (
                  <div className="text-[11px] text-emerald-800 font-sans flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>The promo code <strong>{appliedPromo}</strong> is applied!</span>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="e.g. VOIRE10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none bg-[#F8F7F4] px-3 py-2 text-xs font-sans rounded-[4px] flex-1 tracking-wide"
                    />
                    <button
                      type="submit"
                      className="bg-[#1C1C1E] hover:bg-black text-[10px] tracking-widest text-[#F8F7F4] uppercase font-bold px-4 rounded-[4px] cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[10px] text-[#8B3A3A] font-sans mt-2">{promoError}</p>
                )}
                {!appliedPromo && (
                  <span className="text-[9px] text-gray-400 font-sans block mt-1.5">
                    Secret Code: Try <strong>VOIRE10</strong> to deduct 10% from your order subtotal.
                  </span>
                )}
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-baseline mb-6 pt-2">
                <span className="text-sm font-sans tracking-wide text-[#1C1C1E] uppercase font-bold">Total Est.</span>
                <span className="text-xl font-sans font-bold text-[#1C1C1E]">
                  ${total.toLocaleString()}
                </span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => setActivePage("checkout")}
                className="w-full bg-[#8B3A3A] hover:bg-[#8B3A3A]/90 text-white text-xs font-sans font-semibold tracking-[0.15em] uppercase py-4 rounded-[4px] transition-colors cursor-pointer text-center block shadow-sm shadow-[#8B3A3A]/10"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => setActivePage("product_listing")}
                className="w-full text-center text-xs text-gray-500 hover:text-[#1C1C1E] font-sans font-light mt-4 underline cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

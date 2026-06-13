import React from "react";
import { Check, ShieldCheck, CreditCard, Landmark, Loader } from "lucide-react";
import { CartItem, ShippingAddress, Order, OrderItem, ViewPage } from "../types";

interface CheckoutPageProps {
  cart: CartItem[];
  onPlaceOrder: (shippingAddress: ShippingAddress, total: number) => Promise<string | void> | void;
  setActivePage: (page: ViewPage) => void;
  appliedPromo: string;
}

export default function CheckoutPage({
  cart,
  onPlaceOrder,
  setActivePage,
  appliedPromo,
}: CheckoutPageProps) {
  // Checkout current active sub-step: "shipping" | "payment" | "success"
  const [checkoutStep, setCheckoutStep] = React.useState<"shipping" | "payment" | "success">("shipping");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [createdOrderId, setCreatedOrderId] = React.useState("");

  // Input states
  const [addressData, setAddressData] = React.useState<ShippingAddress>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
  });

  const [paymentData, setPaymentData] = React.useState({
    cardNumber: "4000 1234 5678 9010",
    cardExpiry: "09/28",
    cardCvv: "125",
    cardName: "",
  });

  // Calculate pricing values
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 200 || subtotal === 0 ? 0 : 15;
  const discountRate = appliedPromo === "VOIRE10" ? 0.1 : 0;
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount + shippingFee;

  // Handle standard transitions
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressData.fullName || !addressData.email || !addressData.address || !addressData.city || !addressData.postalCode) {
      alert("Please populate all required shipping markers before continuing.");
      return;
    }
    // Set default card name to full name
    setPaymentData(prev => ({ ...prev, cardName: addressData.fullName.toUpperCase() }));
    setCheckoutStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentData.cardName || !paymentData.cardNumber || !paymentData.cardExpiry || !paymentData.cardCvv) {
      alert("Please input your card metrics to process compilation.");
      return;
    }

    setIsProcessing(true);
    try {
      const orderNumber = await onPlaceOrder(addressData, total);
      setIsProcessing(false);
      const generatedId = orderNumber || `VOR-${Math.floor(1000 + Math.random() * 9000)}`;
      setCreatedOrderId(generatedId);
      setCheckoutStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      setIsProcessing(false);
      alert(error.response?.data?.message || "Unable to complete checkout.");
    }
  };

  if (checkoutStep === "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
        </div>
        <span className="text-[10px] tracking-[0.25em] text-[#C9B99A] uppercase font-sans font-medium">
          ORDER ACQUISITION SETTLED
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-light text-[#1C1C1E] mt-3 mb-4">
          Thank you for your order.
        </h1>
        <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-sm mx-auto mb-8">
          Your transaction was verified successfully. A detailed receipt, invoice coordinates, and tracking logs will be dispatched to <strong className="text-[#101010]">{addressData.email}</strong> shortly.
        </p>

        {/* Dynamic Receipt Info Box */}
        <div className="bg-white border border-[#E8E6E1] p-6 rounded-[8px] text-left mb-10 text-xs font-sans divide-y divide-[#E8E6E1]/50 shadow-xs">
          <div className="pb-3 flex justify-between items-baseline">
            <span className="text-gray-400">Order Reference</span>
            <span className="font-bold font-mono text-[#1C1C1E]">{createdOrderId}</span>
          </div>
          <div className="py-3 flex justify-between items-baseline">
            <span className="text-gray-400">Deliver to</span>
            <span className="font-medium text-[#1C1C1E]">{addressData.fullName}</span>
          </div>
          <div className="py-3 flex justify-between items-baseline">
            <span className="text-gray-400">Shipping Mode</span>
            <span className="text-[#A69777] font-semibold uppercase">DHL Express Priority Courier</span>
          </div>
          <div className="pt-3 flex justify-between items-baseline text-sm">
            <span className="font-semibold text-[#1C1C1E]">Paid amount</span>
            <span className="font-bold text-[#1C1C1E]">${total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setActivePage("order_history")}
            className="border border-[#E8E6E1] hover:bg-[#E8E6E1] text-[#1C1C1E] text-xs font-sans font-semibold tracking-widest uppercase px-6 py-3.5 rounded-[4px] cursor-pointer transition-colors"
          >
            Track past orders
          </button>
          <button
            onClick={() => setActivePage("homepage")}
            className="bg-[#1C1C1E] hover:bg-black text-white text-xs font-sans font-semibold tracking-widest uppercase px-6 py-3.5 rounded-[4px] cursor-pointer transition-colors"
          >
            Go back homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 animate-fadeIn">
      
      {/* 1. TYPOGRAPHIC STEP INDICATOR */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="flex justify-between items-center text-[10px] sm:text-xs font-sans tracking-[0.15em] uppercase font-semibold text-gray-400">
          
          <button
            onClick={() => setActivePage("cart")}
            className="flex items-center text-emerald-800 space-x-1 cursor-pointer"
          >
            <span className="w-5 h-5 flex items-center justify-center border border-emerald-600 rounded-full font-mono text-[10px] bg-emerald-50">1</span>
            <span>Shopping Bag</span>
          </button>

          <span className="h-[1px] bg-[#E8E6E1] flex-1 mx-4"></span>

          <div className={`flex items-center space-x-1 ${checkoutStep === "shipping" ? "text-[#1C1C1E]" : "text-emerald-700"}`}>
            <span className={`w-5 h-5 flex items-center justify-center border rounded-full font-mono text-[10px] ${
              checkoutStep === "shipping" 
                ? "border-[#1C1C1E] bg-[#1C1C1E] text-[#F8F7F4]" 
                : "border-emerald-600 bg-emerald-50 text-emerald-800"
            }`}>2</span>
            <span>Courier Shipping</span>
          </div>

          <span className="h-[1px] bg-[#E8E6E1] flex-1 mx-4"></span>

          <div className={`flex items-center space-x-1 ${checkoutStep === "payment" ? "text-[#1C1C1E]" : "text-gray-400"}`}>
            <span className={`w-5 h-5 flex items-center justify-center border rounded-full font-mono text-[10px] ${
              checkoutStep === "payment" ? "border-[#1C1C1E] bg-[#1C1C1E] text-[#F8F7F4]" : "border-[#E8E6E1] bg-white text-gray-400"
            }`}>3</span>
            <span>Secure Settlement</span>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: ACTIVE STEP FORM */}
        <div className="lg:col-span-8 bg-white border border-[#E8E6E1] rounded-[8px] p-6 sm:p-10">
          
          {checkoutStep === "shipping" ? (
            /* COURIER ADDRESS SUB-FORM */
            <form onSubmit={handleShippingSubmit} className="space-y-6">
              <div className="pb-4 border-b border-[#E8E6E1]/50">
                <h2 className="text-lg font-display text-[#1C1C1E] font-medium">Shipping Coordinates</h2>
                <p className="text-xs text-gray-500 font-sans tracking-wide mt-1">Specify destination metrics for priority courier logistics.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                    Full Destination Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={addressData.fullName}
                    onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-3 text-xs font-sans rounded-[4px] tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. johndoe@gmail.com"
                    value={addressData.email}
                    onChange={(e) => setAddressData({ ...addressData, email: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-3 text-xs font-sans rounded-[4px] tracking-wide"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                  Street Signature Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 102 West Broadway, Suite 4B"
                  value={addressData.address}
                  onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                  className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-3 text-xs font-sans rounded-[4px] tracking-wide"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                    City / Prefecture *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="New York"
                    value={addressData.city}
                    onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-3 text-xs font-sans rounded-[4px] tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                    Postal Code / ZIP *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="10013"
                    value={addressData.postalCode}
                    onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-3 text-xs font-sans rounded-[4px] tracking-wide"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                    Country *
                  </label>
                  <select
                    value={addressData.country}
                    onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-3 py-3 text-xs font-sans rounded-[4px]"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>France</option>
                    <option>Japan</option>
                    <option>Singapore</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E6E1]/50 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1C1C1E] hover:bg-black text-white text-xs font-sans font-semibold tracking-[0.15em] uppercase px-8 py-3.5 rounded-[4px] transition-colors cursor-pointer"
                >
                  Continue to Settlement
                </button>
              </div>
            </form>
          ) : (
            /* PAYMENT MERCHANDISE FORMS */
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div className="pb-4 border-b border-[#E8E6E1]/50 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-display text-[#1C1C1E] font-medium">Bespoke Settlement</h2>
                  <p className="text-xs text-gray-500 font-sans tracking-wide mt-1">Processed securely using encrypted tokenization pipelines.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutStep("shipping")}
                  className="text-xs text-[#8B3A3A] underline font-sans font-medium cursor-pointer"
                >
                  Edit Address
                </button>
              </div>

              {/* Encrypted Notice Banner */}
              <div className="p-3 bg-[#F8F7F4] border border-[#C9B99A]/50 rounded-[4px] flex items-center space-x-2 text-[10px] font-sans text-gray-600">
                <Check className="w-4 h-4 text-[#C9B99A] shrink-0" />
                <span>Express encryption sandbox verified. You can proceed using real mock inputs.</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                    Cardholder Name Signature *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. JOHN DOE"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                    className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-3 text-xs font-sans rounded-[4px] tracking-wide font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                    Card Numbers *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4000 1234 5678 9010"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none pl-10 pr-4 py-3 text-xs font-sans rounded-[4px] tracking-widest font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-[#C9B99A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                      Expiration Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={paymentData.cardExpiry}
                      onChange={(e) => setPaymentData({ ...paymentData, cardExpiry: e.target.value })}
                      className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-3 text-xs font-sans rounded-[4px] tracking-widest font-mono text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans tracking-[0.1em] uppercase text-gray-400 font-semibold mb-2">
                      Secure CVV / CVC *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="***"
                      maxLength={4}
                      value={paymentData.cardCvv}
                      onChange={(e) => setPaymentData({ ...paymentData, cardCvv: e.target.value })}
                      className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none px-4 py-3 text-xs font-sans rounded-[4px] tracking-widest font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E6E1]/50 flex justify-end">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-[#8B3A3A] hover:bg-[#8B3A3A]/90 text-white text-xs font-sans font-semibold tracking-[0.15em] uppercase px-8 py-4 rounded-[4px] transition-colors cursor-pointer flex items-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Authenticating Merchant...</span>
                    </>
                  ) : (
                    <span>Complete Purchase — ${total.toLocaleString()}</span>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* RIGHT COLUMN: DETAILED SUMMARY REVIEW (STICKY) */}
        <div className="lg:col-span-4">
          <div className="bg-[#F8F7F4] border border-[#E8E6E1] rounded-[8px] p-6 lg:sticky lg:top-24 space-y-6">
            <h3 className="text-xs font-sans tracking-[0.2em] uppercase font-bold text-[#1C1C1E]">
              Order Summary Review
            </h3>

            {/* List mini products */}
            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 divide-y divide-[#E8E6E1]/40">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-10 aspect-[3/4] object-cover bg-neutral-100 rounded-[2px]"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-semibold text-[#1C1C1E] max-w-[140px] truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-gray-400">Qty {item.quantity} / Sz {item.selectedSize}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#1C1C1E]">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-[1px] bg-[#E8E6E1] w-full"></div>

            {/* Price breakdown math */}
            <div className="space-y-3.5 text-xs font-sans text-[#1C1C1E]">
              <div className="flex justify-between">
                <span className="text-gray-400">Items Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Postage Handling</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-700 font-semibold uppercase">COMPLIMENTARY</span>
                ) : (
                  <span>${shippingFee}</span>
                )}
              </div>
              {appliedPromo === "VOIRE10" && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>10% Campaign Promo (VOIRE10)</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-4 border-t border-[#E8E6E1] text-sm font-semibold">
                <span>Grand Total</span>
                <span className="text-lg font-bold">${total.toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

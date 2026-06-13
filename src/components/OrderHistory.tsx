import React from "react";
import { Package, ShieldAlert, ArrowRight, Eye, Calendar, DollarSign, MapPin } from "lucide-react";
import { Order, ViewPage } from "../types";

interface OrderHistoryProps {
  orders: Order[];
  setActivePage: (page: ViewPage) => void;
}

export default function OrderHistory({ orders, setActivePage }: OrderHistoryProps) {
  // Selected order details toggles
  const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(null);

  const getStatusStyle = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-800 border border-amber-200";
      case "Processing":
        return "bg-blue-50 text-blue-800 border border-blue-200";
      case "Shipped":
        return "bg-rose-50 text-[#8B3A3A] border border-[#8B3A3A]/35";
      case "Delivered":
        return "bg-emerald-50 text-emerald-800 border border-emerald-200";
      default:
        return "bg-gray-50 text-gray-800 border border-gray-200";
    }
  };

  const toggleExpandOrder = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 animate-fadeIn min-h-[75vh]">
      
      {/* Editorial Page Header */}
      <div className="mb-12 border-b border-[#E8E6E1]/50 pb-5">
        <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-sans">
          Customer Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-light text-[#1C1C1E] tracking-tight mt-1">
          Your Order Archives
        </h1>
        <p className="text-xs text-gray-500 font-sans tracking-wide mt-1 animate-fadeIn">
          Monitor your premium fashion acquisitions and ongoing courier shipments.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E8E6E1] rounded-[8px] max-w-sm mx-auto p-8">
          <div className="p-4 bg-[#F8F7F4] rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-[#C9B99A]" />
          </div>
          <h2 className="text-sm font-sans font-semibold text-[#1C1C1E] uppercase tracking-wider mb-2">
            No Purchases Detected
          </h2>
          <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
            You haven't initiated any secure acquisitions with VOIRE yet.
          </p>
          <button
            onClick={() => setActivePage("product_listing")}
            className="bg-[#1C1C1E] hover:bg-black text-[#F8F7F4] text-xs font-sans font-bold tracking-widest uppercase px-6 py-2.5 rounded-[4px] transition-colors cursor-pointer"
          >
            Browse Collections
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Table headers for desktop views */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-[10px] font-sans tracking-[0.15em] uppercase text-gray-400 font-bold">
            <div className="col-span-2">Order Reference</div>
            <div className="col-span-2">Purchase Date</div>
            <div className="col-span-4">Items Summary Preview</div>
            <div className="col-span-2 text-right">Paid Amount</div>
            <div className="col-span-2 text-right">Courier Status</div>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E8E6E1] hover:border-gray-300 rounded-[8px] transition-all overflow-hidden"
              >
                {/* 1. COMPACT ROW LIST */}
                <div
                  onClick={() => toggleExpandOrder(order.id)}
                  className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center cursor-pointer"
                >
                  {/* Order ID */}
                  <div className="col-span-2">
                    <span className="text-[10px] md:hidden text-gray-400 font-sans uppercase block mb-1">
                      Reference Code
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1C1C1E]">
                      {order.id}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <span className="text-[10px] md:hidden text-gray-400 font-sans uppercase block mb-1">
                      Date Settled
                    </span>
                    <span className="text-xs font-sans text-gray-600">
                      {order.date}
                    </span>
                  </div>

                  {/* Items Preview */}
                  <div className="col-span-4">
                    <span className="text-[10px] md:hidden text-gray-400 font-sans uppercase block mb-1">
                      Items Ordered
                    </span>
                    <div className="flex items-center -space-x-2 overflow-hidden py-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-10 rounded-[2px] overflow-hidden border border-white bg-[#E8E6E1] shrink-0 relative"
                          title={`${item.productName} (Size ${item.size})`}
                        >
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                      <span className="text-[11px] font-sans text-gray-500 pl-3">
                        {order.items.length === 1
                          ? `${order.items[0].productName.substring(0, 16)}...`
                          : `${order.items[0].productName.substring(0, 10)}... and ${order.items.length - 1} more`}
                      </span>
                    </div>
                  </div>

                  {/* Paid total */}
                  <div className="col-span-2 text-left md:text-right">
                    <span className="text-[10px] md:hidden text-gray-400 font-sans uppercase block mb-1">
                      Total Subtotal
                    </span>
                    <span className="text-xs font-sans font-bold text-[#1C1C1E]">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-2 flex justify-between md:justify-end items-center">
                    <div>
                      <span className="text-[10px] md:hidden text-gray-400 font-sans uppercase block mb-1">
                        Courier Status
                      </span>
                      <span className={`text-[9px] font-sans font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-[2px] inline-block ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <Eye className="w-4 h-4 text-gray-400 hover:text-[#1C1C1E] ml-4 transition-colors hidden md:block" />
                  </div>

                </div>

                {/* 2. EXPANDED INNER METRICS (ACCORDION ACCENT) */}
                {expandedOrderId === order.id && (
                  <div className="bg-[#F8F7F4] border-t border-[#E8E6E1]/70 p-6 space-y-6 animate-fadeIn">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Sub-item Left: Address coordinates */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-sans tracking-[0.15em] uppercase text-gray-400 font-bold flex items-center gap-1.5 border-b border-[#E8E6E1] pb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C9B99A]" />
                          <span>Delivery Destination</span>
                        </h4>
                        <div className="text-xs font-sans text-gray-600 space-y-1">
                          <p className="font-semibold text-[#1C1C1E]">{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                          <p>{order.shippingAddress.country}</p>
                          <p className="pt-2 text-gray-400">{order.shippingAddress.email}</p>
                        </div>
                      </div>

                      {/* Sub-item Right: Courier tracking status info */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-sans tracking-[0.15em] uppercase text-gray-400 font-bold flex items-center gap-1.5 border-b border-[#E8E6E1] pb-1.5">
                          <Package className="w-3.5 h-3.5 text-[#C9B99A]" />
                          <span>Logistic Coordinates</span>
                        </h4>
                        <div className="text-xs font-sans text-gray-600 space-y-1">
                          <p className="font-semibold text-[#1C1C1E]">Carrier Partner: <span className="font-normal text-gray-500">DHL Global Express Express</span></p>
                          <p>Estimated Cargo ETA: <span className="font-semibold text-[#8B3A3A]">{order.status === "Delivered" ? "Pre-delivered" : "24-48 Hours"}</span></p>
                          <p className="text-[11px] text-gray-400">Your parcel code tracking number will be triggered automatically.</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Table detail */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-[10px] font-sans tracking-[0.15em] uppercase text-gray-400 font-bold border-b border-[#E8E6E1] pb-1.5">
                        Itemized Garments Catalog
                      </h4>
                      <div className="divide-y divide-[#E8E6E1]/50 bg-white rounded-[4px] border border-[#E8E6E1]">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="p-4 flex items-center justify-between text-xs font-sans">
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image}
                                alt={item.productName}
                                className="w-8 h-10 object-cover bg-neutral-100 rounded-[2px]"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <span className="font-medium text-[#1C1C1E] block">{item.productName}</span>
                                <span className="text-[10px] text-gray-400">Size {item.size} / Qty {item.quantity}</span>
                              </div>
                            </div>
                            <span className="font-bold text-[#1C1C1E]">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

import React from "react";
import { TrendingUp, ShoppingBag, Plus, CreditCard, Users, Star, ArrowRight, ClipboardList, CheckCircle2, RefreshCw } from "lucide-react";
import { Order, Product, ViewPage } from "../types";

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  setActivePage: (page: ViewPage) => void;
  onUpdateOrderStatus: (orderId: string, nextStatus: Order["status"]) => void;
}

export default function AdminDashboard({
  orders,
  products,
  setActivePage,
  onUpdateOrderStatus,
}: AdminDashboardProps) {
  // Computations
  const totalRevenue = React.useMemo(() => {
    return orders.reduce((acc, order) => acc + order.total, 0);
  }, [orders]);

  const ordersToday = orders.length;
  const totalProducts = products.length;
  const mockCustomers = 1248 + orders.length; // Dynamic increment

  // Line Chart Data points representing Weekly Revenue
  const weeklyData = [
    { day: "Mon", revenue: 420 },
    { day: "Tue", revenue: 580 },
    { day: "Wed", revenue: totalRevenue > 650 ? Math.floor(totalRevenue * 0.4) : 490 },
    { day: "Thu", revenue: totalRevenue > 650 ? Math.floor(totalRevenue * 0.5) : 810 },
    { day: "Fri", revenue: totalRevenue > 650 ? Math.floor(totalRevenue * 0.6) : 640 },
    { day: "Sat", revenue: totalRevenue > 650 ? Math.floor(totalRevenue * 0.7) : 950 },
    { day: "Sun", revenue: totalRevenue }, // Syncs dynamically up with real-time orders!
  ];

  // Max value to scale SVG height
  const maxRevenueVal = Math.max(...weeklyData.map((d) => d.revenue), 1000);

  // SVG Chart Dimensions
  const chartHeight = 150;
  const chartWidth = 500;

  // Render SVG points
  const pointsString = weeklyData
    .map((d, index) => {
      const x = (index / (weeklyData.length - 1)) * (chartWidth - 40) + 20;
      const y = chartHeight - (d.revenue / maxRevenueVal) * (chartHeight - 40) - 20;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn font-sans">
      
      {/* Brand-consistent Header */}
      <div className="mb-8 border-b border-[#E8E6E1]/50 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] tracking-[0.2em] text-[#C9B99A] uppercase font-bold">
            Administrative Engine
          </span>
          <h1 className="text-3xl font-display font-light text-[#1C1C1E] tracking-tight mt-1">
            VOIRE Management Portal
          </h1>
        </div>
        
        {/* Quick action controls toggling between admin screens */}
        <div className="flex space-x-2">
          <button
            onClick={() => setActivePage("admin_dashboard")}
            className="px-4 py-2 bg-[#1C1C1E] text-white text-[11px] font-sans font-bold tracking-[0.1em] uppercase rounded-[4px] border border-[#1C1C1E]"
          >
            Analytics Overview
          </button>
          <button
            onClick={() => setActivePage("admin_products")}
            className="px-4 py-2 bg-white text-[#1C1C1E] hover:bg-[#E8E6E1] text-[11px] font-sans font-medium tracking-[0.1em] uppercase rounded-[4px] border border-[#E8E6E1] transition-all cursor-pointer"
          >
            Product Catalog Catalog
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR NAVIGATION PANEL COLUMN */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-[#E8E6E1] rounded-[8px] p-5 space-y-4">
            <span className="text-[10px] tracking-widest text-[#C9B99A] font-bold uppercase block pb-2 border-b border-[#E8E6E1]">
              Admin Directories
            </span>
            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => setActivePage("admin_dashboard")}
                className="w-full flex items-center space-x-3 px-4 py-3 text-xs tracking-wider uppercase font-semibold bg-[#F8F7F4] text-[#1C1C1E] rounded-[4px] text-left"
              >
                <TrendingUp className="w-4 h-4 text-[#C9B99A]" />
                <span>Dashboard Analytics</span>
              </button>
              
              <button
                onClick={() => setActivePage("admin_products")}
                className="w-full flex items-center space-x-3 px-4 py-3 text-xs tracking-wider uppercase font-medium text-gray-500 hover:text-[#1C1C1E] hover:bg-[#F8F7F4] rounded-[4px] text-left transition-colors cursor-pointer"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Product Catalog</span>
              </button>

              <button
                onClick={() => setActivePage("product_listing")}
                className="w-full flex items-center space-x-3 px-4 py-3 text-xs tracking-wider uppercase font-medium text-gray-500 hover:text-[#1C1C1E] hover:bg-[#F8F7F4] rounded-[4px] text-left transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Back to Storefront</span>
              </button>
            </nav>

            <div className="pt-4 border-t border-[#E8E6E1] text-center">
              <span className="text-[9px] text-gray-400 block font-mono">VOIRE CMS V3..12</span>
              <span className="text-[8px] text-[#A69777] uppercase tracking-wider block font-bold mt-1">Live Connection Status: Verified</span>
            </div>
          </div>
        </div>

        {/* MAIN PANEL CONTENT - STATS CARDS & CHART */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* STATS CARDS BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Card 1: Total Revenue */}
            <div className="bg-white border border-[#E8E6E1] p-5 rounded-[8px]">
              <div className="flex justify-between items-center text-gray-400 mb-3">
                <span className="text-[10px] tracking-wider uppercase font-bold">Total Revenue</span>
                <CreditCard className="w-4 h-4 text-[#C9B99A]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] tracking-tight">
                ${totalRevenue.toLocaleString()}
              </h3>
              <p className="text-[10px] text-emerald-700 font-medium mt-1">
                +18.4% vs last sales cycle
              </p>
            </div>

            {/* Card 2: Orders today */}
            <div className="bg-white border border-[#E8E6E1] p-5 rounded-[8px]">
              <div className="flex justify-between items-center text-gray-400 mb-3">
                <span className="text-[10px] tracking-wider uppercase font-bold">Orders Today</span>
                <ShoppingBag className="w-4 h-4 text-[#C9B99A]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] tracking-tight">
                {ordersToday}
              </h3>
              <p className="text-[10px] text-emerald-700 font-medium mt-1">
                +2 products newly added
              </p>
            </div>

            {/* Card 3: Total products */}
            <div className="bg-white border border-[#E8E6E1] p-5 rounded-[8px]">
              <div className="flex justify-between items-center text-gray-400 mb-3">
                <span className="text-[10px] tracking-wider uppercase font-bold">Total Products</span>
                <ClipboardList className="w-4 h-4 text-[#C9B99A]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] tracking-tight">
                {totalProducts}
              </h3>
              <p className="text-[10px] text-gray-400 mt-1">
                Across 3 collections
              </p>
            </div>

            {/* Card 4: New customers */}
            <div className="bg-white border border-[#E8E6E1] p-5 rounded-[8px]">
              <div className="flex justify-between items-center text-gray-400 mb-3">
                <span className="text-[10px] tracking-wider uppercase font-bold">New Customers</span>
                <Users className="w-4 h-4 text-[#C9B99A]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] tracking-tight">
                {mockCustomers.toLocaleString()}
              </h3>
              <p className="text-[10px] text-emerald-700 font-medium mt-1">
                +4.2% active conversion rate
              </p>
            </div>

          </div>

          {/* WEEKLY REVENUE LINE GRAPH SECTION */}
          <div className="bg-white border border-[#E8E6E1] p-6 rounded-[8px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-sans tracking-[0.1em] uppercase font-bold text-[#1C1C1E]">
                  Revenue Movement Profile
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Real-time daily transaction velocity</p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-sans font-bold tracking-wider px-2.5 py-1 rounded-[2px] uppercase">
                Upward Trend (+12.4%)
              </span>
            </div>

            {/* SVG responsive container */}
            <div className="w-full bg-[#F8F7F4] border border-[#E8E6E1] rounded-[6px] p-4 flex flex-col justify-between">
              
              {/* Responsive SVG Layout for line chart */}
              <div className="relative h-44 w-full">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-full overflow-visible"
                >
                  {/* Grid Lines */}
                  <line x1="20" y1="30" x2={chartWidth - 20} y2="30" stroke="#E8E6E1" strokeDasharray="3,3" />
                  <line x1="20" y1="70" x2={chartWidth - 20} y2="70" stroke="#E8E6E1" strokeDasharray="3,3" />
                  <line x1="20" y1="110" x2={chartWidth - 20} y2="110" stroke="#E8E6E1" strokeDasharray="3,3" />

                  {/* Gradient fill underneath the line */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9B99A" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#C9B99A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill path matching points */}
                  <path
                    d={`M 20,${chartHeight - 20} ${weeklyData
                      .map((d, index) => {
                        const x = (index / (weeklyData.length - 1)) * (chartWidth - 40) + 20;
                        const y = chartHeight - (d.revenue / maxRevenueVal) * (chartHeight - 40) - 20;
                        return `L ${x},${y}`;
                      })
                      .join(" ")} L ${chartWidth - 20},${chartHeight - 20} Z`}
                    fill="url(#chartGrad)"
                  />

                  {/* The visual line */}
                  <polyline
                    fill="none"
                    stroke="#1C1C1E"
                    strokeWidth="2.5"
                    points={pointsString}
                  />

                  {/* Grid Dots */}
                  {weeklyData.map((d, index) => {
                    const x = (index / (weeklyData.length - 1)) * (chartWidth - 40) + 20;
                    const y = chartHeight - (d.revenue / maxRevenueVal) * (chartHeight - 40) - 20;
                    return (
                      <g key={index} className="group/dot cursor-pointer">
                        <circle
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#C9B99A"
                          stroke="#1C1C1E"
                          strokeWidth="1.5"
                          className="transition-all hover:r-6"
                        />
                        {/* Tooltip elements */}
                        <g className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-300">
                          <rect
                            x={x - 25}
                            y={y - 28}
                            width="50"
                            height="18"
                            fill="#161618"
                            rx="2"
                          />
                          <text
                            x={x}
                            y={y - 16}
                            fill="#F8F7F4"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            ${d.revenue}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Bottom Labels */}
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-2 px-1 border-t border-[#E8E6E1]/50 pt-2">
                {weeklyData.map((d, idx) => (
                  <span key={idx}>{d.day}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RECENT ORDERS TABLE LIST (WITH STATUS MANIPULATORS) */}
          <div className="bg-white border border-[#E8E6E1] p-6 rounded-[8px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-sans tracking-[0.1em] uppercase font-bold text-[#1C1C1E]">
                  Recent Activity Log
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Control live order statuses in real time</p>
              </div>
              <span className="text-xs text-[#8B3A3A] font-semibold">
                {orders.length} Total orders saved
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans divide-y divide-[#E8E6E1]/65 text-[#1C1C1E]">
                <thead>
                  <tr className="text-gray-400 text-[10px] tracking-wider uppercase font-semibold">
                    <th className="py-3 px-3">Order</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Garments Summary</th>
                    <th className="py-3 px-3 text-right">Total Paid</th>
                    <th className="py-3 px-3 text-right">Modifier Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E6E1]/40">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#F8F7F4]/50 transition-colors">
                      <td className="py-4 px-3 font-mono font-bold text-[#1C1C1E]">{order.id}</td>
                      <td className="py-4 px-3 text-gray-500">{order.date}</td>
                      <td className="py-4 px-3 font-medium">{order.shippingAddress.fullName}</td>
                      <td className="py-4 px-3 text-gray-500">
                        {order.items.map((i) => `${i.productName} (${i.size})`).join(", ")}
                      </td>
                      <td className="py-4 px-3 text-right font-semibold">${order.total.toLocaleString()}</td>
                      <td className="py-4 px-3 text-right">
                        
                        {/* Selector targeting state modifier directly */}
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order["status"])}
                          className={`text-[10px] font-sans font-bold uppercase py-1 px-2 border rounded-[2px] bg-white cursor-pointer ${
                            order.status === "Delivered" 
                              ? "border-emerald-200 text-emerald-800" 
                              : order.status === "Shipped"
                              ? "border-rose-200 text-[#8B3A3A]"
                              : "border-gray-200 text-[#1C1C1E]"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

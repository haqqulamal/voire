import React from "react";
import { Plus, Edit2, Trash2, Search, SlidersHorizontal, ArrowLeft, Check, AlertCircle, X } from "lucide-react";
import { Product, ViewPage } from "../types";

interface AdminProductManagementProps {
  products: Product[];
  setActivePage: (page: ViewPage) => void;
  onAddProduct: (newProduct: Product) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function AdminProductManagement({
  products,
  setActivePage,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}: AdminProductManagementProps) {
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("All");
  const [statusFilter, setStatusFilter] = React.useState("All");

  // Drawer / Form trigger states
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  // Form Fields State
  const [formName, setFormName] = React.useState("");
  const [formPrice, setFormPrice] = React.useState<number>(100);
  const [formCategory, setFormCategory] = React.useState<Product["category"]>("Women");
  const [formStatus, setFormStatus] = React.useState<Product["status"]>("In Stock");
  const [formPrimaryImage, setFormPrimaryImage] = React.useState("");
  const [formSecondaryImage, setFormSecondaryImage] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");
  const [formSizesInput, setFormSizesInput] = React.useState("S, M, L, XL");
  const [formDetailsInput, setFormDetailsInput] = React.useState("Premium fabric, Dry clean only, Made locally");

  // Status feedback toast
  const [successToast, setSuccessToast] = React.useState<string | null>(null);

  // Filter products
  const filteredProducts = React.useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, categoryFilter, statusFilter]);

  // Trigger Edit
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormPrice(product.price);
    setFormCategory(product.category);
    setFormStatus(product.status);
    setFormPrimaryImage(product.primaryImage);
    setFormSecondaryImage(product.secondaryImage);
    setFormDescription(product.description);
    setFormSizesInput(product.sizes.join(", "));
    setFormDetailsInput(product.details.join(", "));
    setIsFormOpen(true);
  };

  // Trigger Add New
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName("");
    setFormPrice(120);
    setFormCategory("Women");
    setFormStatus("In Stock");
    setFormPrimaryImage("https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=700&auto=format&fit=crop");
    setFormSecondaryImage("https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=700&auto=format&fit=crop");
    setFormDescription("Premium coordinates curated meticulously to ensure comfort, lightweight, and structured minimalist flows.");
    setFormSizesInput("S, M, L");
    setFormDetailsInput("Shell: 100% Organic Fibers, Loose tailored look, Machine wash cold");
    setIsFormOpen(true);
  };

  // Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const preparedSizes = formSizesInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const preparedDetails = formDetailsInput
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    if (editingProduct) {
      // EDIT MODE
      const updatedItem: Product = {
        ...editingProduct,
        name: formName,
        price: Number(formPrice),
        category: formCategory,
        status: formStatus,
        primaryImage: formPrimaryImage,
        secondaryImage: formSecondaryImage || formPrimaryImage,
        description: formDescription,
        sizes: preparedSizes.length > 0 ? preparedSizes : ["One Size"],
        details: preparedDetails.length > 0 ? preparedDetails : ["Dry clean only"],
      };

      onUpdateProduct(updatedItem);
      setSuccessToast(`Garment "${formName}" updated successfully in master catalog.`);
    } else {
      // ADD MODE
      const newItem: Product = {
        id: `v-${Math.floor(100 + Math.random() * 900)}`,
        name: formName,
        price: Number(formPrice),
        category: formCategory,
        status: formStatus,
        primaryImage: formPrimaryImage,
        secondaryImage: formSecondaryImage || formPrimaryImage,
        description: formDescription,
        sizes: preparedSizes.length > 0 ? preparedSizes : ["One Size"],
        details: preparedDetails.length > 0 ? preparedDetails : ["Dry clean only"],
        featured: true,
      };

      onAddProduct(newItem);
      setSuccessToast(`Newly designed piece "${formName}" integrated into live shop!`);
    }

    setIsFormOpen(false);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleDelete = (productId: string, productName: string) => {
    if (confirm(`Are you sure you intend to delete "${productName}" from live collections?`)) {
      onDeleteProduct(productId);
      setSuccessToast(`Garment deleted from catalog.`);
      setTimeout(() => setSuccessToast(null), 2500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn font-sans">
      
      {/* Toast Feedback */}
      {successToast && (
        <div className="fixed bottom-5 right-5 bg-[#1C1C1E] text-white text-xs font-sans px-4 py-3 rounded-[4px] shadow-lg flex items-center space-x-3 z-50 border border-[#C9B99A]/30 transition-transform animate-slideUp">
          <Check className="w-4 h-4 text-[#C9B99A]" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Admin header */}
      <div className="mb-8 border-b border-[#E8E6E1]/50 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] tracking-[0.2em] text-[#C9B99A] uppercase font-bold">
            Administrative Management
          </span>
          <h1 className="text-3xl font-display font-light text-[#1C1C1E] tracking-tight mt-1">
            Product Catalog Manager
          </h1>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setActivePage("admin_dashboard")}
            className="px-4 py-2 bg-white text-[#1C1C1E] hover:bg-[#E8E6E1] text-[11px] font-sans font-medium tracking-[0.1em] uppercase rounded-[4px] border border-[#E8E6E1] transition-all cursor-pointer"
          >
            Dashboard Analytics
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#8B3A3A] hover:bg-[#8B3A3A]/90 text-white text-[11px] font-sans font-semibold tracking-[0.1em] uppercase rounded-[4px] transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Launch New Piece</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* REUSABLE SIDEBAR */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-[#E8E6E1] rounded-[8px] p-5 space-y-4">
            <span className="text-[10px] tracking-widest text-[#C9B99A] font-bold uppercase block pb-2 border-b border-[#E8E6E1]">
              Management Directories
            </span>
            <nav className="flex flex-col space-y-1">
              <button
                onClick={() => setActivePage("admin_dashboard")}
                className="w-full flex items-center space-x-3 px-4 py-3 text-xs tracking-wider uppercase font-medium text-gray-500 hover:text-[#1C1C1E] hover:bg-[#F8F7F4] rounded-[4px] text-left transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Dashboard Analytics</span>
              </button>
              
              <button
                onClick={() => setActivePage("admin_products")}
                className="w-full flex items-center space-x-3 px-4 py-3 text-xs tracking-wider uppercase font-semibold bg-[#F8F7F4] text-[#1C1C1E] rounded-[4px] text-left"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#C9B99A]" />
                <span>Product Catalog</span>
              </button>

              <button
                onClick={() => setActivePage("product_listing")}
                className="w-full flex items-center space-x-3 px-4 py-3 text-xs tracking-wider uppercase font-medium text-gray-500 hover:text-[#1C1C1E] hover:bg-[#F8F7F4] rounded-[4px] text-left transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storefront</span>
              </button>
            </nav>

            <div className="pt-4 border-t border-[#E8E6E1] text-center">
              <span className="text-[9px] text-gray-400 block font-mono">VOIRE CMS V3.12</span>
              <span className="text-[8px] text-[#A69777] uppercase tracking-wider block font-bold mt-1">Status: Active editing mode</span>
            </div>
          </div>
        </div>

        {/* MAIN PANEL CONTENT - FILTERS & TABLE */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* SEARCH & FILTERS CONTROLS ROW */}
          <div className="bg-white border border-[#E8E6E1] p-4 rounded-[8px] flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xs">
            
            {/* Search Box */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8F7F4] border border-[#E8E6E1] focus:border-[#1C1C1E] focus:outline-none pl-9 pr-4 py-2 text-xs font-sans rounded-[4px]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Selector Options */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              
              {/* Category selector */}
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-semibold text-gray-400 font-sans">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-[#F8F7F4] border border-[#E8E6E1] outline-none text-xs rounded-[4px] px-2.5 py-1.5"
                >
                  <option value="All">All Categories</option>
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              {/* Status Stock selector */}
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-semibold text-gray-400 font-sans">Stock Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#F8F7F4] border border-[#E8E6E1] outline-none text-xs rounded-[4px] px-2.5 py-1.5"
                >
                  <option value="All">All statuses</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

            </div>

          </div>

          {/* PRODUCTS DATA TABLE */}
          <div className="bg-white border border-[#E8E6E1] rounded-[8px] overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans divide-y divide-[#E8E6E1]/70 theme-table">
                <thead className="bg-[#F8F7F4]">
                  <tr className="text-gray-400 text-[10px] tracking-wider uppercase font-semibold">
                    <th className="py-3.5 px-4 h-5">Garment Details</th>
                    <th className="py-3.5 px-4 h-5">Price</th>
                    <th className="py-3.5 px-4 h-5">Category</th>
                    <th className="py-3.5 px-4 h-5">Sizes Available</th>
                    <th className="py-3.5 px-4 h-5">Stock Status</th>
                    <th className="py-3.5 px-4 h-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E6E1]/50">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                      {/* Image + Title */}
                      <td className="py-4 px-4 flex items-center space-x-3">
                        <img
                          src={p.primaryImage}
                          alt={p.name}
                          className="w-10 h-12 object-cover rounded-[2px] bg-neutral-100 border border-[#E8E6E1]"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-semibold text-[#1C1C1E]">{p.name}</p>
                          <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">{p.id}</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-semibold text-[#101010]">${p.price}</td>

                      {/* Category */}
                      <td className="py-4 px-4 text-gray-500 font-medium">{p.category}</td>

                      {/* Sizes */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.sizes.map((s) => (
                            <span key={s} className="px-1.5 py-0.5 text-[9px] font-mono font-medium border border-[#E8E6E1] rounded-[2px] bg-[#F8F7F4]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Stock Status Selector badges */}
                      <td className="py-4 px-4">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
                          p.status === "In Stock" 
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                            : p.status === "Low Stock"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}>
                          {p.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end space-x-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-[4px] border border-[#E8E6E1] text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white hover:border-[#1C1C1E] transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 rounded-[4px] border border-red-100 text-red-700 hover:bg-red-700 hover:text-white hover:border-red-700 transition-all cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400 font-sans">
                        No garments listed matches filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* 3. CRUD CREATE/EDIT FORM MODAL DRAWER OVERLAY */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-end z-[100] animate-fadeIn" style={{ margin: 0 }}>
          <div className="w-full max-w-lg bg-[#F8F7F4] h-full p-6 sm:p-8 overflow-y-auto block animate-slideLeft border-l border-[#E8E6E1]">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E6E1] mb-6">
              <div>
                <h3 className="text-lg font-display text-[#1C1C1E] font-medium">
                  {editingProduct ? `Edit Piece: "${editingProduct.name}"` : "Integrate New Designer Piece"}
                </h3>
                <p className="text-xs text-gray-400 font-sans">Provide metric values to update live storefront immediately.</p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-[#E8E6E1] transition-colors rounded-full cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-[#1C1C1E]" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs font-sans">
              
              <div>
                <label className="block text-[10px] tracking-[0.1em] font-semibold uppercase text-gray-400 mb-2">
                  Garment Blueprint Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Silk Linen Dress Shirt"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-white border border-[#E8E6E1] px-4 py-2.5 rounded-[4px] focus:outline-none focus:border-[#1C1C1E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.1em] font-semibold uppercase text-gray-400 mb-2">
                    Collection Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Product["category"])}
                    className="w-full bg-white border border-[#E8E6E1] px-3 py-2.5 rounded-[4px]"
                  >
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.1em] font-semibold uppercase text-gray-400 mb-2">
                    Unit Price USD ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8E6E1] px-4 py-2.5 rounded-[4px] focus:outline-none focus:border-[#1C1C1E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.1em] font-semibold uppercase text-gray-400 mb-2">
                    Initial Stock Status *
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as Product["status"])}
                    className="w-full bg-white border border-[#E8E6E1] px-3 py-2.5 rounded-[4px]"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.1em] font-semibold uppercase text-gray-400 mb-2">
                    Sizes List (separated by commas) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="XS, S, M, L"
                    value={formSizesInput}
                    onChange={(e) => setFormSizesInput(e.target.value)}
                    className="w-full bg-white border border-[#E8E6E1] px-4 py-2.5 rounded-[4px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.1em] font-semibold uppercase text-gray-400 mb-2">
                    Primary Unsplash Photo URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formPrimaryImage}
                    onChange={(e) => setFormPrimaryImage(e.target.value)}
                    className="w-full bg-white border border-[#E8E6E1] px-4 py-2.5 rounded-[4px] text-[10px] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.1em] font-semibold uppercase text-gray-400 mb-2">
                    Secondary Hover Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formSecondaryImage}
                    onChange={(e) => setFormSecondaryImage(e.target.value)}
                    className="w-full bg-white border border-[#E8E6E1] px-4 py-2.5 rounded-[4px] text-[10px] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.1em] font-semibold uppercase text-gray-400 mb-2">
                  Editorial Narrative Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-white border border-[#E8E6E1] px-4 py-2 text-xs font-sans rounded-[4px] focus:outline-none focus:border-[#1C1C1E]"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.1em] font-semibold uppercase text-gray-400 mb-2">
                  Garment Spec Details (Separated by commas) *
                </label>
                <input
                  type="text"
                  required
                  value={formDetailsInput}
                  onChange={(e) => setFormDetailsInput(e.target.value)}
                  className="w-full bg-white border border-[#E8E6E1] px-4 py-2.5 rounded-[4px]"
                />
                <span className="text-[9px] text-gray-400 mt-1 block">Separate points with comma signs (e.g. 100% Cotton, Dry Clean).</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E8E6E1] flex space-x-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-3 border border-[#E8E6E1] rounded-[4px] text-gray-500 hover:bg-[#E8E6E1] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#8B3A3A] hover:bg-[#8B3A3A]/90 text-white rounded-[4px] font-semibold tracking-wider uppercase cursor-pointer"
                >
                  Save Piece Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

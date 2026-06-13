import { Link, useParams } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function OrderSuccessPage() {
  const { orderNumber } = useParams();

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center min-h-[70vh]">
      <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldCheck className="w-8 h-8 text-emerald-600" />
      </div>
      <span className="text-[10px] tracking-[0.25em] text-[#C9B99A] uppercase font-sans font-medium">
        Payment confirmed
      </span>
      <h1 className="text-3xl sm:text-4xl font-display font-light text-[#1C1C1E] mt-3 mb-4">
        Thank you for your order.
      </h1>
      <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-sm mx-auto mb-8">
        Your VOIRE order <strong className="text-[#1C1C1E]">{orderNumber}</strong> has been received.
      </p>
      <Link
        to="/orders"
        className="inline-flex bg-[#1C1C1E] hover:bg-black text-white text-xs font-sans font-semibold tracking-widest uppercase px-6 py-3.5 rounded-[4px] cursor-pointer transition-colors"
      >
        View order archive
      </Link>
    </div>
  );
}

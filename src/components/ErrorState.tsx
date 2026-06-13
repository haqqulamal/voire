export default function ErrorState({ message = 'Unable to load this view.' }: { message?: string }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center min-h-[60vh]">
      <div className="bg-white border border-[#E8E6E1] rounded-[8px] p-8">
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#8B3A3A] font-bold mb-2">
          Connection interrupted
        </p>
        <h1 className="text-3xl font-display font-light text-[#1C1C1E] mb-3">
          VOIRE could not load the latest data.
        </h1>
        <p className="text-xs text-gray-500 font-sans">{message}</p>
      </div>
    </div>
  );
}

const MarkIcon = ({ count }: { count: number }) => (
  <div className="absolute cursor-pointer group -translate-x-1/2 -translate-y-[calc(100%+2px)]">
    <div className="animate-marker-drop">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg transition-transform group-hover:scale-110"
      >
        <rect x="6" y="12" width="24" height="18" rx="2" fill="#f59e0b" />
        <rect x="4" y="8" width="28" height="5" rx="1.5" fill="#d97706" />
        <rect x="14" y="5" width="8" height="4" rx="1" fill="#b45309" />
        <rect x="6" y="17" width="24" height="2" fill="#d97706" opacity="0.6" />
        <rect x="6" y="22" width="24" height="2" fill="#d97706" opacity="0.6" />
        <circle cx="11" cy="31" r="2.5" fill="#b45309" />
        <circle cx="25" cy="31" r="2.5" fill="#b45309" />
      </svg>
      {Boolean(count) && (
        <div className="absolute -top-1 -right-1 bg-amber-950 text-amber-300 text-[10px] font-bold rounded-full min-w-4 h-4 flex items-center justify-center shadow border border-amber-700 px-1 leading-none">
          {count}
        </div>
      )}
      <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2 h-2 bg-amber-500 rotate-45 rounded-full" />
    </div>
  </div>
);

export default MarkIcon;

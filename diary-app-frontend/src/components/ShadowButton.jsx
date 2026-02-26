const ShadowButton = ({ children, onClick, className = "",type="button" }) => {
  return (
    <button 
    type={type} 
    onClick={onClick}
     className={`relative group ${className}`}
     >
      <span className={`absolute ${className} top-1 left-1 rounded bg-black transition-transform duration-200 group-hover:translate-x-[2px] group-hover:translate-y-[2px]  w-full h-full`}></span>
      <span className={`relative ${className} inline-block rounded border-2 border-black bg-white px-4 py-2 text-base font-bold text-black transition-all duration-200 hover:bg-amber-950 hover:text-yellow-100`}>
        {children}
      </span>
    </button>
  );
};
 export default ShadowButton;
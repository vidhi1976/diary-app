const ShadowBox = ({ children, className = "", }) => {
  return (
    <div className={`relative group lg:h-[500px] lg:w-[450px] 
        h-[480px] w-[380px]  ${className}`}>
      {/* Shadow layer */}
      <div className={`absolute ${className} top-3 left-3 rounded-2xl bg-black transition-transform duration-200 group-hover:translate-x-[3.5px] group-hover:translate-y-[3.5px] w-full h-full`}></div>

      {/* Main box */}
      <div className={`relative ${className} lg:h-[500px] lg:w-[450px] h-[480px] w-[380px] rounded-2xl border-2 border-black bg-white p-6 transition-all duration-200 `}>
        {children}
      </div>
    </div>
  );
};

export default ShadowBox;
'use client';

export default function ButtonMain({ type = "primary", children, onClick }) {

    const baseStyles = "z-20 rounded-full font-bold transition-all duration-300  cursor-pointer touch-manipulation shadow w-32 h-11 text-sm text-yellow-500 ";

    /// เหลือแก้สีปุ่ม
    const typeStyles = { 
        primary: "bg-black text-white border-transparent border-0 hover:bg-gray-200 hover:text-amber-600 transition-all duration-300  cursor-pointer  active:bg-gray-300 active:text-amber-800 z-20",
        secondary: "bg-gray-200 text-black border border-gray-400 hover:bg-gray-300 active:bg-gray-400 z-20",
        outline: "bg-transparent text-black border border-black hover:bg-black hover:text-white active:bg-gray-900 z-20",
        danger: "bg-red-600 text-white border border-red-700 hover:bg-red-700 active:bg-red-800 z-20",
        success: "bg-green-600 text-white border border-green-700 hover:bg-green-700 active:bg-green-800 z-20",
    };

    return (
        <button 
            className={`${baseStyles} ${typeStyles[type] || typeStyles.primary}`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
}
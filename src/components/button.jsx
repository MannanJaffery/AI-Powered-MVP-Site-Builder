


const Button = ({ text, color , bgcolor_border ,onClick }) => {
  return (
    <button className={`relative px-5 py-2.5 overflow-hidden font-medium text-gray-600 border ${bgcolor_border}  rounded-lg shadow-inner group mt-6`}
    type="button"
    onClick={onClick}>
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full"></span>
            <span className={`absolute inset-0 w-full h-full duration-300 delay-300 ${color} opacity-0 group-hover:opacity-100`}></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white">
              {text}
            </span>
    </button>
  );
};

export default Button;


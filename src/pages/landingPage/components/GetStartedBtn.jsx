import { useNavigate } from "react-router-dom";

const GetStartedBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chat");
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex items-center justify-center w-44 h-14 bg-amber-400 text-slate-900 font-bold uppercase tracking-widest rounded-xl cursor-pointer overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_10px_20px_rgba(251,191,36,0.2)] hover:shadow-amber-500/40 border-b-4 border-amber-600"
    >
      {/* Icon Section */}
      <div className="absolute left-6 transition-all duration-500 ease-in-out group-hover:left-[42%] group-hover:scale-125">
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z" />
        </svg>
      </div>

      {/* Text Section */}
      <span className="ml-8 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-x-10 text-xs md:text-sm">
        Get Started
      </span>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default GetStartedBtn;

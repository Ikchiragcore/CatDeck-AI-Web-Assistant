import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const generateStars = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: Math.random(), // Unique ID for keys
    size: Math.random() * 2 + 1,
    top: `${Math.random() * 50}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 4,
    direction: Math.random() > 0.5 ? "topLeft" : "topRight",
  }));
};

function NotFoundPage() {
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setStars(generateStars(30));

    const interval = setInterval(() => {
      setStars((prev) => [...prev.slice(-20), ...generateStars(10)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9770934.jpg-Wl31ERQfbntJABIblVId5PIBjqP5Gx.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Falling Stars Animation Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-80"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `${star.direction === "topLeft" ? "fallTopLeft" : "fallTopRight"} ${star.duration}s linear infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* UFO Section */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-float-tilt">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8794272-p5k6GdbD8O2RIat5GWtUGJGkDgXoxf.png"
          alt="UFO"
          className="w-64 md:w-75"
        />
      </div>

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-8xl font-bold drop-shadow-lg">404</h1>
        <p className="mb-8 text-xl text-gray-300">
          Oops! Looks like this page got lost in space
        </p>

        {/* React Router Navigation */}
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors shadow-lg font-semibold"
        >
          Return Home
        </button>
      </div>

      <style>{`
        @keyframes fallTopLeft {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-100px, 100vh); opacity: 0; }
        }
        @keyframes fallTopRight {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(100px, 100vh); opacity: 0; }
        }
        @keyframes floatTilt {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(-2deg); }
          50% { transform: translate(-50%, -50%) translateY(-20px) rotate(2deg); }
        }
        .animate-float-tilt {
          animation: floatTilt 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default NotFoundPage;

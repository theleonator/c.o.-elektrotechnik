import { useState, useEffect } from "react";

interface RefImage {
  src: string;
  alt: string;
  text?: string;
}

export default function ReferenceSlider() {
  const images: RefImage[] = [
    { src: "/industrieslider.jpg", alt: "Industrieinstallation", text: "Industrieinstallation" },
    { src: "/neubauslider.jpg", alt: "Neubau", text: "Neubau" },
    { src: "/sanierungslider.jpg", alt: "Sanierung", text: "Sanierung" },
  ];

  const [current, setCurrent] = useState<number>(0);

  // Autoplay alle 4 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-10">
      {/* Bild */}
      <div className="overflow-hidden rounded-xl shadow-lg">
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="w-full h-80 object-cover transition-all duration-500"
        />
      </div>

      {/* Linker Pfeil */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
        aria-label="Vorheriges Bild"
      >
        ❮
      </button>

      {/* Rechter Pfeil */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
        aria-label="Nächstes Bild"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? "bg-red-600" : "bg-gray-300"
            }`}
            aria-label={`Bild ${idx + 1}`}
          ></button>
        ))}
      </div>

      {/* Optional: Text */}
      {images[current].text && (
        <p className="text-center mt-4 text-gray-600">
          {images[current].text}
        </p>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";

interface RefImage {
  src: string;
  alt: string;
  label: string;
}

export default function ReferenceSlider() {
  const images: RefImage[] = [
    { src: "/industrieslider.jpg", alt: "Industriebaustelle", label: "Industriebaustelle" },
    { src: "/neubauslider.jpg", alt: "Neubauinstallation", label: "Neubauinstallation" },
    { src: "/sanierungslider.jpg", alt: "Altbausanierung", label: "Altbausanierung" },
  ];

  const [current, setCurrent] = useState<number>(0);

  // Autoplay alle 8 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10">

      {/* Bild-Container mit Fade */}
      <div className="relative h-80 md:h-[420px] overflow-hidden rounded-xl shadow-lg bg-black">
        {images.map((img, idx) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000 ease-in-out
              ${idx === current ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}
      </div>

      {/* Linker Pfeil */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-red-700 transition"
        aria-label="Vorheriges Bild"
      >
        ❮
      </button>

      {/* Rechter Pfeil */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-red-700 transition"
        aria-label="Nächstes Bild"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-4 h-4 rounded-full transition all ${
              idx === current ? "bg-red-600 scale-110 shadow-md" : "bg-gray-300 hover:bg-red-400"
            }`}
            aria-label={`Bild ${idx + 1}`}
          />
        ))}
      </div>

      {/* Weißer Text unter dem Slider */}
      <p className="text-center mt-6 text-lg font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
        {images[current].label}
      </p>
    </div>
  );
}

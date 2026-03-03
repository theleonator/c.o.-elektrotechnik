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
    }, 8000); // 8 Sekunden

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10">
      {/* Bild */}
      <div className="overflow-hidden rounded-xl shadow-lg">
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="w-full h-80 md:h-[420px] object-cover transition-all duration-500"
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
          />
        ))}
      </div>

      {/* Beschreibung pro Bild */}
      <p className="text-center mt-6 text-lg font-medium text-gray-700">
        {images[current].label}
      </p>
    </div>
  );
}
``

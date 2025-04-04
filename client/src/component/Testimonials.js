import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "This system makes gym booking so easy! No more overcrowding.",
    name: "Alex M.",
  },
  {
    text: "FlexFit is a game-changer! I always get my preferred slot.",
    name: "Sarah T.",
  },
  {
    text: "No more waiting for equipment. Best gym management system!",
    name: "John D.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#252525] text-white py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#28A428]">
          What Our Members Say
        </h2>
        <p className="text-gray-400 text-center mt-2">
          Real feedback from our gym members.
        </p>

        <div className="relative max-w-3xl mx-auto my-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-lg text-gray-300">
                "{testimonials[currentIndex].text}"
              </p>
              <h4 className="mt-2 text-[#28A428] font-semibold">
                - {testimonials[currentIndex].name}
              </h4>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#28A428] text-black p-2 rounded-full hover:bg-green-700 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#28A428] text-black p-2 rounded-full hover:bg-green-700 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

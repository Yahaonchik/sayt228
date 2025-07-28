import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WashingMachineProps {
  isRunning?: boolean;
  onToggle?: () => void;
}

export default function WashingMachine({ isRunning = false, onToggle }: WashingMachineProps) {
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isRunning) {
      const newBubbles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        delay: Math.random() * 2,
      }));
      setBubbles(newBubbles);
    } else {
      setBubbles([]);
    }
  }, [isRunning]);

  return (
    <div className="relative">
      {/* Main Machine Body */}
      <div className="relative w-80 h-96 bg-wash-machine rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-200">
        
        {/* Top Control Panel */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-100 to-gray-200 border-b-2 border-gray-300">
          <div className="flex items-center justify-center h-full space-x-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          </div>
        </div>

        {/* Door Frame */}
        <div className="absolute top-20 left-6 right-6 bottom-6">
          <div className="relative w-full h-full bg-wash-door rounded-full border-8 border-gray-300 shadow-inner overflow-hidden">
            
            {/* Glass Door */}
            <div className="absolute inset-4 bg-gradient-to-br from-blue-50 to-transparent rounded-full border-4 border-gray-200 shadow-inner overflow-hidden">
              
              {/* Drum */}
              <motion.div
                className="absolute inset-6 bg-wash-drum rounded-full border-2 border-gray-400 shadow-lg"
                animate={isRunning ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  duration: 2,
                  repeat: isRunning ? Infinity : 0,
                  ease: "linear"
                }}
              >
                {/* Drum holes pattern */}
                <div className="absolute inset-0 rounded-full">
                  {Array.from({ length: 24 }, (_, i) => {
                    const angle = (i * 15) * Math.PI / 180;
                    const radius = 60;
                    const x = Math.cos(angle) * radius + 50;
                    const y = Math.sin(angle) * radius + 50;
                    return (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-gray-500 rounded-full"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    );
                  })}
                </div>

                {/* Center hole */}
                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner" />
              </motion.div>

              {/* Water level */}
              <AnimatePresence>
                {isRunning && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-wash-water to-transparent rounded-b-full opacity-60"
                    initial={{ height: "0%" }}
                    animate={{ height: "40%" }}
                    exit={{ height: "0%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>

              {/* Soap Bubbles */}
              <AnimatePresence>
                {isRunning && bubbles.map((bubble) => (
                  <motion.div
                    key={bubble.id}
                    className="absolute w-3 h-3 bg-wash-bubble rounded-full opacity-70 shadow-lg"
                    style={{
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0.8, 1.2, 0],
                      opacity: [0, 0.8, 0.6, 0.4, 0],
                      y: [-20, -40, -60, -80, -100],
                    }}
                    transition={{
                      duration: 4,
                      delay: bubble.delay,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </AnimatePresence>

              {/* Door Handle */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-gray-400 rounded-l-full shadow-lg border-2 border-gray-500" />
            </div>
          </div>
        </div>

        {/* Control Knob */}
        <motion.div
          className="absolute top-20 right-8 w-12 h-12 bg-wash-control rounded-full shadow-lg border-4 border-blue-300 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          animate={isRunning ? { rotate: [0, 15, -15, 0] } : {}}
          transition={isRunning ? { duration: 0.5, repeat: Infinity } : {}}
        >
          <div className="absolute top-1 left-1/2 w-1 h-4 bg-white rounded transform -translate-x-1/2" />
        </motion.div>

        {/* Status Display */}
        <div className="absolute top-32 right-8 w-16 h-8 bg-black rounded flex items-center justify-center">
          <span className="text-green-400 text-xs font-mono">
            {isRunning ? "RUN" : "OFF"}
          </span>
        </div>

        {/* Base shadow */}
        <div className="absolute bottom-0 left-4 right-4 h-2 bg-gray-400 rounded-full opacity-30 blur-sm" />
      </div>

      {/* Machine vibration effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={isRunning ? {
          x: [0, 1, -1, 0],
          y: [0, 0.5, -0.5, 0]
        } : {}}
        transition={isRunning ? {
          duration: 0.1,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
      />
    </div>
  );
}

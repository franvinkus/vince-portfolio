"use client";
import { motion } from "framer-motion";

export default function BlackHoleInterstellar() {
  return (
    <div className="relative flex items-center justify-center h-[500px] w-full perspective-[1000px]">
      
      {/* Horizontal Disk */}
      <motion.div
        className="absolute w-150 h-150 rounded-full border-40 border-amber-500 blur-md"
        style={{
            background: "radial-gradient(circle, transparent 50%, rgba(255,255,255,0.8) 60%, transparent 70%)",
            boxShadow: "0 0 100px rgba(255, 69, 0, 0.6)"
        }}
        initial={{ rotateX: 75 }} 
        animate={{ rotateZ: 360 }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* BlackHole */}
      <div className="relative z-20 w-62.5 h-62.5 bg-black rounded-full shadow-[0_0_60px_rgba(255,165,0,0.5)]">

        <div className="absolute -inset-2 bg-orange-200 rounded-full blur-3xl z-10 opacity-70 scale-50" />
      </div>

    </div>
  );
}
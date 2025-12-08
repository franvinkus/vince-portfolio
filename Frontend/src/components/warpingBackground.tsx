"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StarBackground(){

    const [stars, setStars] = useState<{id: number; x: number; y: number; size: number; delay: number}[]>([]);

    useEffect(() => {
        const countStars = 60;
        const newStars = Array.from({length: countStars}).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 5,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="fixed z-0 inset-0 pointer-events-none">
            {stars.map((index)=> (
                <motion.div
                key={index.id}
                className="absolute bg-white rounded-full opacity-20"
                style={{
                    left: `${index.x}%`,
                    top: `${index.y}%`,
                    width: index.size,
                    height: index.size,
                }}
                animate={{
                    opacity:[0.2, 0.8, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    delay: index.delay,
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                />
            ))}
        </div>
    );
}
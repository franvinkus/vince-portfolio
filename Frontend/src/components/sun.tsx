"use client";
import { easeOut, motion, scale, Variants } from "framer-motion";
import Rocket from "./rocket";
import { useState } from "react";
import { useRouter } from "next/navigation";

const sceneVariants: Variants = {
    idle:{
        x:0,
        y:0,
        rotate:360,
        opacity: 1,
        z:100,
        transition:{
            duration: 7,
            repeat: Infinity,
            ease: "linear"
        }
    },
    launching:{
        x:-30,
        y:-40,
        scale: 15,
        rotate: 300,
        opacity: 0,
        z: 100,
        transition:{
            duration: 1,
            ease:"easeOut"
        }
    }
}

const buttonVariants: Variants = {
    idle:{
        opacity: 1,
    },
    launching:{
        scale: 15,
        opacity: 0,
        z:100,
        transition:{
            duration: 1,
            ease:"easeOut"
        }
    }
}

export default function Sun(){

    const router = useRouter();
    const [isLaunching, setIsLaunching] = useState(false);

    return(
        <motion.div 
        initial={{x:1000, y:1000, opacity:0}}
        animate={{x:0, y:0, opacity: 1}}
        transition={{duration: 3, ease:"easeIn"}}
        className="absolute -top-40 -right-20 md:-right-20"
        >
            <motion.div
            className={`relative h-80 w-80 bg-linear-to-br from-amber-500 bg-yellow-300 rounded-full`}
            variants={sceneVariants}
            animate={`${isLaunching? "launching" : "idle"}`}
            onAnimationComplete={(launch) => {
                if(launch === "launching"){
                    router.push('../aboutmepage/');
                }
            }}
            >
                <div className="scale-[0.3] -translate-x-50">
                    <Rocket/>
                </div>

            </motion.div>

            <motion.div 
            className="relative -left-57 bottom-30 -rotate-7 hover:cursor-pointer"
            variants={buttonVariants}
            animate={`${isLaunching? "launching" : "idle"}`}
            onClick={() => setIsLaunching(true)}
            >
                <h1 className="text-white text-4xl md:text-3xl z-100">About Me</h1>
                <motion.h1 
                className="relative text-white text-3xl left-5"
                animate={{x: [0, 60, 0]}}
                transition={{repeat: Infinity, duration: 10}}
                > 
                    → 
                </motion.h1>
            </motion.div>
        </motion.div>
    );
}
"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StarBackground from "@/components/StarBackground";

const sceneVariants: Variants = {
    hidden:{
        rotateY: 40, 
        rotateZ: -3,
        opacity: 0,
        x: -200,
        scale: 0.8,
        z: -500 
    },
    visible:{
        rotateY: 30,
        rotateZ: -5,
        opacity: 1,
        x: 0,
        scale: 1.8,
        transition:{
            duration: 3,
            ease:"easeOut"
        }
    },
    launching:{
        scale: 15,
        z:1000,
        opacity: 0,
        rotateY: 0,
        x: -10000, 
        y:-1000,
        transition:{
            duration: 2,
            ease:[0.64, 0.04, 0.35, 1.0]
        }
    }
}

const buttonVariants: Variants = {
    hidden:{
        opacity: 0,
        x: 20,
    },
    visible:{
        opacity: 1,
        x:20,
        transition:{
            duration: 2
        }
    },
    launching:{
        x: 750,
        // y:-100,
        opacity: 1,
        transition:{
            duration: 1,
        }
    }
}
    

export default function landingpage(){

    const router = useRouter();
    const [isLaunched, setIsLaunched] = useState(false);

    const handlebutton = () =>{
        setIsLaunched(true);    
    }

    return (
      <div className="flex h-screen w-full items-center justify-start bg-[#050510] overflow-hidden md:pl-40">
        <StarBackground/>
        <div className=" relative z-10 perspective-midrange scale-60 -ml-20 md:scale-100">
            <motion.div
            variants={sceneVariants}
            initial="hidden"
            animate={isLaunched ? "launching" : "visible"}
            style={{transformStyle: "preserve-3d"}}
            className="text-white leading-tight ml-10"
            onAnimationComplete={(definition) =>{
                if(definition === "launching"){
                    router.push(`../projectpage/`);
                }
            }}
            >
                <h1 className="text-8xl tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 drop-shadow-2xl">
                    WELCOME
                </h1>
                
                <h1 className="text-5xl mt-3 text-gray-500"> 
                    GET READY FOR <br /> THE JOURNEY
                </h1>

                <motion.button
                className="text-3xl mt-3 cursor-pointer relative z-50"
                whileHover={{scale: 1.5}}
                whileTap={{scale : 0.8}}
                onClick={handlebutton}
                variants={buttonVariants}
                >
                    Start →
                </motion.button>

            </motion.div>
        </div>

    </div>  
    );
}
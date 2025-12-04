"use client";
import BackButton from "@/components/backButton";
import StarBackground from "@/components/StarBackground";
import { Project } from "@/type/types";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectProps{
    projects: Project;
}

const exitVariants: Variants = {
    idle:{
        x: 0,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
    },
    warpBack:{
        scale: 0.8,
        opacity: 0,
        y: 100,
        filter: "blur(10px)",
        transition:{
            duration: 0.5,
            ease: "easeIn"
        }
    }
}

export default function DetailProjectClient({projects}:ProjectProps){
    const router = useRouter();
    const [isWarpBack, setIsWarpBack] = useState(false);

    console.log("this is the client side:",projects);

    return(
        <div className="w-full min-h-screen bg-[#050510] relative overflow-hidden">
            <StarBackground/>
            
            <motion.div
                variants={exitVariants}
                animate={`${isWarpBack? "warpBack" : "idle" }`}
                className="relative z-10 origin-top"
                onAnimationComplete={(back) =>{
                    if(back === "warpBack"){
                        router.back();
                    }
                }}
                >
                
                <BackButton onClick={() => setIsWarpBack(true)}/>


                <div>
                    <h1></h1>
                </div>
            </motion.div>

        </div>
    );
}

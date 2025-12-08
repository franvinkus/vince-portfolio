"use client";
import ProjectPlanetCard from "@/components/projectPlanetCard";
import StarBackground from "@/components/StarBackground";
import { ProjectThumbnail } from "@/type/types";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/backButton";
import Sun from "@/components/sun";


interface ProjectProps{
    projects: ProjectThumbnail[]
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

export default function ProjectPage({ projects }: ProjectProps){

    const [isWarpBack, setIsWarpBack] = useState(false);
    const router = useRouter();

    return (
        <div className="w-full min-h-screen bg-[#050510] relative overflow-hidden">
            <StarBackground/>

            <motion.div
            className="fixed z-50 hover:cursor-pointer"
            animate={{opacity: isWarpBack? 0 : 1}}
            transition={{duration: 0.3}}
            >
                <BackButton onClick={() => setIsWarpBack(true)} string={"Abort Journey"}/>
            </motion.div>

            <Sun />

            <motion.div
                variants={exitVariants}
                animate={`${isWarpBack? "warpBack" : "idle" }`}
                className="relative z-10 origin-top"
                onAnimationComplete={(back) =>{
                    if(back === "warpBack"){
                        router.push('/');
                    }
                }}
            >
                

            {projects.map((item, index) => {
                const isEven = index % 2 === 0;
                
                return (
                    <motion.div
                    key={index}
                    initial={{x: isEven? -1000 : 1000, opacity: 0}}
                    whileInView={{x: 0, opacity: 1}}
                    viewport={{once: true, margin: "-100px"}}
                    transition={{ease:"easeOut", duration:3}}
                    className="mt-35"
                    >
                        <ProjectPlanetCard
                            index={index}
                            items={item}
                            />
                    </motion.div>
                );
            })}
            </motion.div>
        </div>
    );
}
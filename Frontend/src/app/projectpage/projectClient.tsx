"use client";
import ProjectPlanetCard from "@/components/projectPlanetCard";
import StarBackground from "@/components/StarBackground";
import { ProjectThumbnail } from "@/type/types";
import { distance, motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/backButton";
import Sun from "@/components/sun";
import BlackHole from "@/components/blackhole";
import dynamic from "next/dynamic";


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
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile (window.innerWidth < 768);
        };

        checkScreenSize();

        window.addEventListener("resize", checkScreenSize);
        return () =>  window.removeEventListener("resize", checkScreenSize);
    }, []);

    const animationSetting = {
        distance : isMobile? 100 : 1000,
        duration : isMobile? 0.8 : 3,
    }

    const StarBackground = dynamic(() => import("@/components/StarBackground"),{
        ssr:false,
        loading: () => <div className="fixed inset-0 bg-[#050510]" />
    });

    return (
        <div className="w-full min-h-screen bg-[#050510] relative overflow-hidden">
            <StarBackground/>

            <motion.div
            className="fixed z-50 hover:cursor-pointer scale-95 md:scale-100"
            animate={{opacity: isWarpBack? 0 : 1}}
            transition={{duration: 0.3}}
            >
                <BackButton onClick={() => setIsWarpBack(true)} string={"Abort Journey"}/>
            </motion.div>

            <motion.div
            className="z-50 relative hover:cursor-pointer scale-50 -right-35 md:scale-100 md:-right-10"
            animate={{opacity: isWarpBack? 0 : 1}}
            transition={{duration: 0.3}}
            >
                <Sun />
            </motion.div>

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
                    key={`${index}-${isMobile}`}
                    initial={{x: isEven? -animationSetting.distance : animationSetting.distance, opacity: 0}}
                    whileInView={{x: 0, opacity: 1}}
                    viewport={{once: true, margin: isMobile? "-50px" : "-200px"}}
                    transition={{ease:"easeOut", duration: animationSetting.duration}}
                    className="mt-35"
                    >
                        <ProjectPlanetCard
                            index={index}
                            items={item}
                            isPriority={index === 0}
                            />
                    </motion.div>
                );
            })}

            <div className="relative flex justify-center mt-35 -mb-50 md:-mb-30">
                <h1 className="text-white text-2xl md:text-4xl"> More Project Incoming</h1>
            </div>

            <div className=" relative -bottom-30 md:-bottom-60 p-8 md:scale-200">
                <BlackHole/>
            </div>
            
            </motion.div>
        </div>
    );
}
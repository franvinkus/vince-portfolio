"use client";
import BackButton from "@/components/backButton";
import StarBackground from "@/components/StarBackground";
import { Project } from "@/type/types";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PLANET_STYLES } from "@/app/constants/styles";

interface ProjectProps{
    projects: Project;
}

const planetStyles= PLANET_STYLES;

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
        y: 500,
        filter: "blur(10px)",
        transition:{
            duration: 0.4,
            ease: "easeIn"
        }
    }
}

export default function DetailProjectClient({projects}:ProjectProps){
    const router = useRouter();
    const [isWarpBack, setIsWarpBack] = useState(false);
    const searchParams = useSearchParams();
    const [currentIndex, setCurrentIndex] = useState(0);

    const idxString = searchParams.get('idx');
    const index = idxString? parseInt(idxString) : 0;
    const style = planetStyles[index % planetStyles.length];

    const handleNext = () => {
        if (currentIndex < projects.images.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if(currentIndex > 0){
            setCurrentIndex((prev) => prev - 1);
        }
    }

    console.log("this is the client side:",projects);

    return(
        <div className="w-full h-screen bg-[#050510] relative overflow-hidden flex flex-col">
            <StarBackground/>
            
            <motion.div
                variants={exitVariants}
                animate={`${isWarpBack? "warpBack" : "idle" }`}
                className="relative z-10 origin-top w-full h-full"
                initial={{opacity: 0, y:100}}
                whileInView={{opacity: 1, y:0}}
                transition={{duration: 3}}
                onAnimationComplete={(back) =>{
                    if(back === "warpBack"){
                        router.back();
                    }
                }}
                >
                
                <BackButton onClick={() => setIsWarpBack(true)} string={"Exit Planet"}/>

                <div className="w-full h-full flex flex-col justify-between items-center pb-10 gap-10">
                    {/* Project Name */}
                    <h1 className="text-6xl max-w-3xl text-white translate-y-5 hover:cursor-default"> {projects.name}</h1>

                    {/* Project Details */}
                    <p className="w-350 text-xl text-gray-300 hover:cursor-default"> {projects.details}</p>

                    {/* Project Images */}
                    <div className="relative w-175 h-87.5 backdrop-blur-2xl group z-10 -mt-4">
                        <div className="w-full h-full relative border-2 border-white rounded-xl p-4">
                            <img 
                            src={projects.images[currentIndex]}
                            className="w-full h-full object-contain"
                            />
                        </div>

                        {currentIndex !== 0 && (
                            <button 
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                ←
                            </button>
                        )}

                        {currentIndex !== projects.images.length - 1 && (
                            <button 
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                →
                            </button>
                        )}
                    </div>

                    {/* Project Tech Stacks*/}
                    <div className="flex flex-wrap gap-4 text-white z-10 -mt-4 hover:cursor-default">
                        {projects.stack.map((stack, idx) => (
                            <span
                            className="px-4 border-2 border-white rounded-full bg-white/10 backdrop-blur-md"
                            key={idx}>
                                {stack}
                            </span>
                        ))}
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-wrap gap-4 z-10 -mt-4 text-white">
                        {projects.repoLink.map((link, idx) => (
                            <a
                            className="px-4 border-2 border-white rounded-full bg-white/10 backdrop-blur-md"
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <motion.div 
                    className={`absolute bottom-0 left-1/2 w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] 
                    rounded-full ${style.gradient} ${style.shadow} z-0 -translate-x-1/2 translate-y-[75%]`}
                    animate={{rotate:360}}
                    transition={{repeat:Infinity, duration: 5}}
                    >

                    </motion.div>

                </div>

            </motion.div>

        </div>
    );
}

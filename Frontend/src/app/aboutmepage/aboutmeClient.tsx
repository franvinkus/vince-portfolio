"use client";

import BackButton from "@/components/backButton";
import StarBackground from "@/components/StarBackground";
import { Profile } from "@/type/types";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileProps{
    profile: Profile;
}

const variants: Variants = {
    enter:{
        y:1000,
        opacity:0,
        scale:0.3,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
    },
    idle:{
        x: 0,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
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

export default function AboutMeClient({ profile }: ProfileProps){

    const [isWarpBack, setIsWarpBack] = useState(false);
    const router = useRouter();

    return(
        <div className="w-full h-screen bg-[#050510] relative overflow-hidden">
            <motion.div 
            variants={variants}
            initial={"enter"}
            animate={`${isWarpBack? "warpBack" : "idle"}`}
            className="h-full"
            onAnimationComplete={(back) =>{
                    if(back === "warpBack"){
                        router.back();
                    }
            }}
            >
                <StarBackground/>

                <motion.div
                    className="fixed z-50 hover:cursor-pointer"
                    animate={{opacity: isWarpBack? 0 : 1}}
                    transition={{duration: 0.3}}
                    >
                        <BackButton onClick={() => setIsWarpBack(true)} string={"Exit Star"}/>
                </motion.div>

                <div className="absolute flex top-3 right-3">
                    <motion.div
                    animate={{rotate:360}}
                    transition={{duration: 3, repeat: Infinity, ease:"linear"}}
                    className={"w-100 h-100 bg-linear-to-r from-amber-600 to-yellow-400 rounded-full transform-3d shadow-amber-400 shadow-[0_0_30px]"}
                    />
                </div>
                
                <div className="h-full relative flex items-center top-5">

                    {/* Card */}
                    <div className="flex flex-col gap-y-5 relative left-25 border-3 border-white shadow-[0_0_30px_#ffffff] rounded-xl bg-black/50 backdrop-blur-md md:p-12">

                        <div className="flex flex-row gap-x-10">

                            {/* Profile Picture */}
                            <div className="w-52 h-90 flex items-center">
                                <img src={profile.picture} className="rounded-xl border-4 border-white shadow-[0_0_30px_#ffffff] hover:border-purple-400 hover:shadow-[0_0_40px_#8803fc]"/>
                            </div>

                            <div className="flex flex-col gap-y-5 ">

                                <div className="flex flex-row gap-x-5" >
                                    {/* Name */}
                                    <p className="text-white text-4xl"> {profile.fullname} </p>

                                    {/* Headline */}
                                    <p className="px-6 py-1 text-white text-xl border-2 border-white rounded-xl hover:cursor-default bg-black/50 backdrop-blur-md"> {profile.headline} </p>
                                </div>

                                {/* Bio */}
                                <p className="text-white text-l max-w-240 whitespace-pre-line"> {profile.fullbio}</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">

                            {/* Email */}
                            <p className="text-white text-l px-6 py-2"> Email: {profile.email}</p>

                            {/* Socials */}
                            {profile.socials.map((social, idx) => (
                                <a 
                                key={idx}
                                href={social.url}
                                className="text-white text-l px-6 py-2 border-3 rounded-xl hover:border-purple-400 hover:shadow-[0_0_40px_#8803fc]"
                                target="_blank"
                                > 
                                    {social.label}
                                </a>
                            ))}


                        </div>

                    </div>
                </div>

            </motion.div>  
        </div>
    );
}
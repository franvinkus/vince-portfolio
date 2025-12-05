"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


interface BackButtonProps{
    onClick?: () => void,
    string: string,
}

export default function BackButton({ onClick, string }: BackButtonProps){

    const router = useRouter();

    const handleButton = () =>{
        if(onClick){
            onClick();
        }
        else{
            router.back();
        }
    }

    return(
        <div className="fixed top-3 left-3">
            <motion.div 
                className="flex flex-row gap-3 text-2xl text-white mt-3 ml-3 p-4 hover:cursor-pointer"
                initial={{x:-100 , opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration:3, ease:"easeOut"}}
                onClick={handleButton}
                >
                    <motion.h1 
                    animate={{x: [0, -10, 0]}}
                    transition={{duration: 3, repeat: Infinity}}
                    >
                        ← 
                    </motion.h1>
                    <h1 > {string} </h1>
                </motion.div>

        </div>
    );
}
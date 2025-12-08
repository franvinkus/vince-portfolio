"use client";
import { motion, Variants } from "framer-motion";

interface RocketProps{
    isEven?: boolean,
    isLaunching?: boolean,
}

export default function Rocket({isLaunching = false,isEven}: RocketProps){

    const flyDirection = isEven? -50 : 50;

    const rocketVariants: Variants = {
        idle:{
            y: [0, -100, 0],
            transition:{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
            }
        },
        warp:{
            x: flyDirection,
            scale: 15,
            opacity: 0 ,
            transition:{
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    }

    return(
        <motion.div 
        variants={rocketVariants}
        animate={`${isLaunching? "warp" : "idle"}`}
        className="relative top-[20%] w-20 left-[calc(50%-3.75rem)]"
        >
            {/*Left Fin*/}
            <div className="absolute w-12.5 h-[3.4rem] bg-red-700 rounded-tl-[80%] rounded-b-[10%] -left-7.5 top-[calc(100%-3.8rem)]"></div>

            {/*Right Fin*/}
            <div className="absolute w-12.5 h-[3.4rem] bg-red-700 rounded-tr-[80%] rounded-b-[10%] -right-7.5 top-[calc(100%-3.8rem)]"></div>

            {/*Rocket Body*/}
            <div className=" w-2 left-[calc(50%-3.125rem)] z-10"></div>
            <div className="relative overflow-hidden z-10 bg-gray-500 h-45 rounded-t-[100%] rounded-bl-[50%] rounded-br-[50%] border-t-8 border-white border-solid">

                {/*Window*/}
                <div className="absolute rounded-full border-3 z-15 border-gray-400 bg-red-700 w-10 h-10 items-center top-8 left-[calc(50%-1.2rem)]"></div>

            </div>    
              
            {/*Exhaust*/}
            <div className="absolute left-4 w-12 h-4 -bottom-3.25 rounded-b-[60%] bg-amber-900"></div>
        </motion.div>
    );
}
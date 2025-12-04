import { ProjectThumbnail } from "@/type/types";
import { motion, Variants } from "framer-motion";
import Rocket from "./rocket";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectProps{
  items: ProjectThumbnail,
  index: number, 
}

const planetStyles=[
  {
    gradient: "bg-linear-to-r from-blue-400 to-green-400",
    shadow: "shadow-teal-600 shadow-[0_0_50px]",
  },
  {
    gradient: "bg-linear-to-r from-red-400 to-yellow-600",
    shadow: "shadow-amber-600 shadow-[0_0_50px]",
  },
  {
    gradient: "bg-radial from-white to-blue-600 ",
    shadow: "shadow-blue-300 shadow-[0_0_20px]",
  },
  {
    gradient: "bg-linear-to-r from-amber-800 via-white to-amber-600  shadow-amber-800 ",
    shadow: "shadow-white shadow-[0_0_50px]",
  },
  {
    gradient: "bg-linear-to-r from-blue-500 to-purple-400",
    shadow: "shadow-purple-800 shadow-[0_0_20px]",
  },
]


export default function projectPlanetCard(prop: ProjectProps){
  
  const [isLaunched, setIsLaunched] = useState(false);
  const style =  planetStyles[prop.index % planetStyles.length]; 
  const isEven = prop.index % 2 === 0;
  const router = useRouter();

  const sceneVariants: Variants = {
    visible:{
        opacity: 1,
        x: 0,
        rotate:360, 
        transition:{
          duration: 10,
          repeat:Infinity,
        }
    },
    launching:{
        scale: 15,
        z:1000,
        opacity: 0,
        rotate: 360,
        x: isEven? -3000 : 3000, 
        y:-1000,
        transition:{
            duration: 1,
            ease:[0.64, 0.04, 0.35, 1.0]
        }
    }
  }

  const handleButton = () =>{
    setIsLaunched(true);
  };

    return(
      <div className={`flex  w-full p-20 ${isLaunched? "overflow-visible z-50" : "overflow-hidden"}`}>
        <div className={`flex w-full h-full  ${isEven? "flex-row" : "flex-row-reverse"}`}>
          
          <div className="flex justify-center w-1/2">
            <div className="w-130 h-130 flex justify-center items-center p-10 relative">
              <motion.div
              className={`absolute inset-0 rounded-full ${style.gradient} ${style.shadow}`}
              variants={sceneVariants}
              animate={`${isLaunched? "launching" : "visible"}`}
              onAnimationComplete={(launch) => {
                if(launch==="launching"){
                  router.push(`/projectdetail/${prop.items.id}?idx=${prop.index}`);
                }
              }}
              />
                {prop.items.thumbnail && (
                    <motion.div 
                    className="relative justify-center overflow-hidden z-10 w-[80%] h-[80%] inset-0"
                    animate={{opacity: isLaunched? 0 : 1}}
                    transition={{duration: 0.5 }}
                    >
                      <img
                          src={prop.items.thumbnail} 
                          alt={prop.items.name}
                          className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300" 
                      />
                    </motion.div>
                )}
            </div>
          </div>
          
          <div className={` text-white ${isEven? "text-left items-start" : "text-right items-end"}`}>
            <motion.h1 
            className="relative top-30 text-3xl font-bold text-white mb-4 font-serif"
            animate={{opacity: isLaunched? 0 : 1, x: isLaunched? (isEven? 1000 : -1000) : 0}}
            transition={{duration: 0.5 }}
            >
                {prop.items.name}
            </motion.h1>
            <div className={`flex items-center mt-72 gap-4 ${isEven? "flex-row" : "flex-row-reverse"}`}>
              <motion.div 
              className={`relative scale-[0.3]  ${isEven? "-rotate-45" : "rotate-45"} hover:cursor-pointer ${isLaunched? "hover:cursor-none" : ""}`}
              onClick={() => handleButton()}>
                <Rocket
                isEven={isEven}
                isLaunching = {isLaunched}
                />
              </motion.div>
              <motion.h1 className={`text-xl tracking-widest hover:cursor-default ${isLaunched? "hover:cursor-none" : "animate-pulse"}`}
              animate={{opacity: isLaunched? 0 : 1}}
              transition={{duration: 0.5 }}
              >
                Click rocket to visit the planet
              </motion.h1>
            </div>
          </div>

        </div>
      </div>  
    );
}
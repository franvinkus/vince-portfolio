import Rocket from "@/components/rocket";
import WarpingBackground from "@/components/warpingBackground";

export default function Loading(){
    return (
        <div className="w-full h-screen bg-[#050510] relative overflow-hidden">
            
            <div className="scal-3">
                <WarpingBackground/>    
            </div>

            <div className="rotate-90 relative top-[40%] flex flex-col gap-y-3 ">
                <Rocket/>
            </div>
            
            
        </div>
    );
}
import { COLORS } from "@/app/(root)/product/[id]/product-info/constants/Colors";
import { useEffect, useState } from "react";


const Color = () => {
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [isMobile, setIsMobile] = useState(false);
  
  
    useEffect(() => {
        const updateIsMobile = () => {
          setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
      
        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);
        return () => window.removeEventListener("resize", updateIsMobile);
    }, []);

      
    return (
        <div className="md:flex items-center justify-between">
        {isMobile 
        ? 
        <div>
            <div className="flex gap-2 md:mt-5 mt-[10px] items-center">
            {COLORS.slice(0, 3).map((color) => (
                <div
                    key={color.value}
                    onClick={() => setSelectedColor(color)} 
                    className={`w-[26px] h-[26px] rounded-full border cursor-pointer`}
                    style={{
                        backgroundColor: color.value,
                        boxShadow:
                        selectedColor.value === color.value
                            ? '0 0 0 1px white, 0 0 0 2px white'
                            : 'none',
                        }}
                ></div>
            ))}
                {COLORS.length > 3 && (
                    <div
                        className="w-auto h-[26px] flex items-center justify-center text-xs font-medium text-[#BDBDBD] cursor-default px-2"
                        title={`+${COLORS.length - 3} more colors`}
                        >
                        +{COLORS.length - 3} Colors
                    </div>
                )}
                </div>

                <div className="font-Heebo-14 mt-2">
                <p className="text-[#BDBDBD]">{selectedColor.name}</p>
                </div>
            </div>
        :
            <div className="flex items-center justify-between w-full mt-5">
                <div className="flex gap-1">
                {COLORS.map((color) => (
                    <div
                        key={color.value}
                        onClick={() => setSelectedColor(color)}
                        className={`w-[26px] h-[26px] rounded-full border cursor-pointer`}
                        style={{
                            backgroundColor: color.value,
                            boxShadow:
                            selectedColor.value === color.value
                                ? '0 0 0 1px white, 0 0 0 2px white'
                                : 'none',
                        }}
                    ></div>
                ))}
                </div>
            
                <div className="font-Heebo-14">
                    <p className="text-[#BDBDBD]">{selectedColor.name}</p>
                </div>
            </div>
                }
        </div>

    )
}

export default Color
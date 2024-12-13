import { COLORS } from "@/app/(root)/product/[id]/product-info/constants/Colors";
import { Color } from "../../Color";

interface ColorSelectorProps {
    isMobile: boolean;
    selectedColors: Color[];
    onColorClick: (color: Color) => void;
    onModalOpen: () => void;
}

export default function ColorSelector({
    isMobile,
    selectedColors,
    onColorClick,
    onModalOpen,
}: ColorSelectorProps) {
    const selectedColorsText = () => {
        if (selectedColors.length > 1) {
            return `${selectedColors.length} colors`;
        } else if (selectedColors.length === 1) {
            return selectedColors[0].name;
        }
        return COLORS[0].name;
    };

    return (
        <div className={`${isMobile ? "" : "flex items-center justify-between w-full mt-3"}`}>
            {/* Secțiunea cu cercurile de culori */}
            <div className={`flex items-center ${isMobile ? "gap-2 mt-[10px]" : "gap-3"}`}>
                {isMobile
                    ? COLORS.slice(0, 3).map((color) => (
                          <div
                              key={color.value}
                              onClick={() => onColorClick(color)}
                              className={`w-[22px] h-[22px] rounded-full cursor-pointer`}
                              style={{
                                  backgroundColor: color.value,
                                  boxShadow: selectedColors.some(
                                      (c) => c.value === color.value
                                  )
                                      ? "0 0 0 2px white, 0 0 0 3px black"
                                      : "0 0 0 2px white",
                              }}
                          ></div>
                      ))
                    : COLORS.map((color) => (
                          <div
                              key={color.value}
                              onClick={() => onColorClick(color)}
                              className={`w-[26px] h-[26px] rounded-full cursor-pointer`}
                              style={{
                                  backgroundColor: color.value,
                                  boxShadow: selectedColors.some(
                                      (c) => c.value === color.value
                                  )
                                      ? "0 0 0 2px white, 0 0 0 3px black"
                                      : "0 0 0 2px white",
                              }}
                          ></div>
                      ))}
                {isMobile && COLORS.length > 3 && (
                    <div
                        className="w-auto h-[26px] flex items-center justify-center text-xs font-medium text-[#BDBDBD] cursor-pointer px-2"
                        title={`+${COLORS.length - 3} more colors`}
                        onClick={onModalOpen}
                    >
                        +{COLORS.length - 3} Colors
                    </div>
                )}
            </div>

            {/* Textul culorii selectate */}
            {!isMobile && (
                <div className="font-heebo text-[14px] text-[#BDBDBD]">
                    <p>{selectedColorsText()}</p>
                </div>
            )}
        </div>
    );
}

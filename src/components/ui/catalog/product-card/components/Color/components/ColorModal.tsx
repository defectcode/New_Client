import { useEffect, useState } from "react";
import { COLORS } from "@/app/(root)/product/[id]/product-info/constants/Colors";
import Image from "next/image";
import { AddToCartButton } from "@/app/(root)/product/[id]/product-info/AddToCartButton";
import { IProduct } from "@/shared/types/product.interface";
import { Color } from "../../Color";

interface ColorModalProps {
    product: IProduct;
    onClose: () => void;
}

export default function ColorModal({ product, onClose }: ColorModalProps) {
    const [selectedColor, setSelectedColor] = useState<Color | null>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);


    const handleToggleColor = (color: Color) => {
        setSelectedColor((prev) => (prev?.value === color.value ? null : color));
    };

    const handleClear = () => {
        setSelectedColor(null);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end"
            onClick={onClose}
        >
            <div
                className="bg-[#F9F9F9] w-full min-h-[67vh] max-h-[67vh] rounded-t-lg p-5 relative flex flex-col justify-between overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <button
                        className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        <Image src="/images/close.svg" alt="close" width={14} height={14} />
                    </button>
                    <h3 className="font-Heebo-16-regular mb-5">Select Color</h3>
                </div>
                <div className="flex flex-col overflow-y-auto h-full mb-20">
                    <ul className="border-t">
                        {COLORS.map((color) => (
                            <li
                                key={color.value}
                                onClick={() => handleToggleColor(color)}
                                className={`flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded border-b py-5 ${
                                    selectedColor?.value === color.value ? "bg-gray-100" : ""
                                }`}
                            >
                                <div
                                    className="w-6 h-6 rounded-full mr-3"
                                    style={{ backgroundColor: color.value }}
                                ></div>
                                <span className="font-Heebo-16-regular text-[#140808]">
                                    {color.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="absolute bottom-0 left-0 w-full p-5 flex items-center justify-between bg-white">
                    <button
                        onClick={handleClear}
                        className="flex items-center justify-center w-[185px] h-[48px] border border-black rounded-md text-black font-Heebo-14 hover:bg-gray-100"
                    >
                        Clear {selectedColor ? "(1)" : "(0)"}
                    </button>
                    <div className="bg-black w-[185px] rounded-[10px] text-white">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>

    );
}

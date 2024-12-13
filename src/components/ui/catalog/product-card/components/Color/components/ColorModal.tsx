import { COLORS } from "@/app/(root)/product/[id]/product-info/constants/Colors";
import Image from "next/image";
import { AddToCartButton } from "@/app/(root)/product/[id]/product-info/AddToCartButton";
import { IProduct } from "@/shared/types/product.interface";
import { Color } from "../../Color";

interface ColorModalProps {
    selectedColors: Color[];
    onToggleColor: (color: Color) => void;
    onClear: () => void;
    onClose: () => void;
    product: IProduct;
}

export default function ColorModal({
    selectedColors,
    onToggleColor,
    onClear,
    onClose,
    product,
}: ColorModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end"
            onClick={onClose}
        >
            <div
                className="bg-white w-full h-[75vh] rounded-t-lg p-5 relative flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <button
                        className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        <Image src="/images/close.svg" alt="close" width={14} height={14} />
                    </button>
                    <h3 className="font-Heebo-16-regular mb-4">Select Color</h3>
                    <ul className="border-t">
                        {COLORS.map((color) => (
                            <li
                                key={color.value}
                                onClick={() => onToggleColor(color)}
                                className={`flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded border-b py-5 ${
                                    selectedColors.some((c) => c.value === color.value)
                                        ? "bg-gray-100"
                                        : ""
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
                        onClick={onClear}
                        className="flex items-center justify-center w-[185px] h-[48px] border border-black rounded-md text-black font-Heebo-14 hover:bg-gray-100"
                    >
                        Clear ({selectedColors.length})
                    </button>
                    <div className="bg-black w-[185px] rounded-[10px] text-white">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}

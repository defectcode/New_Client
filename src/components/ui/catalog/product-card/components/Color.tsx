import { COLORS } from "@/app/(root)/product/[id]/product-info/constants/Colors";
import { useEffect, useState } from "react";
import "../ProductCard.css";
import { AddToCartButton } from "@/app/(root)/product/[id]/product-info/AddToCartButton";
import { IProduct } from "@/shared/types/product.interface";
import ColorSelector from "./Color/components/ColorSelector";
import ColorModal from "./Color/components/ColorModal";


export type Color = {
    name: string;
    value: string;
};

interface ColorProduct {
    product: IProduct;
}

export function Color({ product }: ColorProduct) {
    const [selectedColors, setSelectedColors] = useState<Color[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const updateIsMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };

        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);
        return () => window.removeEventListener("resize", updateIsMobile);
    }, []);

    // Setarea automată a primei culori dacă nu este selectată nicio culoare
    useEffect(() => {
        if (selectedColors.length === 0 && COLORS.length > 0) {
            setSelectedColors([COLORS[0]]);
        }
    }, [selectedColors]);

    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    const handleToggleColor = (color: Color) => {
        setSelectedColors((prev) => {
            if (showModal) {
                return prev.some((c) => c.value === color.value)
                    ? prev.filter((c) => c.value !== color.value)
                    : [...prev, color];
            } else {
                return [color];
            }
        });
    };

    return (
        <div className="md:flex items-center justify-between">
            <ColorSelector
                isMobile={isMobile}
                selectedColors={selectedColors}
                onColorClick={handleToggleColor}
                onModalOpen={handleModalOpen}
            />
            {showModal && (
                <ColorModal
                    // selectedColors={selectedColors}
                    // onToggleColor={handleToggleColor}
                    // onClear={() => setSelectedColors([COLORS[0]])}
                    onClose={handleModalClose}
                    product={product}
                />
            )}
        </div>
    );
}

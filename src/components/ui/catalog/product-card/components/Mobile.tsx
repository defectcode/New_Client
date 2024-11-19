'use client';

import { useCart } from "@/hooks/useCart";
import { Promocode } from "./Promocode";
import { formatPrice } from '@/utils/string/format-price';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FavoriteButton } from "@/app/(root)/product/[id]/product-info/FavoriteButton";
import { ColorSelector } from "./ColorSelector";
import { Info } from "./Info";
import { useActions } from "@/hooks/useActions";

export function Mobile() {
    const { items } = useCart(); // Obține lista produselor din coș
    const { changeQuantity, removeFromCart } = useActions(); // Acțiuni pentru a modifica cantitatea și a șterge produse
    const router = useRouter();

    const availableColors = ['Light gray', 'Blue', 'Red', 'Black', 'Green'];
    const [selectedColor, setSelectedColor] = useState(availableColors[0]);

    // Calculează totalurile
    const totalProducts = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const delivery = 14.00;
    const sales = totalProducts * 0.2899;
    const total = totalProducts + delivery + sales;

    // Secțiuni expandabile (Easy Returns, Secure Payment etc.)
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        'easyReturns': false,
        'securePayment': false,
        'youCanPayBy': false,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleCheckout = () => {
        router.push('/checkout');
    };

    const handleIncrement = (id: number) => {
        changeQuantity({ id, type: 'plus' });
    };
    
    const handleDecrement = (id: number, quantity: number) => {
        if (quantity === 1) {
            removeFromCart({ id });
        } else {
            changeQuantity({ id, type: 'minus' });
        }
    };
    

    return (
        <div>
            <div className="flex flex-col max-w-[470px] mx-auto bg-white rounded-lg h-screen">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white h-[56px]">
                    <h2 className="font-Heebo-20-semi text-[#1E1E1E]">Bag</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="text-sm underline text-[#8C8C8C]"
                    >
                        Back to shop
                    </button>
                </div>

                {/* Lista de produse */}
                <div className="overflow-y-auto flex-1 p-5 border-t border-[#E8E8ED] bg-[#F9F9F9] min-h-[250px] max-h-[300px]">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-start py-4 ${index < items.length - 1 ? 'border-b' : ''}`}
                            style={{ borderColor: '#E8E8ED' }}
                        >
                            <div className="flex-shrink-0 rounded-md bg-white w-[100px] h-[100px] flex items-center justify-center">
                                <Image
                                    src={item.product.images[0]}
                                    alt={item.product.title}
                                    width={90}
                                    height={90}
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="ml-4 flex flex-col justify-between w-full space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-Heebo-15 text-[#1E1E1E] truncate">
                                        {item.product.title}
                                    </h3>
                                    <FavoriteButton product={item.product} />
                                </div>
                                <ColorSelector
                                    colors={availableColors}
                                    selectedColor={selectedColor}
                                    onColorSelect={(color) => setSelectedColor(color)}
                                />
                                <div className="flex items-center justify-between mt-2 h-[16px]">
                                    <p className="text-[#5D5D5D] font-Heebo-14">${item.product.price.toFixed(2)}</p>
                                    <div className="flex items-center space-x-[30px]">
                                        <button
                                            className="text-sm text-[#8C8C8C] border-transparent rounded disabled:opacity-50"
                                            onClick={() => handleDecrement(item.id, item.quantity)}
                                            disabled={item.quantity === 1}
                                        >
                                            <Image src='/images/Minus.svg' alt="minus" width={8} height={8} />
                                        </button>
                                        <span className="text-sm">{item.quantity}</span>
                                        <button
                                            className="text-sm text-[#8C8C8C] border-transparent rounded"
                                            onClick={() => handleIncrement(item.id)}
                                        >
                                            <Image src='/images/Plus.svg' alt="plus" width={8} height={8} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="p-5">
                    <Promocode />
                    <div>
                        <div className="border-y border-[#E8E8ED] pt-5">
                            <div className="flex justify-between text-sm mb-3">
                                <p className="font-Heebo-16 text-[#1E1E1E]">Subtotal</p>
                                <p className="text-[#5D5D5D]">{formatPrice(totalProducts)}</p>
                            </div>
                            <div className="flex justify-between text-sm mb-3">
                                <p className="font-Heebo-16 text-[#1E1E1E]">Shipping</p>
                                <p className="text-[#5D5D5D]">FREE</p>
                            </div>
                            <div className="flex justify-between text-sm mb-5">
                                <p className="font-Heebo-16 text-[#1E1E1E]">Estimated Tax</p>
                                <p className="text-[#5D5D5D]">{formatPrice(sales)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between font-Heebo-16-semi mt-5 mb-10">
                            <p>Total</p>
                            <p>{formatPrice(total)}</p>
                        </div>
                        <button
                            className="w-full py-3 mb-3 text-[#1E1E1E] border border-[#1E1E1E] rounded-lg font-Heebo-16-semi h-[56px]"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                        <button className="w-full py-3 mb-3 text-white bg-black rounded-lg font-Heebo-16-semi h-[56px] flex items-center justify-center">
                            <Image src="/images/applepay.svg" alt="applepay" width={54} height={20} />
                        </button>
                    </div>
                </div>
                <Info />
            </div>
        </div>
    );
}

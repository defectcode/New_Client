'use client';
import { useCart } from "@/hooks/useCart";
import { formatPrice } from '@/utils/string/format-price';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FavoriteButton } from "@/app/(root)/product/[id]/product-info/FavoriteButton";
import { ColorSelector } from "./ColorSelector";
import { Info } from "./Info";
import { useActions } from "@/hooks/useActions";
import Link from "next/link";
import { ConfirmDeleteModal } from "@/components/layouts/main-layout/header/header-menu/header-cart/cart-item/components/ConfirmDeleteModal";

export function Mobile() {
    const { items } = useCart();
    const { changeQuantity, removeFromCart } = useActions(); 
    const router = useRouter();
    const availableColors = ['Light gray', 'Blue', 'Red', 'Black', 'Green'];
    const [showConfirm, setShowConfirm] = useState(false);
    const [itemToRemove, setItemToRemove] = useState<number | null>(null);

    const totalProducts = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const itemText = totalItems === 1 ? 'item' : 'items';

    const delivery = 14.00;
    const sales = totalProducts * 0.2899;
    const total = totalProducts + delivery + sales;

    const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>(() => {
      if (typeof window !== 'undefined') {
          const savedColors = localStorage.getItem('selectedColors');
          return savedColors ? JSON.parse(savedColors) : {};
      }
      return {};
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedColors', JSON.stringify(selectedColors));
        }
    }, [selectedColors]);

    const handleColorChange = (itemId: number, color: string) => {
        setSelectedColors((prev) => ({
            ...prev,
            [itemId]: color,
        }));
    };

    const handleDecrement = (itemId: number, quantity: number) => {
        if (quantity === 1) {
            setItemToRemove(itemId); 
            setShowConfirm(true);
        } else {
            changeQuantity({ id: itemId, type: 'minus' });
        }
    };

    const handleIncrement = (itemId: number) => {
        changeQuantity({ id: itemId, type: 'plus' });
    };

    const handleConfirmDelete = () => {
        if (itemToRemove !== null) {
            removeFromCart({ id: itemToRemove });
            setItemToRemove(null); 
            setShowConfirm(false); 
        }
    };

    const handleCancelDelete = () => {
        setItemToRemove(null); 
        setShowConfirm(false); 
    };



    return (
        <div>
            <div className="flex flex-col max-w-[470px] mx-auto bg-white rounded-lg h-screen">
                <div className="flex items-center justify-between px-4 py-3 bg-white h-[56px]">
                    <h2 className="font-Heebo-20-semi text-[#1E1E1E]">Bag</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="text-sm underline text-[#8C8C8C]"
                    >
                        Back to shop
                    </button>
                </div>

                <div
                    className="flex-1 px-5 border-t border-[#E8E8ED] bg-[#F9F9F9]"
                    style={{
                        minHeight: `${130 + (items.length - 1) * 134}px`, 
                        maxHeight: `${130 + (items.length - 1) * 130}px`, 
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-start py-4 ${index < items.length - 1 ? "border-b" : ""}`}
                            style={{ borderColor: "#E8E8ED" }}
                        >
                            <Link href={`/product/${item.product.id}`} className="flex-shrink-0 rounded-md bg-white w-[100px] h-[100px] flex items-center justify-center">
                                <Image
                                    src={item.product.images[0]}
                                    alt={item.product.title}
                                    width={90}
                                    height={90}
                                    className="rounded-md object-cover max-w-[90px] max-h-[90px] cursor-pointer"
                                />
                            </Link>

                            <div className="ml-4 flex flex-col justify-between w-full space-y-4">
                                <div className="flex items-center justify-between">
                                    <Link href={`/product/${item.product.id}`}>
                                        <h3 className="font-Heebo-15 text-[#1E1E1E] truncate cursor-pointer">
                                            {item.product.title}
                                        </h3>
                                    </Link>
                                    <FavoriteButton product={item.product}/>
                                </div>
                                <ColorSelector
                                    colors={availableColors}
                                    selectedColor={selectedColors[item.id] || 'Light gray'}
                                    onColorSelect={(color) => handleColorChange(item.id, color)}
                                />
                                <div className="flex items-center justify-between mt-2 h-[16px]">
                                    <p className="text-[#5D5D5D] font-Heebo-14">
                                        ${item.product.price.toFixed(2)}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="text-sm text-[#8C8C8C] border-transparent rounded disabled:opacity-50 p-2"
                                            onClick={() => handleDecrement(item.id, item.quantity)}
                                            disabled={item.quantity === 0}
                                        >
                                            <Image src="/images/Minus.svg" alt="minus" width={14} height={14} />
                                        </button>
                                        <input
                                            readOnly
                                            value={item.quantity}
                                            className="w-8 text-center text-sm bg-transparent border-none"
                                        />
                                        <button
                                            className="text-sm text-[#8C8C8C] border-transparent rounded p-2"
                                            onClick={() => handleIncrement(item.id)}
                                        >
                                            <Image src="/images/Plus.svg" alt="plus" width={11} height={11} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showConfirm && (
                    <ConfirmDeleteModal
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    />
                )}

                <div className="px-5 pt-5">
                    <div className="text-[#1E1E1E] flex items-center justify-between pb-5">
                        <h2>Summary</h2>
                        <p className="font-Heebo-semi-15 ">{`${totalItems} ${itemText}`}</p>
                        </div>
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
                        <div className="flex justify-between font-Heebo-16-semi my-5">
                            <p>Total</p>
                            <p>{formatPrice(total)}</p>
                        </div>
                        <div className="fixed bottom-0 left-0 w-full bg-white px-5 py-4 shadow-md">
                            <div className="flex items-center justify-center space-x-4">
                                <Link href="/checkout" className="flex-1 max-w-[185px]">
                                    <button
                                        className="font-bold border border-black/50 rounded-[10px] w-full h-[48px] flex items-center justify-center bg-white text-[#424242]"
                                    >
                                        Checkout
                                    </button>
                                    </Link>

                                    <Link href="" className="flex-1 max-w-[185px]">
                                    <button className="font-bold border border-black/50 rounded-[10px] w-full h-[48px] flex items-center justify-center bg-black text-white">
                                        <Image src="/images/applepay.svg" alt="applypay" width={54} height={20} />
                                    </button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                <Info />
            </div>
        </div>
    );
}

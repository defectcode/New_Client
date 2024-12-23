import Image from "next/image";
import Link from "next/link";
import { PUBLIC_URL } from "@/config/url.config";
import { IProduct } from "@/shared/types/product.interface";
import { formatPrice } from "@/utils/string/format-price";
import { FavoriteButton } from "@/app/(root)/product/[id]/product-info/FavoriteButton";
import "./ProductCard.css";
import MobileSizeButton from "./components/size/MobileSizeButton";
import { AddCartSize } from "@/app/(root)/product/[id]/product-info/components/AddCartSize";
import { Color } from "./components/Color";

interface ProductCardProps {
  product: IProduct;
  isBestSeller?: boolean;
  isBestPrice?: boolean;
}

export function ProductCardHome({ product, isBestSeller, isBestPrice }: ProductCardProps) {
  return (
    <div className="bg-transparent relative w-full sm:w-[350px]">
      <div className="relative group mb-5">
        <Link href={PUBLIC_URL.product(product.id)}>
          <div className="">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={350}
              height={500}
              className="square-image"
              layout="fill"
            />
          </div>

        </Link>
        <div className="absolute bottom-3 right-3 bg-[#A1A1A1]/10 rounded-full py-2 px-3 md:hidden">
          <MobileSizeButton product={product} />
        </div>
        <div className="absolute top-3 right-3 p-1 bg-transparent cursor-pointer md:block hidden">
          <FavoriteButton product={product} />
        </div>
        <div className="md:block hidden h-0">
          <AddCartSize product={product} />
        </div>
      </div>

      {isBestSeller && (
        <p className="mt-2 text-sm text-[#EB001B] font-semibold">Best Seller</p>
      )}

      <div className="flex items-center justify-between mt-[10px]">
        <h3 className="font-Heebo-16-semi text-[#000000] line-clamp-1">
          {product.title}
        </h3>

        <div className="font-Heebo-15-reg text-[#424242] flex items-center justify-between gap-5 md:block hidden">
          {isBestPrice ? (
            <div className="price-container">
              <span className="line-through text-[#424242]">
                {formatPrice(product.price)}
              </span>
              <span className="text-[#34A853]">
                {formatPrice(product.discountedPrice || product.price * 0.9)}
              </span>
            </div>
          ) : (
            <span>{formatPrice(product.price)}</span>
          )}
        </div>
      </div>

      <Color product={product} />
      <div className="font-Heebo-15-reg text-[#424242] flex items-center md:hidden mt-5">
        {isBestPrice ? (
          <div className="price-container">
            <span className="line-through text-[#424242]">
              {formatPrice(product.price)}
            </span>
            <span className="text-[#34A853]">
                {formatPrice(product.discountedPrice || product.price * 0.9)}
              </span>
          </div>
        ) : (
          <span>{formatPrice(product.price)}</span>
        )}
      </div>
    </div>
  );
}

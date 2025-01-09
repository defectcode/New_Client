import Image from "next/image";
import { products } from "./constants/productsData";


export default function BackgroundHomeButton() {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center gap-8 lg:gap-16 max-w-[1400px] mx-auto md:px-0 px-5 py-20">

      <div className="w-full lg:w-1/3 space-y-10 font-heebo">
        <div className="leading-[1]">
          <p className="text-green-600 font-bold text-[16px] mb-5">New in</p>
          <h2 className="text-[32px] font-bold mb-5">CLOTHING</h2>
          <a href="/explorer" className="text-gray-500 underline">Go to catalog</a>
        </div>

        <div className="space-y-5">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-[10px]">
              <div className="w-[100px] h-[100px] overflow-hidden rounded-md flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="leading-[1] space-y-4">
                <p className="font-medium text-black">{product.title}</p>
                <p className="text-gray-400 text-sm">{product.description}</p>
                <p className="text-gray-800 font-semibold">{product.price}</p>
              </div>
            </div>          
          ))}
        </div>
      </div>

      <div className="w-full lg:w-2/3">
        <Image
          src="/images/Element4.png"
          alt="vellov desktop"
          layout="responsive"
          width={758}
          height={620}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}

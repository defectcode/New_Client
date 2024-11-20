import Image from 'next/image';
import { FC, useState } from 'react';
import './Production.css';

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[]; // Array de imagini
  color: string | { name: string }; // Dacă `color` poate fi un obiect, ajustează-l astfel
  description: string;
}


interface SectionItem {
  name: string;
  content?: string; // Adăugăm opțional un conținut pentru fiecare secțiune
}

interface SectionListProps {
  product: Product;
}

const sections: SectionItem[] = [
  { name: 'Product Details', content: 'This is the product details information.' },
  { name: 'Shipping and Returns' },
  { name: 'Reviews Section' },
];

export const SectionList: FC<SectionListProps> = ({ product }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!product) {
    return null; // Dacă produsul nu este definit, nu afișăm componenta
  }

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="max-w-[800px] w-full bg-white border-t border-b border-gray-200 mt-10">
      {/* Mapează secțiunile */}
      {sections.map((section, index) => (
        <div key={section.name} className={`${index !== sections.length - 1 ? 'border-b border-gray-200' : ''}`}>
          <div
            className="flex justify-between items-center py-4 px-6 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              if (index === 0) openModal();
            }}
          >
            <span className="text-gray-800 text-[16px] font-medium">{section.name}</span>
            <Image
              src="/images/arrows.svg"
              alt="arrows"
              width={7}
              height={11}
              className="transform transition-transform duration-300"
            />
          </div>
        </div>
      ))}
      {/* Modal pentru "Product Details" */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-[663px] w-full h-[712px] p-10 relative">
            <div className="flex items-center gap-4 mb-10">
              <Image
                src={product.images[0]}
                alt={product.title}
                width={50}
                height={50}
                className="object-cover rounded"
              />
              <div className='flex flex-col justify-center gap-[10px]'>
                <h1 className="font-Heebo-15-med text-[#1E1E1E]">{product.title}</h1>
                <p className="font-Heebo-med-14 text-[#5D5D5D]">{`$${product.price.toFixed(2)}`}</p>
              </div>
            </div>

            {/* Buton de închidere */}
            <button
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <Image src="/images/close.svg" alt="close" width={12} height={12} />
            </button>

            {/* Conținut detalii produs */}
            <h2 className="text-[18px] font-medium font-Heebo-16-bold mb-4 text-[#1E1E1E]">TRUE TO YOUR CREW.</h2>
            <p className="font-Heebo-regular-16 text-[#8C8C8C]">
              Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colors. This basketball icon channels '80s vibes with premium leather in the upper that looks good and breaks in even better. Modern footwear technology helps bring the comfort into the 21st century.
            </p>
            <h3 className="font-Heebo-16-bold text-[#1E1E1E] mt-5">Benefits</h3>
            <ul className="list-disc ml-5 mt-[10px] font-Heebo-regular-16 text-[#8C8C8C]">
              <li>Premium leather in the upper has the perfect sheen and breaks in beautifully.</li>
              <li>The modern foam midsole offers lightweight, responsive cushioning.</li>
              <li>A padded, low-cut collar adds a sleek look that feels comfortable.</li>
              <li>Bold color blocking throws it back to the original colorway inspiration: school team colors.</li>
              <li>The rubber outsole with classic hoops pivot circle adds durability, traction and heritage style.</li>
            </ul>
            <h3 className="font-Heebo-16-bold text-[#1E1E1E] mt-5">Product Details</h3>
            <ul className="list-disc ml-5 mt-[10px] font-Heebo-regular-16 text-[#8C8C8C]">
              <li>Low-cut collar</li>
              <li>Foam insole</li>
              <li>Perforations on toe</li>
              <li>Shown: White/Grey Fog</li>
              <li>Style: DD1391-103</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

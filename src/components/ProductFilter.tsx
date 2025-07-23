import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import pirai from "../assets/pirai.svg"
import astraops from "../assets/Astraops.svg"

interface Product {
  id: string;
  name: string;
  image: string;
}

interface ProductFilterProps {
  onProductChange: (product: Product) => void;
}

const products: Product[] = [
  {
    id: 'pirai-infotech',
    name: 'Pirai Infotech',
    image: pirai
  },
  {
    id: 'astraops',
    name: 'Astraops',
    image: astraops
  },
  {
    id: 'g4-guides',
    name: 'G4 Guides',
    image: '/products/g4-guides.png'
  }
];

const ProductFilter: React.FC<ProductFilterProps> = ({ onProductChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(false);
    onProductChange(product);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-52 bg-white dark:bg-gray-800 p-3 h-[46px] rounded-lg shadow-lg flex items-center justify-between hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center space-x-3">
          {/* <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-10 h-10 rounded-lg object-cover"
          /> */}
          <span className="font-normal text-gray-700 dark:text-gray-200">
            {selectedProduct.name}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full md:w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {products.map((product) => (
              <motion.button
                key={product.id}
                onClick={() => handleProductSelect(product)}
                className={`w-full p-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  selectedProduct.id === product.id
                    ? 'bg-gray-50 dark:bg-gray-700'
                    : ''
                }`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {/* <img
                  src={product.image}
                  alt={product.name}
                  className="w-6 h-6 rounded-lg object-cover"
                /> */}
                <span className="font-normal text-gray-700 dark:text-gray-200">
                  {product.name}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilter;
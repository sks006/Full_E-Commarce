
import { useEffect, useRef, useState } from "react";

const BrandShowcase = () => {
  const brands = [
    { id: "b1", name: "Zation", logo: "https://via.placeholder.com/150x60?text=Zation" },
    { id: "b2", name: "Codemade", logo: "https://via.placeholder.com/150x60?text=Codemade" },
    { id: "b3", name: "Lyrical", logo: "https://via.placeholder.com/150x60?text=Lyrical" },
    { id: "b4", name: "Levis", logo: "https://via.placeholder.com/150x60?text=Levis" },
    { id: "b5", name: "D&G", logo: "https://via.placeholder.com/150x60?text=D&G" },
    { id: "b6", name: "H&M", logo: "https://via.placeholder.com/150x60?text=H&M" },
    { id: "b7", name: "Uniqlo", logo: "https://via.placeholder.com/150x60?text=Uniqlo" },
    { id: "b8", name: "UA", logo: "https://via.placeholder.com/150x60?text=UA" },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Brand</h2>
          <a 
            href="/brands" 
            className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <span>View all brands</span>
            <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-h-8 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;

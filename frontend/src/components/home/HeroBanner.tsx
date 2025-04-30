

import { Button } from "@/components/ui/button";


const HeroBanner = () => {
  return (
    <section className="py-10 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-red-50 to-orange-50 relative">
          <div className="absolute -right-10 top-0 w-24 h-24 rotate-45 bg-red-200 opacity-20"></div>
          <div className="absolute left-20 bottom-10 w-12 h-12 rounded-full bg-yellow-300 opacity-20"></div>
          <div className="absolute left-40 top-10 w-8 h-8 rounded-full bg-blue-300 opacity-20"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col justify-center">
              <div className="flex items-center mb-3">
                <span className="text-2xl font-cursive text-red-500">~ New Arrival ~</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Today's Hot Offer</h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <span className="font-bold text-3xl">49</span>
                  <span className="text-xs block text-gray-500">%</span>
                </div>
                <div className="text-xl font-bold text-gray-800">SAVE UP TO</div>
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-md px-6 py-2 w-fit">
                Shop Now
              </Button>
            </div>
            
            <div className="flex justify-center items-center">
              <img 
                src="/lovable-uploads/3971ba29-2d01-4f09-b8f5-296e5650d64d.png" 
                alt="New arrival shoes" 
                className="max-h-64 object-contain transform -rotate-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

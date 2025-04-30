
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PromotionBanner = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First promotional banner */}
          <div className="rounded-xl overflow-hidden bg-slate-100 relative">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="uppercase text-sm font-semibold text-gray-500 mb-1">
                  GOPRO ACTION
                </h3>
                <h2 className="text-2xl font-bold mb-2">USD $170</h2>
                <p className="text-sm text-gray-600 mb-6">SAVE $100</p>
              </div>
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-gray-800 w-fit">
                Shop Now
              </Button>
            </div>
            <div className="absolute top-0 right-0 h-full w-2/5">
              <img
                src="https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                alt="GoPro Camera"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Second promotional banner */}
          <div className="rounded-xl overflow-hidden bg-orange-100 relative">
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="uppercase text-xl font-bold text-gray-800 mb-1">
                  Summer Collections
                </h3>
                <h2 className="text-3xl font-bold mb-4 text-orange-600">25% OFF</h2>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white w-fit">
                Shop Now
              </Button>
            </div>
            <div className="absolute top-0 right-0 h-full w-2/5">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                alt="Summer Fashion"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;

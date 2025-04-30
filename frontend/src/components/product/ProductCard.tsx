
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Rating from "@/components/common/Rating";
import ProductPrice from "@/components/product/ProductPrice";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
}

const ProductCard = ({
  id,
  title,
  price,
  oldPrice,
  image,
  rating,
  reviewCount,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative">
      <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
        {/* Product Image */}
        <Link to={`/product/${id}`} className="block relative">
          <div className="aspect-square relative overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Wishlist button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm hover:shadow-md transition-all"
          >
            <Heart
              className={cn("h-4 w-4", isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400")}
            />
          </button>
          
          {/* Discount tag */}
          {oldPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              {Math.round(((oldPrice - price) / oldPrice) * 100)}% OFF
            </div>
          )}
        </Link>

        {/* Product info */}
        <div className="p-4">
          <Link to={`/product/${id}`} className="block">
            <h3 className="font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-red-500 transition-colors">
              {title}
            </h3>
          </Link>
          
          {/* Ratings */}
          <Rating 
            rating={rating} 
            reviewCount={reviewCount} 
            size="sm" 
            className="mb-2" 
          />
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <ProductPrice price={price} oldPrice={oldPrice} />
            
            <Button 
              size="sm" 
              variant="ghost"
              className="p-1.5 hover:bg-red-50 hover:text-red-500"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

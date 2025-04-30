
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Rating = ({ rating, reviewCount, size = "md", className }: RatingProps) => {
  // Get star sizes based on size prop
  const getStarSize = () => {
    switch (size) {
      case "sm":
        return "h-3 w-3";
      case "lg":
        return "h-5 w-5";
      default:
        return "h-4 w-4";
    }
  };

  const textSizeClass = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";
  const starSize = getStarSize();

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex mr-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            )}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className={cn("text-gray-500", textSizeClass)}>
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
};

export default Rating;

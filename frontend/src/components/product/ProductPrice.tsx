
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  oldPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ProductPrice = ({ price, oldPrice, size = "md", className }: ProductPriceProps) => {
  // Get text sizes based on size prop
  const getPriceSize = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-2xl";
      default:
        return "text-base";
    }
  };

  const getOldPriceSize = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "lg":
        return "text-lg";
      default:
        return "text-sm";
    }
  };

  const priceSize = getPriceSize();
  const oldPriceSize = getOldPriceSize();

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-semibold text-red-500", priceSize)}>
        ${price.toFixed(2)}
      </span>
      {oldPrice && (
        <span className={cn("text-gray-400 line-through", oldPriceSize)}>
          ${oldPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;

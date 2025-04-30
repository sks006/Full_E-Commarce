
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
  className?: string;
}

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = Infinity,
  className,
}: QuantitySelectorProps) => {
  return (
    <div className={`flex items-center border border-gray-300 rounded-md ${className}`}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="px-3 py-2 h-auto rounded-none text-gray-600 hover:text-gray-800 hover:bg-gray-100"
        onClick={onDecrease}
        disabled={quantity <= minQuantity}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-3 py-2 font-medium">{quantity}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="px-3 py-2 h-auto rounded-none text-gray-600 hover:text-gray-800 hover:bg-gray-100"
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;

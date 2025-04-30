
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPriceRange, toggleBrand, clearFilters } from "@/slicer/filterSlice";

const ProductSlicer = () => {
  const dispatch = useAppDispatch();
  const { priceRange } = useAppSelector((state) => state);
  const { selectedBrands } = useAppSelector((state) => state.brandFilter);

  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "Under Armour"
  ];

  const handlePriceChange = (value: number[]) => {
    dispatch(setPriceRange({ min: value[0], max: value[1] }));
  };

  const handleBrandToggle = (brand: string) => {
    dispatch(toggleBrand(brand));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="w-full max-w-xs space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                value={[priceRange.min, priceRange.max]}
                max={1000}
                step={10}
                onValueChange={handlePriceChange}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange.min}</span>
                <span>${priceRange.max}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-sm font-medium">
            Brands
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <Label htmlFor={brand} className="text-sm">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductSlicer;

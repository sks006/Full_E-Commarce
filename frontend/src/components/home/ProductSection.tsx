
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface ProductSectionProps {
  title: string;
  showAll?: boolean;
  showAllLink?: string;
  children: ReactNode;
}

const ProductSection = ({ 
  title, 
  showAll = true, 
  showAllLink = "/products", 
  children 
}: ProductSectionProps) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          {showAll && (
            <Link 
              to={showAllLink} 
              className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              <span>Show All</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          )}
        </div>
        
        {children}
      </div>
    </section>
  );
};

export default ProductSection;

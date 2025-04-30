
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

const CategoryPage = () => {
  const { category } = useParams();
  
  // Sample products data for the category page
  const products = [
    {
      id: "p1",
      title: "Organic Skin Care Package",
      price: 59.99,
      oldPrice: 79.99,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.6,
      reviewCount: 128,
    },
    {
      id: "p2",
      title: "Gift Box Premium Set",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.8,
      reviewCount: 96,
    },
    {
      id: "p3",
      title: "Sports Running Shoes",
      price: 119.99,
      oldPrice: 149.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.9,
      reviewCount: 213,
    },
    {
      id: "p4",
      title: "Indoor Plant Collection",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1581929955719-15340a58b9bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.7,
      reviewCount: 175,
    },
    {
      id: "p5",
      title: "Premium Beard Care Kit",
      price: 44.99,
      oldPrice: 59.99,
      image: "https://images.unsplash.com/photo-1517144752598-48a7ed5d4a6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.5,
      reviewCount: 89,
    },
    {
      id: "p6",
      title: "Handcrafted Leather Bag",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.8,
      reviewCount: 156,
    },
  ];

  // Category name with capitalized first letter
  const categoryName = category ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ') : "Products";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button variant="ghost" size="sm" className="text-xs">Reset All</Button>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-4">Price Range</h4>
                <Slider defaultValue={[20, 80]} className="mb-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm">$20</span>
                  <span className="text-sm">$200</span>
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-4">Categories</h4>
                <div className="space-y-2">
                  {["All", "Premium", "Bestsellers", "New Arrivals", "Sale"].map((cat) => (
                    <div key={cat} className="flex items-center gap-2">
                      <Checkbox id={`cat-${cat}`} />
                      <Label htmlFor={`cat-${cat}`} className="text-sm font-normal">{cat}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Brands */}
              <div>
                <h4 className="font-medium mb-4">Brands</h4>
                <div className="space-y-2">
                  {["All Brands", "Brand A", "Brand B", "Brand C", "Brand D"].map((brand) => (
                    <div key={brand} className="flex items-center gap-2">
                      <Checkbox id={`brand-${brand}`} />
                      <Label htmlFor={`brand-${brand}`} className="text-sm font-normal">{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h1 className="text-3xl font-bold">{categoryName}</h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="md:hidden lg:inline">Filters</span>
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <span>Popularity</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  image={product.image}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="bg-red-500 text-white hover:bg-red-600">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="px-2">...</span>
                <Button variant="outline" size="sm">10</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;

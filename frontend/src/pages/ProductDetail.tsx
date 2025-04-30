
import { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Heart, 
  ShoppingCart, 
  Share2, 
  Minus, 
  Plus, 
  Star, 
  Truck, 
  RefreshCw, 
  Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import Rating from "@/components/common/Rating";
import ProductPrice from "@/components/product/ProductPrice";
import QuantitySelector from "@/components/ui/quantity-selector";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("m");
  
  // Sample product data
  const product = {
    id: id || "p1",
    title: "Premium Running Shoes",
    price: 149.99,
    oldPrice: 199.99,
    discount: 25,
    description: "Premium quality running shoes with advanced cushioning technology, breathable upper material, and durable rubber outsole for optimal performance and comfort during your runs.",
    features: [
      "Breathable mesh upper",
      "Responsive cushioning",
      "Durable rubber outsole",
      "Reflective elements for visibility",
      "Anatomical heel design",
    ],
    colors: ["red", "blue", "black", "white"],
    sizes: ["s", "m", "l", "xl"],
    rating: 4.8,
    reviewCount: 247,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    ],
    stock: 15,
    sku: "SHO-RUN-1001",
  };

  // Related products
  const relatedProducts = [
    {
      id: "rp1",
      title: "Trail Running Shoes",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.6,
      reviewCount: 152,
    },
    {
      id: "rp2",
      title: "Casual Sport Shoes",
      price: 89.99,
      oldPrice: 109.99,
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.5,
      reviewCount: 98,
    },
    {
      id: "rp3",
      title: "Fitness Training Shoes",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.7,
      reviewCount: 187,
    },
    {
      id: "rp4",
      title: "Lightweight Running Shoes",
      price: 139.99,
      oldPrice: 169.99,
      image: "https://images.unsplash.com/photo-1584735175315-9d5df23be3dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.9,
      reviewCount: 213,
    },
  ];

  const [mainImage, setMainImage] = useState(product.images[0]);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Product detail */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product images */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={mainImage} 
                  alt={product.title} 
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "border-2 rounded-md overflow-hidden cursor-pointer",
                      mainImage === image ? "border-red-500" : "border-transparent hover:border-gray-300"
                    )}
                    onClick={() => setMainImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-2 mb-4">
                <Rating rating={product.rating} reviewCount={product.reviewCount} />
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-green-600">In Stock ({product.stock})</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <ProductPrice 
                  price={product.price} 
                  oldPrice={product.oldPrice} 
                  size="lg" 
                />
                {product.oldPrice && (
                  <span className="bg-red-100 text-red-500 text-sm font-medium px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              {/* Color selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Color: <span className="capitalize">{selectedColor}</span></h3>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={cn(
                        "w-8 h-8 rounded-full border-2",
                        `bg-${color}-500`,
                        selectedColor === color ? "border-gray-800" : "border-transparent"
                      )}
                      onClick={() => setSelectedColor(color)}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
              
              {/* Size selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size: <span className="uppercase">{selectedSize}</span></h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={cn(
                        "w-10 h-10 rounded-md border text-sm uppercase font-medium",
                        selectedSize === size 
                          ? "bg-gray-900 text-white border-gray-900" 
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                      )}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity and add to cart */}
              <div className="flex items-center gap-4 mb-6">
                <QuantitySelector
                  quantity={quantity}
                  onDecrease={decreaseQuantity}
                  onIncrease={increaseQuantity}
                  minQuantity={1}
                  maxQuantity={product.stock}
                />
                
                <Button className="flex-1 bg-red-500 hover:bg-red-600 gap-2 font-medium">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </Button>
                
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              {/* SKU and categories */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">SKU:</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Categories:</span>
                    <span className="font-medium">Shoes, Athletic, Running</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Tags:</span>
                    <span className="font-medium">Sports, Running, Outdoor</span>
                  </div>
                </div>
              </div>
              
              {/* Shipping info */}
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-green-600" />
                  <span>Free shipping over $100</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RefreshCw className="h-4 w-4 text-green-600" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>2-year warranty</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product tabs */}
          <div className="px-6 pb-6">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b">
                <TabsTrigger value="description" className="rounded-none">Description</TabsTrigger>
                <TabsTrigger value="features" className="rounded-none">Features</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none">Reviews (247)</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <div className="prose max-w-none">
                  <p>
                    Our premium running shoes are designed for serious runners who demand performance and comfort. 
                    The lightweight design and responsive cushioning provide the perfect balance of support and energy return.
                  </p>
                  <p className="mt-4">
                    The breathable mesh upper keeps your feet cool during intense runs, while the durable rubber 
                    outsole provides excellent traction on various surfaces. The anatomical heel design ensures a secure fit 
                    and prevents slippage.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="pt-4">
                <ul className="list-disc pl-5 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{product.rating}</div>
                    <div className="flex justify-center mt-2">
                      <Rating rating={product.rating} />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2 mb-1">
                        <span className="text-sm w-6">{rating}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-8">{Math.floor(Math.random() * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="bg-red-500 hover:bg-red-600">Write a Review</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related products */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;

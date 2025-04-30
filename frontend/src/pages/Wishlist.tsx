
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const Wishlist = () => {
  // Sample wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "1",
      title: "Premium Running Shoes",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.8,
      reviewCount: 247,
      inStock: true,
    },
    {
      id: "2",
      title: "Wireless Headphones",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.7,
      reviewCount: 182,
      inStock: true,
    },
    {
      id: "3",
      title: "Premium Leather Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.9,
      reviewCount: 318,
      inStock: false,
    },
  ]);

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love for later or share with friends.</p>
            <Link to="/shop">
              <Button className="bg-red-500 hover:bg-red-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row gap-4 border-b pb-6 last:border-0 last:pb-0">
                      <div className="w-full md:w-32 h-32 rounded-md overflow-hidden shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-lg">{item.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.floor(item.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">({item.reviewCount} reviews)</span>
                            </div>
                            <p className="font-semibold text-red-500 mt-2">${item.price.toFixed(2)}</p>
                            <p className="text-sm mt-1">
                              {item.inStock ? (
                                <span className="text-green-600">In Stock</span>
                              ) : (
                                <span className="text-red-500">Out of Stock</span>
                              )}
                            </p>
                          </div>
                          
                          <div className="flex flex-row md:flex-col gap-3 md:items-end">
                            <Button 
                              className={`flex items-center gap-2 ${item.inStock ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 cursor-not-allowed"}`}
                              disabled={!item.inStock}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span>Add to Cart</span>
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => removeItem(item.id)}
                              className="shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link to="/shop">
                <Button variant="outline">
                  Continue Shopping
                </Button>
              </Link>
              
              <Button variant="outline" className="text-red-500" onClick={() => setWishlistItems([])}>
                Clear Wishlist
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;

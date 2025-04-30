
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import QuantitySelector from "@/components/ui/quantity-selector";

const Cart = () => {
  // Sample cart items
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      title: "Premium Running Shoes",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      quantity: 1,
    },
    {
      id: "2",
      title: "Wireless Headphones",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      quantity: 2,
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate subtotal, shipping, and total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop">
              <Button className="bg-red-500 hover:bg-red-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-4">Product</th>
                        <th className="text-center pb-4">Quantity</th>
                        <th className="text-right pb-4">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id} className="border-b last:border-0">
                          <td className="py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                <button 
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 text-sm flex items-center gap-1 mt-1 hover:underline"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center">
                              <QuantitySelector
                                quantity={item.quantity}
                                onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                                onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                                minQuantity={1}
                                maxQuantity={10}
                              />
                            </div>
                          </td>
                          <td className="py-4 text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Continue shopping & update cart */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <Link to="/shop">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
                <Button variant="outline">
                  Update Cart
                </Button>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <div className="text-sm text-green-600">
                        Add ${(100 - subtotal).toFixed(2)} more to get free shipping
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Promo code */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Have a promo code?</h3>
                    <div className="flex">
                      <Input 
                        placeholder="Enter promo code" 
                        className="rounded-r-none focus-visible:ring-0"
                      />
                      <Button 
                        variant="outline" 
                        className="rounded-l-none border-l-0"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  {/* Checkout button */}
                  <Link to="/checkout">
                    <Button className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2">
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;

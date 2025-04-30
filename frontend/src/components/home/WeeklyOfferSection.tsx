
import ProductCard from "../product/ProductCard";

const WeeklyOfferSection = () => {
  const offerProducts = [
    {
      id: "wo1",
      title: "Fresh Organic Vegetables Package",
      price: 24.99,
      oldPrice: 34.99,
      image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.5,
      reviewCount: 65,
    },
    {
      id: "wo2",
      title: "Designer Sunglasses",
      price: 89.99,
      oldPrice: 129.99,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.8,
      reviewCount: 112,
    },
    {
      id: "wo3",
      title: "Premium Wireless Headphones",
      price: 199.99,
      oldPrice: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.9,
      reviewCount: 203,
    },
    {
      id: "wo4",
      title: "Premium Woolen Sweater",
      price: 79.99,
      oldPrice: 99.99,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.7,
      reviewCount: 89,
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Weekly Offer</h2>
          <a 
            href="/offers" 
            className="flex items-center text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <span>View all offers</span>
            <svg className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {offerProducts.map((product) => (
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
    </section>
  );
};

export default WeeklyOfferSection;

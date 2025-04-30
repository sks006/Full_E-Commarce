
import ProductCard from "../product/ProductCard";
import ProductSection from "./ProductSection";

const TrendingProductSection = () => {
  const trendingProducts = [
    {
      id: "tp1",
      title: "Beard Oil",
      price: 29.50,
      image: "https://images.unsplash.com/photo-1517144752598-48a7ed5d4a6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.7,
      reviewCount: 179,
    },
    {
      id: "tp2",
      title: "Woven Leather Bag",
      price: 135.00,
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.8,
      reviewCount: 246,
    },
    {
      id: "tp3",
      title: "Sony Wireless Headphones",
      price: 129.00,
      image: "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.9,
      reviewCount: 384,
    },
    {
      id: "tp4",
      title: "Organic Face Wash",
      price: 18.00,
      image: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.5,
      reviewCount: 129,
    },
  ];

  return (
    <ProductSection title="Trending Product" showAllLink="/trending">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {trendingProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        ))}
      </div>
    </ProductSection>
  );
};

export default TrendingProductSection;

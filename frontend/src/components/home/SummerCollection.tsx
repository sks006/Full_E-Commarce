
import ProductCard from "../product/ProductCard";
import ProductSection from "./ProductSection";

const SummerCollection = () => {
  const summerProducts = [
    {
      id: "sc1",
      title: "Men's Denim Shorts",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.6,
      reviewCount: 95,
    },
    {
      id: "sc2",
      title: "Women's Summer Dress",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.8,
      reviewCount: 132,
    },
    {
      id: "sc3",
      title: "Classic Gray T-Shirt",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.7,
      reviewCount: 215,
    },
    {
      id: "sc4",
      title: "Basic Black T-Shirt",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      rating: 4.9,
      reviewCount: 267,
    },
  ];

  return (
    <ProductSection title="Summer Collections" showAllLink="/collections/summer">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {summerProducts.map((product) => (
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

export default SummerCollection;

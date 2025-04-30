
import CategoryCard from "../category/CategoryCard";
import CategorySection from "../category/CategorySection";

const CategoryGrid = () => {
  const categories = [
    {
      id: "c1",
      title: "Self-care",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      link: "/category/self-care",
    },
    {
      id: "c2",
      title: "Gift Ideas",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      link: "/category/gift-ideas",
    },
    {
      id: "c3",
      title: "Shoe",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      link: "/category/shoe",
    },
    {
      id: "c4",
      title: "Outdoor & garden",
      image: "https://images.unsplash.com/photo-1581929955719-15340a58b9bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      link: "/category/outdoor-garden",
    },
  ];

  return (
    <CategorySection title="Select Categories">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
            link={category.link}
          />
        ))}
      </div>
    </CategorySection>
  );
};

export default CategoryGrid;

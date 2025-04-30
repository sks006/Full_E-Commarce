
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard = ({ title, image, link }: CategoryCardProps) => {
  return (
    <Link 
      to={link}
      className="block group"
    >
      <div className="overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-medium text-gray-800 group-hover:text-red-500 transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;

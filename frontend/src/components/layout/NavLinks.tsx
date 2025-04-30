
import { Link } from "react-router-dom";

const NavLinks = () => {
  const navItems = [
    { name: "Deal Today", href: "/deals" },
    { name: "Special Prices", href: "/special-prices" },
    { name: "Fresh", href: "/fresh" },
    { name: "Frozen", href: "/frozen" },
    { name: "Demos", href: "/demos" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Pages", href: "/pages" },
    { name: "Recently Viewed", href: "/recently-viewed" },
  ];

  return (
    <nav className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-8 overflow-x-auto hide-scrollbar py-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="text-sm font-medium text-gray-700 whitespace-nowrap hover:text-red-500 transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;

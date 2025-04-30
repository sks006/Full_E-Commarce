
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Tasty Shop</h3>
            <p className="text-gray-600 mb-4">
              We bring you the best products with competitive prices and excellent customer service.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-medium">Call us:</span>
              <span className="text-red-500">+960 1234 5654</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["About Us", "Contact Us", "FAQs", "Shipping Policy", "Return Policy", "Terms & Conditions"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-600 hover:text-red-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {["Fresh Food", "Frozen", "Electronics", "Fashion", "Home & Garden", "Self-care", "Gift Ideas"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-600 hover:text-red-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter to get updates on our latest offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
              <button className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Tasty Shop. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((item) => (
              <span key={item} className="text-gray-600 text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <nav>
        <ul className="flex items-center gap-6 py-4 text-blue-700">
          <li>
            <Link to="/" className="hover:text-blue-500 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-500 transition">
              Products
            </Link>
          </li>
          <li>
            <Link to="/products/new" className="hover:text-blue-500 transition">
              New Product
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

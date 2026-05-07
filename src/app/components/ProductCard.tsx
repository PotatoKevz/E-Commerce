import { Link } from "react-router";
import { Star, TrendingUp } from "lucide-react";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const getStockStatus = () => {
    if (product.stock === 0) return { label: "Out of Stock", color: "bg-red-500" };
    if (product.stock < 10) return { label: "Low Stock", color: "bg-orange-500" };
    if (product.stock < 30) return { label: "Limited Stock", color: "bg-yellow-500" };
    return { label: "In Stock", color: "bg-green-500" };
  };

  const stockStatus = getStockStatus();

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden transition-all hover:shadow-xl border border-gray-200">
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Stock Badge */}
          <div className={`absolute top-3 right-3 ${stockStatus.color} text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1`}>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {stockStatus.label}
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs text-orange-500 uppercase tracking-wide mb-1 font-semibold">
            {product.category}
          </div>
          <h3 className="font-semibold mb-2 group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-gray-900">₱{product.price}</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {product.stock} units available
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
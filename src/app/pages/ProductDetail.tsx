import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Star, Heart, Truck, Shield, ChevronLeft, Package, TrendingUp, Clock } from "lucide-react";
import { products } from "../data/products";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products" className="text-blue-600 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color");
      return;
    }
    if (product && quantity > product.stock) {
      alert(`Only ${product.stock} units available in stock`);
      return;
    }
    // In a real app, this would add to cart state/context
    alert(`Added ${quantity} ${product.name} to cart!`);
    navigate("/cart");
  };

  const getStockStatus = () => {
    if (!product) return { label: "Unknown", color: "gray", bgColor: "bg-gray-100", textColor: "text-gray-800" };
    if (product.stock === 0) return { label: "Out of Stock", color: "red", bgColor: "bg-red-50", textColor: "text-red-800", borderColor: "border-red-200" };
    if (product.stock < 10) return { label: "Low Stock", color: "orange", bgColor: "bg-orange-50", textColor: "text-orange-800", borderColor: "border-orange-200" };
    if (product.stock < 30) return { label: "Limited Availability", color: "yellow", bgColor: "bg-yellow-50", textColor: "text-yellow-800", borderColor: "border-yellow-200" };
    return { label: "In Stock", color: "green", bgColor: "bg-green-50", textColor: "text-green-800", borderColor: "border-green-200" };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price & Availability */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Current Price</div>
                  <span className="text-4xl font-bold text-gray-900">₱{product.price}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    Updated: {currentTime.toLocaleTimeString()}
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${stockStatus.bgColor} ${stockStatus.textColor} ${stockStatus.borderColor}`}>
                    <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-current animate-pulse' : 'bg-current'}`} />
                    <span className="font-semibold">{stockStatus.label}</span>
                  </div>
                </div>
              </div>

              {/* Real-time Stock Info */}
              <div className={`p-4 rounded-lg ${stockStatus.bgColor} border ${stockStatus.borderColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className={`w-5 h-5 ${stockStatus.textColor}`} />
                    <span className={`font-semibold ${stockStatus.textColor}`}>
                      {product.stock} units available
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Real-time inventory</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-8">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-orange-500 bg-orange-50 text-orange-600' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Size (US)</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border-2 transition-all ${
                      selectedSize === size 
                        ? 'border-orange-500 bg-orange-500 text-white' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                  disabled={product.stock === 0}
                >
                  -
                </button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                  disabled={product.stock === 0 || quantity >= product.stock}
                >
                  +
                </button>
                {quantity >= product.stock && product.stock > 0 && (
                  <span className="text-sm text-orange-600">Max available</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-4 rounded-lg font-semibold transition-colors shadow-lg ${
                  product.stock === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button className="w-14 h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 border-t pt-8">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Free Bicol-wide delivery on orders over ₱500</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Handcrafted by Bicol artisans - Authentic quality guaranteed</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">Real-time inventory: {product.stock} units currently available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
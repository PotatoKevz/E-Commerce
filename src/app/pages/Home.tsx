import { Link } from "react-router";
import { ArrowRight, Truck, Shield, Repeat } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";

export function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-semibold">🇵🇭 Proudly Made in Bicol</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Authentic Filipino & Bicol Footwear
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Discover handcrafted traditional footwear from local Bicol artisans. Supporting our community, one step at a time.
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-full mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Free Local Delivery</h3>
              <p className="text-gray-600 text-sm">Bicol-wide delivery on orders over ₱500</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Handcrafted Quality</h3>
              <p className="text-gray-600 text-sm">100% authentic Bicol craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-full mb-4">
                <Repeat className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-2">Support Local Artisans</h3>
              <p className="text-gray-600 text-sm">Every purchase empowers our community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Collection</h2>
              <p className="text-gray-600">Traditional Filipino footwear handpicked for you</p>
            </div>
            <Link 
              to="/products"
              className="hidden md:flex items-center text-sm font-semibold hover:text-gray-600 transition-colors"
            >
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link 
              to="/products"
              className="inline-flex items-center text-sm font-semibold hover:text-gray-600 transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Celebrate Filipino Heritage</h2>
          <p className="text-xl text-orange-100 mb-8">
            Subscribe to discover new collections, artisan stories, and exclusive updates on authentic Filipino footwear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-black"
            />
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
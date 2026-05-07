import { useState } from "react";
import { useNavigate } from "react-router";
import { CreditCard, Banknote, CheckCircle2 } from "lucide-react";
import { products } from "../data/products";

// Mock cart items - in production this would come from a cart context
const mockCartItems = [
  { id: "1", product: products[0], size: 10, color: "White", quantity: 1 },
  { id: "2", product: products[3], size: 9, color: "Red", quantity: 2 }
];

type PaymentMethod = "cod" | "gcash" | "paymaya" | null;

export function Checkout() {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Shipping information state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: ""
  });

  const cartItems = mockCartItems;
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = async () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }

    // Validate shipping information
    const requiredFields = ["fullName", "email", "phone", "address", "city", "province", "zipCode"];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof typeof shippingInfo]);

    if (missingFields.length > 0) {
      alert("Please fill in all shipping information fields");
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            <div className="bg-orange-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Order Total:</strong> ₱{total.toFixed(2)}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Payment Method:</strong> {selectedPayment === "cod" ? "Cash on Delivery" : selectedPayment === "gcash" ? "GCash" : "PayMaya"}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Juan Dela Cruz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="juan@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="09XX XXX XXXX"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address
                  </label>
                  <textarea
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="House No., Street, Barangay"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City/Municipality
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Legazpi City"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province
                  </label>
                  <input
                    type="text"
                    name="province"
                    value={shippingInfo.province}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Albay"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="4500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {/* Cash on Delivery */}
                <button
                  onClick={() => setSelectedPayment("cod")}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === "cod"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedPayment === "cod" ? "bg-orange-500" : "bg-gray-100"
                    }`}>
                      <Banknote className={`w-6 h-6 ${
                        selectedPayment === "cod" ? "text-white" : "text-gray-600"
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold">Cash on Delivery (COD)</h3>
                      <p className="text-sm text-gray-600">Pay when you receive your order</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedPayment === "cod"
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300"
                    }`}>
                      {selectedPayment === "cod" && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                {/* GCash */}
                <button
                  onClick={() => setSelectedPayment("gcash")}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === "gcash"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedPayment === "gcash" ? "bg-orange-500" : "bg-gray-100"
                    }`}>
                      <CreditCard className={`w-6 h-6 ${
                        selectedPayment === "gcash" ? "text-white" : "text-gray-600"
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold">GCash</h3>
                      <p className="text-sm text-gray-600">Pay securely via GCash</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedPayment === "gcash"
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300"
                    }`}>
                      {selectedPayment === "gcash" && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                {/* PayMaya */}
                <button
                  onClick={() => setSelectedPayment("paymaya")}
                  className={`w-full p-4 rounded-lg border-2 transition-all ${
                    selectedPayment === "paymaya"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedPayment === "paymaya" ? "bg-orange-500" : "bg-gray-100"
                    }`}>
                      <CreditCard className={`w-6 h-6 ${
                        selectedPayment === "paymaya" ? "text-white" : "text-gray-600"
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold">PayMaya</h3>
                      <p className="text-sm text-gray-600">Pay securely via PayMaya</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      selectedPayment === "paymaya"
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300"
                    }`}>
                      {selectedPayment === "paymaya" && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {selectedPayment && selectedPayment !== "cod" && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> You will be redirected to {selectedPayment === "gcash" ? "GCash" : "PayMaya"} to complete your payment after placing the order.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold">{item.product.name}</h4>
                      <p className="text-xs text-gray-600">
                        Size {item.size} | {item.color}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-600">Qty: {item.quantity}</span>
                        <span className="float-right font-semibold">
                          ₱{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : `₱${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">₱{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || !selectedPayment}
                className={`w-full py-4 rounded-lg font-semibold transition-colors shadow-lg ${
                  isProcessing || !selectedPayment
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full mt-3 py-3 text-center text-sm text-orange-500 hover:text-orange-600 transition-colors font-medium"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

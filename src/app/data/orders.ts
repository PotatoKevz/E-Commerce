export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    size: number;
    color: string;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "cod" | "gcash" | "paymaya";
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    zipCode: string;
  };
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  type: "sale" | "refund";
  status: "completed" | "pending" | "failed";
  date: string;
  paymentMethod: string;
  customerName: string;
}

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "ORD-2026-001",
    customerId: "cust-1",
    customerName: "Maria Santos",
    customerEmail: "maria.santos@email.com",
    items: [
      {
        productId: "1",
        productName: "Bakya Classica",
        quantity: 2,
        price: 45.99,
        size: 8,
        color: "Natural Wood"
      }
    ],
    subtotal: 91.98,
    shipping: 50,
    total: 141.98,
    paymentMethod: "gcash",
    status: "delivered",
    orderDate: "2026-04-15T10:30:00Z",
    shippingAddress: {
      fullName: "Maria Santos",
      phone: "09171234567",
      address: "123 Rizal Street, Brgy. Centro",
      city: "Legazpi City",
      province: "Albay",
      zipCode: "4500"
    }
  },
  {
    id: "ORD-2026-002",
    customerId: "cust-2",
    customerName: "Juan Dela Cruz",
    customerEmail: "juan.delacruz@email.com",
    items: [
      {
        productId: "4",
        productName: "Bicolano Leather Slip-Ons",
        quantity: 1,
        price: 65.99,
        size: 10,
        color: "Tan"
      },
      {
        productId: "3",
        productName: "Tsinelas Deluxe",
        quantity: 3,
        price: 28.99,
        size: 9,
        color: "Black"
      }
    ],
    subtotal: 152.96,
    shipping: 50,
    total: 202.96,
    paymentMethod: "cod",
    status: "shipped",
    orderDate: "2026-04-20T14:20:00Z",
    shippingAddress: {
      fullName: "Juan Dela Cruz",
      phone: "09181234568",
      address: "456 Magsaysay Ave, Brgy. Bitano",
      city: "Naga City",
      province: "Camarines Sur",
      zipCode: "4400"
    }
  },
  {
    id: "ORD-2026-003",
    customerId: "cust-3",
    customerName: "Ana Reyes",
    customerEmail: "ana.reyes@email.com",
    items: [
      {
        productId: "8",
        productName: "Malong Pattern Sneakers",
        quantity: 1,
        price: 78.99,
        size: 7,
        color: "Multi-Color"
      }
    ],
    subtotal: 78.99,
    shipping: 50,
    total: 128.99,
    paymentMethod: "paymaya",
    status: "processing",
    orderDate: "2026-04-22T09:15:00Z",
    shippingAddress: {
      fullName: "Ana Reyes",
      phone: "09191234569",
      address: "789 Del Rosario St, Brgy. San Roque",
      city: "Tabaco City",
      province: "Albay",
      zipCode: "4511"
    }
  },
  {
    id: "ORD-2026-004",
    customerId: "cust-4",
    customerName: "Pedro Gonzales",
    customerEmail: "pedro.g@email.com",
    items: [
      {
        productId: "2",
        productName: "Abaca Woven Sandals",
        quantity: 2,
        price: 38.99,
        size: 9,
        color: "Natural"
      }
    ],
    subtotal: 77.98,
    shipping: 50,
    total: 127.98,
    paymentMethod: "gcash",
    status: "delivered",
    orderDate: "2026-04-18T16:45:00Z",
    shippingAddress: {
      fullName: "Pedro Gonzales",
      phone: "09201234570",
      address: "321 Luna St, Brgy. Cabangan",
      city: "Daraga",
      province: "Albay",
      zipCode: "4501"
    }
  },
  {
    id: "ORD-2026-005",
    customerId: "cust-5",
    customerName: "Sofia Martinez",
    customerEmail: "sofia.m@email.com",
    items: [
      {
        productId: "5",
        productName: "Rattan Weave Espadrilles",
        quantity: 1,
        price: 42.99,
        size: 8,
        color: "Dyed Blue"
      },
      {
        productId: "6",
        productName: "Pandan Fiber Sandals",
        quantity: 1,
        price: 35.99,
        size: 8,
        color: "Natural Green"
      }
    ],
    subtotal: 78.98,
    shipping: 50,
    total: 128.98,
    paymentMethod: "cod",
    status: "pending",
    orderDate: "2026-04-23T08:00:00Z",
    shippingAddress: {
      fullName: "Sofia Martinez",
      phone: "09211234571",
      address: "555 Bonifacio Ave, Brgy. Penafrancia",
      city: "Naga City",
      province: "Camarines Sur",
      zipCode: "4400"
    }
  }
];

// Generate transactions from orders
export const mockTransactions: Transaction[] = mockOrders.map(order => ({
  id: `TXN-${order.id}`,
  orderId: order.id,
  amount: order.total,
  type: "sale" as const,
  status: order.status === "delivered" ? "completed" : order.status === "cancelled" ? "failed" : "pending",
  date: order.orderDate,
  paymentMethod: order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "gcash" ? "GCash" : "PayMaya",
  customerName: order.customerName
}));

// Sales statistics helpers
export function getSalesStats(orders: Order[]) {
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === "delivered").length;
  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "processing").length;

  return {
    totalSales,
    totalOrders,
    completedOrders,
    pendingOrders,
    averageOrderValue: totalOrders > 0 ? totalSales / totalOrders : 0
  };
}

// Get sales by date range
export function getSalesByDateRange(orders: Order[], days: number = 7) {
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return orders.filter(order => new Date(order.orderDate) >= startDate);
}

// Get top selling products
export function getTopSellingProducts(orders: Order[]) {
  const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = {
          name: item.productName,
          quantity: 0,
          revenue: 0
        };
      }
      productSales[item.productId].quantity += item.quantity;
      productSales[item.productId].revenue += item.price * item.quantity;
    });
  });

  return Object.entries(productSales)
    .map(([id, data]) => ({ productId: id, ...data }))
    .sort((a, b) => b.revenue - a.revenue);
}

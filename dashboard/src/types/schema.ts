export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  createdAt: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  userId: string;
  addressLine: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface Seller {
  id: string;
  userId: string;
  shopName: string;
  businessLicense: string;
  rating: number;
  verified: boolean;
  createdAt: string;
  user?: User;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  slug: string;
  createdAt: string;
  parent?: Category;
  children?: Category[];
}

export interface Product {
  id: number; // Sequelize.INTEGER, autoIncremented
  seller_id: number; // Sequelize.INTEGER
  category_id: number; // Sequelize.INTEGER
  name: string; // Sequelize.STRING
  description: string; // Sequelize.TEXT
  price: number; // Sequelize.INTEGER
  stock: number; // Sequelize.INTEGER
  brand: string; // Sequelize.STRING (optional if allowNull, but required in your current backend)
  images: string; // Sequelize.STRING — assumed to be a URL or comma-separated
  createdAt: string; // Sequelize.DATE (returned as ISO string in JSON)
  updatedAt: string; // Sequelize.DATE (same)

  seller?: Seller;
  category?: Category;
}


export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText?: string;
}

export interface Order {
  id: string;
  userId: string;
  addressId: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentId?: string;
  shippingId?: string;
  createdAt: string;
  user?: User;
  address?: Address;
  payment?: Payment;
  shipping?: Shipping;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  product?: Product;
}

export interface Payment {
  id: string;
  userId: string;
  orderId: string;
  paymentMethod: 'bKash' | 'Nagad' | 'COD' | 'Card';
  status: 'Paid' | 'Failed' | 'Pending';
  transactionId?: string;
  paidAt?: string;
  user?: User;
  order?: Order;
}

export interface Shipping {
  id: string;
  orderId: string;
  courierName: string;
  trackingNumber?: string;
  shippingStatus: 'Processing' | 'Shipped' | 'Delivered';
  shippingFee: number;
  expectedDelivery?: string;
  order?: Order;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  user?: User;
  product?: Product;
}

export interface Wishlist {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
  user?: User;
  product?: Product;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  expiryDate: string;
  minimumOrderValue: number;
  isActive: boolean;
}

export interface AppliedCoupon {
  id: string;
  couponId: string;
  userId: string;
  orderId: string;
  appliedAt: string;
  coupon?: Coupon;
  user?: User;
  order?: Order;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'Open' | 'Resolved' | 'Closed';
  createdAt: string;
  user?: User;
}
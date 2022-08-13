export type Order = {
  id: number;
  email: string;
  status: string;
  updated_at: Date;
  comment: string | null;
  rate: number | null;
  payment: {
    id: number;
    iyzicoJson: any;
  };
};

export interface UniqueOrder {
  id: number;
  email: string;
  name: string;
  surname: string;
  phone: string;
  hash: string;
  status: string;
  updated_at: string;
  created_at: string;
  comment: any;
  rate: any;
  token: string;
  shipping_id: number;
  payment_id: number;
  shipping: Shipping;
  payment: Payment;
  products: Product[];
}

export interface Shipping {
  id: number;
  created_at: string;
  updated_at: string;
  city: string;
  country: string;
  post_code: string;
  address: string;
  billing_city: string;
  billing_country: string;
  billing_post_code: string;
  billing_address: string;
  status: string;
  cost: number;
  tracking_number: string;
}

export interface Payment {
  id: number;
  created_at: string;
  updated_at: string;
  iyzicoJson: IyzicoJson;
  order_id: number;
}

export interface IyzicoJson {
  phase: string;
  price: number;
  token: string;
  locale: string;
  status: string;
  authCode: string;
  cardType: string;
  currency: string;
  mdStatus: number;
  binNumber: string;
  paidPrice: number;
  paymentId: string;
  cardFamily: string;
  systemTime: number;
  callbackUrl: string;
  fraudStatus: number;
  installment: number;
  hostReference: string;
  paymentStatus: string;
  lastFourDigits: string;
  cardAssociation: string;
  itemTransactions: ItemTransaction[];
  iyziCommissionFee: number;
  merchantCommissionRate: number;
  iyziCommissionRateAmount: number;
  merchantCommissionRateAmount: number;
}

export interface ItemTransaction {
  price: number;
  itemId: string;
  paidPrice: number;
  blockageRate: number;
  convertedPayout: ConvertedPayout;
  subMerchantPrice: number;
  iyziCommissionFee: number;
  transactionStatus: number;
  blockageResolvedDate: string;
  merchantPayoutAmount: number;
  paymentTransactionId: string;
  subMerchantPayoutRate: number;
  merchantCommissionRate: number;
  subMerchantPayoutAmount: number;
  iyziCommissionRateAmount: number;
  blockageRateAmountMerchant: number;
  merchantCommissionRateAmount: number;
  blockageRateAmountSubMerchant: number;
}

export interface ConvertedPayout {
  currency: string;
  paidPrice: number;
  iyziCommissionFee: number;
  iyziConversionRate: number;
  merchantPayoutAmount: number;
  subMerchantPayoutAmount: number;
  iyziCommissionRateAmount: number;
  iyziConversionRateAmount: number;
  blockageRateAmountMerchant: number;
  blockageRateAmountSubMerchant: number;
}

export interface Product {
  product_id: string;
  price: number;
  status: string;
  discounted_price: number;
  quantity: number;
  order_id: number;
  product: Product2;
}

export interface Product2 {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description: string;
  barcode: string;
  brand: string;
  stock: number;
  images: string[];
  thumbnail: string;
  price: number;
  discounted_price: number;
  discount_rate: number;
  category_id: string;
  updated_at: string;
  created_at: string;
  parent_id: any;
  category: Category;
  attributes: Attribute[];
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  image: string;
  parent_id: any;
  updated_at: string;
  created_at: string;
}

export interface Attribute {
  productId: string;
  attribute_id: string;
  attribute: {
    id: string;
    value: string;
    attribute_type_id: string;
    attribute_type: {
      id: string;
      title: string;
    };
  };
}

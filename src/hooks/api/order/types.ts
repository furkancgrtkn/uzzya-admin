export type Order = {
  id: number;
  status: string;
  updated_at: string;
  created_at: string;
  comment: any;
  rate: any;
  user: {
    email: string;
    profile: {
      name: string;
      phone: string;
      surname: string;
    };
  };
  shipping: {
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
  };
  payment: {
    id: number;
    iyzicoJson: IyzicoJson;
  };
};

export interface UniqueOrder {
  id: number;
  status: string;
  updated_at: string;
  created_at: string;
  comment: any;
  uu id: number;
  rate: any;
  user: {
    email: string;
    profile: {
      name: string;
      phone: string;
      surname: string;
    };
  };
  shipping: {
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
  };
  payment: {
    id: number;
    iyzicoJson: IyzicoJson;
    updated_at: string;
  };
  products: UniqueOrderProduct[];
}

export type UniqueOrderProduct = {
  price: number;
  product_ id: number;
  product: {
     id: number;
    thumbnail: string;
    slug: string;
    barcode: string;
    stock: number;
    title: string;
    category: {
      title: string;
      slug: string;
       id: number;
    };
    attributes: {
      attribute: {
         id: number;
        value: string;
        attribute_type: {
           id: number;
          title: string;
        };
      };
    }[];
  };
  status: string;
  quantity: number;
  discounted_price: number;
};
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
  payment id: number;
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
  item id: number;
  paidPrice: number;
  blockageRate: number;
  convertedPayout: ConvertedPayout;
  subMerchantPrice: number;
  iyziCommissionFee: number;
  transactionStatus: number;
  blockageResolvedDate: string;
  merchantPayoutAmount: number;
  paymentTransaction id: number;
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

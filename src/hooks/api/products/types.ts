export type ProductType = {
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  short_description: string;
  brand: string;
  barcode: string;
  stock: number;
  images: string[];
  thumbnail: string;
  parent_id: string;
  discounted_price: number;
  discount_rate: number;

  category: {
    id: string;
    title: string;
  };

  variants: {
    id: string;
  }[];

  attributes: {
    attribute: {
      attribute_type: {
        id: string;
        title: string;
      };
      id: string;
      value: string;
    };
  }[];
};

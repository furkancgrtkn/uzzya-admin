export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  slug: string;
  short_description: string;
  barcode: string;
  stock: number;
  images: string[];
  thumbnail: string;
  parent_id: number;
  discounted_price: number;
  published: boolean;

  category: {
    id: number;
    title: string;
  };

  variants: {
    id: number;
  }[];

  attributes: {
    attribute: {
      attribute_type: {
        id: number;
        title: string;
      };
      id: number;
      value: string;
    };
  }[];
};

export type Category = {
  id: number;
  title: string;
  image: string;
  filters: {
    attribute_type: {
      id: number;
      title: string;
    };
  }[];

  slug: string;
  parent: {
    id: number;
    title: string;
  };
  children: {
    id: number;
    title: string;
  }[];
};

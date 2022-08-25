export type Category = {
  id: string;
  title: string;
  image: string;
  filters: {
    attribute_type: {
      id: string;
      title: string;
    };
  }[];

  slug: string;
  parent: {
    id: string;
    title: string;
  };
  children: {
    id: string;
    title: string;
  }[];
};

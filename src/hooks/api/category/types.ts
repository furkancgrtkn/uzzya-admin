export type Category = {
  id: string;
  title: string;
  image: string;
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

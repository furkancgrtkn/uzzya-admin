export type AttributeTypeType = {
  id: number;
  title: string;
};

export type AttributeType = {
  id: number;
  value: string;
  attribute_type: {
    id: number;
    title: string;
  };
};

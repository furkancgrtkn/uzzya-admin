export type AttributeTypeType = {
  id: string;
  title: string;
};

export type AttributeType = {
  id: string;
  value: string;
  attribute_type: {
    id: string;
    title: string;
  };
};

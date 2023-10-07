export interface Tag {
  id: number;
  tagName: string;
  tagCategory: string;
  tagType: string;
}

export type TagFormData = {
  id: string;
  tagCategory: string;
  tagName: string;
  tagType: string;
  tagColor?: string;
};
  